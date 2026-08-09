import type { PopupSection } from "./schedule-data";

// Modul ini AMAN dipakai client component: cuma tipe + helper murni, tanpa
// import "fs"/"path". Loader file JSON-nya ada di matrikulasi-data.server.ts
// dan hanya boleh diimpor dari server component.
//
// Satu banner matrikulasi menampung TIGA acara berbeda (matrikulasi, industry
// visit, prodi day) yang difilter lewat dropdown prodi. Di dalam popup ketiganya
// tetap dipisah: tiap acara punya tanggal, lokasi, dan jam sendiri.
export type MatrikulasiKategori = "matrikulasi" | "industry-visit" | "prodi-day";

// Urutan tampil di popup + judul tiap acara.
export const KATEGORI_URUT: { kategori: MatrikulasiKategori; label: string }[] = [
  { kategori: "matrikulasi", label: "Matrikulasi" },
  { kategori: "industry-visit", label: "Industry Visit" },
  { kategori: "prodi-day", label: "Prodi Day" },
];

// Satu baris jadwal = satu sesi acara untuk satu prodi.
// Sumbernya data/matrikulasi-jadwal.json, bentuknya dibiarkan sama persis
// dengan data mentah supaya gampang di-replace kalau ada revisi.
export type MatrikulasiJadwal = {
  id: string;
  prodi: string;
  kategori: MatrikulasiKategori;
  hari: string;
  // Format ISO "YYYY-MM-DD".
  tanggal: string;
  // null = lokasi belum ditentukan, baris lokasi tidak ditampilkan.
  lokasi: string | null;
  mulai: string;
  // null = jam selesai belum ditentukan, ditampilkan "07.30 - selesai".
  selesai: string | null;
};

export type MatrikulasiProdi = {
  // Kode prodi, dipakai sebagai value dropdown DAN sebagai kunci join ke
  // field "prodi" di matrikulasi-jadwal.json. Harus sama persis.
  id: string;
  label: string;
  // Kode lain di jadwal yang sebenarnya prodi yang sama (mis. CB ditulis "CBz"
  // di sebagian baris). Ditaruh di sini, bukan diedit di jadwal, supaya
  // matrikulasi-jadwal.json tetap salinan mentah yang bisa ditimpa utuh.
  aliases?: string[];
  penugasan: PopupSection;
  ketentuan: PopupSection;
};

export type MatrikulasiData = {
  // Banner mana yang dianggap matrikulasi (index thumbnail di banner.tsx).
  // Kalau urutan banner berubah, cukup ubah angka ini di JSON.
  bannerId: string;
  // Teks tombol dropdown selama prodi belum dipilih.
  placeholder: string;
  prodi: MatrikulasiProdi[];
  jadwal: MatrikulasiJadwal[];
};

// Satu acara siap render: judul + daftar sesi yang sudah diformat.
export type AgendaSesi = {
  id: string;
  tanggal: string;
  lokasi: string | null;
  waktu: string;
};

export type AgendaGroup = {
  kategori: MatrikulasiKategori;
  label: string;
  sesi: AgendaSesi[];
};

const NAMA_BULAN = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

// "Senin" + "2026-08-03" -> "Senin, 3 Agustus 2026".
// Sengaja tidak lewat new Date() supaya tidak kena geser timezone.
export function formatTanggal(hari: string, tanggal: string): string {
  const [tahun, bulan, hariAngka] = tanggal.split("-");
  const namaBulan = NAMA_BULAN[Number(bulan) - 1];
  if (!namaBulan) return `${hari}, ${tanggal}`;
  return `${hari}, ${Number(hariAngka)} ${namaBulan} ${tahun}`;
}

// "07:30" + "15:45" -> "07.30 - 15.45 WIB". Selesai null -> "07.30 - selesai WIB".
export function formatWaktu(mulai: string, selesai: string | null): string {
  const jamMulai = mulai.replace(":", ".");
  const jamSelesai = selesai ? selesai.replace(":", ".") : "selesai";
  return `${jamMulai} - ${jamSelesai} WIB`;
}

export function findProdi(
  data: MatrikulasiData | null,
  prodiId: string | null,
): MatrikulasiProdi | null {
  if (!data || !prodiId) return null;
  return data.prodi.find((prodi) => prodi.id === prodiId) ?? null;
}

export function isMatrikulasiBanner(
  data: MatrikulasiData | null,
  selectedImageId: string | null,
): boolean {
  return Boolean(
    data && data.prodi.length > 0 && selectedImageId === data.bannerId,
  );
}

// Semua kode yang menunjuk ke satu prodi: id-nya sendiri plus alias.
export function kodeProdi(prodi: MatrikulasiProdi): string[] {
  return [prodi.id, ...(prodi.aliases ?? [])];
}

// Ambil jadwal satu prodi, dikelompokkan per acara dan diurutkan tanggal-jam.
// KETIGA acara selalu dikembalikan walau sesinya kosong — judulnya tetap harus
// muncul di popup supaya jelas bahwa prodi itu memang tidak punya acara tsb,
// bukan datanya yang belum masuk.
export function getAgendaGroups(
  data: MatrikulasiData | null,
  prodiId: string | null,
): AgendaGroup[] {
  const prodi = findProdi(data, prodiId);
  if (!data || !prodi) return [];

  const kode = new Set(kodeProdi(prodi));
  const jadwalProdi = data.jadwal.filter((item) => kode.has(item.prodi));

  return KATEGORI_URUT.map(({ kategori, label }) => ({
    kategori,
    label,
    sesi: jadwalProdi
      .filter((item) => item.kategori === kategori)
      .sort((a, b) =>
        a.tanggal === b.tanggal
          ? a.mulai.localeCompare(b.mulai)
          : a.tanggal.localeCompare(b.tanggal),
      )
      .map((item) => ({
        id: item.id,
        tanggal: formatTanggal(item.hari, item.tanggal),
        lokasi: item.lokasi,
        waktu: formatWaktu(item.mulai, item.selesai),
      })),
  }));
}
