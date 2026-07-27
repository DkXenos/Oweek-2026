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
    const message = error instanceof Error ? error.message : "Data gagal disimpan.";
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
