import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  ADMIN_COOKIE_NAME,
  verifyAdminSessionToken,
} from "@/lib/admin-auth";
import { getScheduleData, saveScheduleData } from "../../../lib/schedule-data";
import AdminScheduleForm from "./AdminScheduleForm";
import "./styles.css";

// Admin harus selalu membaca data terbaru dari file JSON, bukan hasil cache build.
export const dynamic = "force-dynamic";

type AdminPageProps = {
  searchParams?: Promise<{
    status?: string;
    error?: string;
  }>;
};

async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  // Semua server action admin memanggil guard ini agar tidak bisa ditembak
  // langsung tanpa cookie session yang valid.
  if (!verifyAdminSessionToken(token)) {
    redirect("/admin/login-admin");
  }
}

async function updateScheduleAction(formData: FormData) {
  "use server";

  await requireAdmin();

  try {
    // Form admin mengirim seluruh data schedule sebagai JSON tersembunyi.
    // Validasi struktur dilakukan di saveScheduleData() sebelum file ditulis.
    const raw = String(formData.get("scheduleJson") || "[]");
    const data = JSON.parse(raw) as unknown;
    await saveScheduleData(data);
    // Halaman publik /schedule dirender ulang agar perubahan langsung terlihat.
    revalidatePath("/schedule");
  } catch (error) {
    const code = (error as NodeJS.ErrnoException)?.code;
    // Di server yang sudah dideploy (mis. Vercel) filesystem read-only, jadi
    // fs.writeFile gagal dengan EROFS/EACCES. Beri arahan yang jelas, bukan
    // pesan error mentah.
    const message =
      code === "EROFS" || code === "EACCES"
        ? "Menyimpan tidak tersedia di situs yang sudah dideploy (filesystem server read-only). Klik Download JSON, lalu commit file data/schedule-data.json ke repo dan deploy ulang."
        : error instanceof Error
          ? error.message
          : "Data gagal disimpan.";
    redirect(`/admin/admin-oweek?error=${encodeURIComponent(message)}`);
  }

  redirect("/admin/admin-oweek?status=saved");
}

async function logoutAction() {
  "use server";

  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
  redirect("/admin/login-admin");
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
  await requireAdmin();

  const params = await searchParams;
  const scheduleData = await getScheduleData();
  // Di deployment (Vercel) menyimpan ke file tidak akan permanen.
  const isDeployed = !!process.env.VERCEL;

  return (
    <main className="admin-page">
      <section className="admin-shell" aria-labelledby="admin-title">
        <header className="admin-header">
          <h1 id="admin-title">Admin Schedule</h1>
          <div className="admin-actions">
            <Link className="admin-link" href="/schedule">
              Lihat Schedule
            </Link>
            <form action={logoutAction}>
              <button className="admin-logout" type="submit">
                Logout
              </button>
            </form>
          </div>
        </header>

        {isDeployed ? (
          <p className="admin-notice">
            Kamu sedang di situs yang sudah dideploy. Perubahan di sini{" "}
            <strong>tidak tersimpan permanen</strong> karena filesystem server
            read-only. Untuk mengubah jadwal: edit di sini lalu klik{" "}
            <strong>Download JSON</strong>, commit file{" "}
            <code>data/schedule-data.json</code> ke repo, dan deploy ulang.
          </p>
        ) : null}

        {params?.status === "saved" ? (
          <p className="admin-message">Data berhasil disimpan.</p>
        ) : null}

        {params?.error ? (
          <p className="admin-message">{params.error}</p>
        ) : null}

        <AdminScheduleForm initialData={scheduleData} action={updateScheduleAction} />
      </section>
    </main>
  );
}
