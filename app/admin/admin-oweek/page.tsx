import Link from "next/link";
import { promises as fs } from "fs";
import path from "path";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  ADMIN_COOKIE_NAME,
  verifyAdminSessionToken,
} from "@/lib/admin-auth";
import {
  getJadwal,
  saveJadwal,
} from "../../../lib/jadwal";
import type { JadwalDay } from "../../../lib/jadwal";
import AdminJadwalForm from "./AdminJadwalForm";
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

async function updateJadwalAction(formData: FormData) {
  "use server";

  await requireAdmin();

  try {
    // Form admin mengirim semua field jadwal sebagai JSON tersembunyi.
    // Validasi struktur tetap dilakukan di saveJadwal() sebelum file ditulis.
    const raw = String(formData.get("jadwalJson") || "[]");
    const jadwal = JSON.parse(raw) as unknown;
    await saveJadwal(jadwal);
    revalidatePath("/schedule-temp");
  } catch (error) {
    const message = error instanceof Error ? error.message : "Jadwal gagal disimpan.";
    redirect(`/admin/admin-oweek?error=${encodeURIComponent(message)}`);
  }

  redirect("/admin/admin-oweek?status=saved");
}

function slugifyFilePart(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function saveUploadedImage(file: File, day: string, type: "do" | "dont") {
  if (!file.size) return "";

  if (!file.type.startsWith("image/")) {
    throw new Error("File upload harus berupa gambar.");
  }

  // File disimpan di public agar bisa langsung diakses browser lewat /assets/...
  // Nama file dibuat unik dengan Date.now() agar upload baru tidak menimpa file lama.
  const extension = path.extname(file.name) || ".png";
  const fileName = `${slugifyFilePart(day)}-${type}-${Date.now()}${extension}`;
  const uploadDir = path.join(process.cwd(), "public", "assets", "jadwal", "uploads");
  const uploadPath = path.join(uploadDir, fileName);

  await fs.mkdir(uploadDir, { recursive: true });
  await fs.writeFile(uploadPath, Buffer.from(await file.arrayBuffer()));

  return `/assets/jadwal/uploads/${fileName}`;
}

async function uploadDresscodeAction(formData: FormData) {
  "use server";

  await requireAdmin();

  try {
    const selectedDay = String(formData.get("day") || "");
    const doFile = formData.get("doImage");
    const dontFile = formData.get("dontImage");
    const jadwal = await getJadwal();
    const day = jadwal.find((item) => item.day === selectedDay);

    if (!day) {
      throw new Error("Day yang dipilih tidak ditemukan.");
    }

    const doPath = doFile instanceof File
      ? await saveUploadedImage(doFile, day.day, "do")
      : "";
    const dontPath = dontFile instanceof File
      ? await saveUploadedImage(dontFile, day.day, "dont")
      : "";

    const updatedJadwal: JadwalDay[] = jadwal.map((item) => {
      if (item.day !== selectedDay) return item;

      return {
        ...item,
        details: {
          ...item.details,
          // Jika salah satu input gambar kosong, path lama tetap dipertahankan.
          dresscodeDoImage: doPath || item.details.dresscodeDoImage,
          dresscodeDontImage: dontPath || item.details.dresscodeDontImage,
        },
      };
    });

    await saveJadwal(updatedJadwal);
    revalidatePath("/schedule-temp");
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload gambar gagal.";
    redirect(`/admin/admin-oweek?error=${encodeURIComponent(message)}`);
  }

  redirect("/admin/admin-oweek?status=uploaded");
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
  const jadwal = await getJadwal();

  return (
    <main className="admin-page">
      <section className="admin-shell" aria-labelledby="admin-title">
        <header className="admin-header">
          <h1 id="admin-title">Admin Jadwal</h1>
          <div className="admin-actions">
            <Link className="admin-link" href="/schedule-temp">
              Lihat Jadwal
            </Link>
            <form action={logoutAction}>
              <button className="admin-logout" type="submit">
                Logout
              </button>
            </form>
          </div>
        </header>

        {params?.status === "saved" ? (
          <p className="admin-message">Jadwal berhasil disimpan.</p>
        ) : null}

        {params?.status === "uploaded" ? (
          <p className="admin-message">Gambar dresscode berhasil diupload.</p>
        ) : null}

        {params?.error ? (
          <p className="admin-message">{params.error}</p>
        ) : null}

        <AdminJadwalForm initialJadwal={jadwal} action={updateJadwalAction} />

        <form action={uploadDresscodeAction} className="admin-editor admin-upload">
          <h2>Upload Gambar Dresscode</h2>
          <p className="admin-help">
            Upload gambar Do dan Don&apos;t tanpa database. File akan disimpan
            ke folder <strong>public/assets/jadwal/uploads</strong>, lalu path
            otomatis dimasukkan ke JSON.
          </p>

          <label className="admin-field">
            <span>Pilih Day</span>
            <select name="day" required>
              {jadwal.map((day) => (
                <option value={day.day} key={day.day}>
                  {day.day} - {day.date}
                </option>
              ))}
            </select>
          </label>

          <div className="admin-upload-grid">
            <label className="admin-field">
              <span>Gambar Do</span>
              <input type="file" name="doImage" accept="image/*" />
            </label>

            <label className="admin-field">
              <span>Gambar Don&apos;t</span>
              <input type="file" name="dontImage" accept="image/*" />
            </label>
          </div>

          <button className="admin-save" type="submit">
            Upload Gambar
          </button>
        </form>
      </section>
    </main>
  );
}
