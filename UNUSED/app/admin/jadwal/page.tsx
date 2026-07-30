import "./styles.css";
import { getJadwal } from "../../../lib/jadwal";
import JadwalViewer from "./JadwalViewer";

// Halaman ini dibuat dynamic supaya setiap perubahan data/jadwal.json
// dari admin langsung terbaca saat halaman /jadwal dibuka ulang.
export const dynamic = "force-dynamic";

export default async function JadwalPage() {
  // Ambil data jadwal dari file JSON melalui helper modular di lib/jadwal.ts.
  const schedule = await getJadwal();

  return (
    <main className="jadwal-page">
      <img
        src="/assets/homepage/clouds-background.webp"
        alt=""
        className="jadwal-clouds"
      />
      <img
        src="/assets/homepage/firework-top.png"
        alt=""
        className="jadwal-firework"
      />

      <section className="jadwal-content" aria-labelledby="jadwal-title">
        <p className="jadwal-kicker">OWeek Universitas Ciputra 2026</p>
        <h1 id="jadwal-title">Jadwal</h1>

        <JadwalViewer schedule={schedule} />
      </section>
    </main>
  );
}
