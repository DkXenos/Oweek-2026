import { promises as fs } from "fs";
import path from "path";
import type { PopupSection } from "./schedule-data";
import type {
  MatrikulasiData,
  MatrikulasiJadwal,
  MatrikulasiKategori,
  MatrikulasiProdi,
} from "./matrikulasi-data";
import { KATEGORI_URUT, kodeProdi } from "./matrikulasi-data";

// Hanya untuk server component. Tipe + helper yang dipakai client ada di
// matrikulasi-data.ts (tanpa fs), supaya bundle client tidak ikut menarik
// modul node dan build tidak gagal "Can't resolve 'fs'".
//
// Dua file terpisah, sengaja:
// - matrikulasi-data.json  : konten per prodi (penugasan & ketentuan), diedit tim.
// - matrikulasi-jadwal.json: jadwal mentah 3 acara, gampang di-replace utuh
//   kalau ada revisi tanggal/lokasi tanpa menyentuh konten penugasan.
const matrikulasiDataPath = path.join(
  process.cwd(),
  "data",
  "matrikulasi-data.json",
);
const matrikulasiJadwalPath = path.join(
  process.cwd(),
  "data",
  "matrikulasi-jadwal.json",
);

const KATEGORI_VALID = new Set<string>(
  KATEGORI_URUT.map(({ kategori }) => kategori),
);

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isNullableString(value: unknown): value is string | null {
  return value === null || typeof value === "string";
}

function assertSection(
  value: unknown,
  label: string,
): asserts value is PopupSection {
  if (
    !value ||
    typeof value !== "object" ||
    typeof (value as PopupSection).title !== "string" ||
    !isStringArray((value as PopupSection).content)
  ) {
    throw new Error(`Format ${label} matrikulasi tidak valid.`);
  }
}

export type MatrikulasiKonten = Omit<MatrikulasiData, "jadwal">;

function assertMatrikulasiKonten(
  value: unknown,
): asserts value is MatrikulasiKonten {
  if (
    !value ||
    typeof value !== "object" ||
    typeof (value as MatrikulasiKonten).bannerId !== "string" ||
    typeof (value as MatrikulasiKonten).placeholder !== "string" ||
    !Array.isArray((value as MatrikulasiKonten).prodi)
  ) {
    throw new Error("Format matrikulasi data tidak valid.");
  }

  const seen = new Set<string>();
  for (const prodi of (value as MatrikulasiKonten).prodi) {
    if (
      !prodi ||
      typeof prodi !== "object" ||
      typeof prodi.id !== "string" ||
      prodi.id.trim() === "" ||
      typeof prodi.label !== "string" ||
      (prodi.aliases !== undefined && !isStringArray(prodi.aliases))
    ) {
      throw new Error("Format prodi matrikulasi tidak valid.");
    }
    // id dan alias berbagi satu namespace: dua prodi tidak boleh mengklaim
    // kode yang sama, karena join ke jadwal jadi ambigu.
    for (const kode of kodeProdi(prodi)) {
      if (seen.has(kode)) {
        throw new Error(`Kode prodi matrikulasi duplikat: ${kode}.`);
      }
      seen.add(kode);
    }

    assertSection(prodi.penugasan, `penugasan ${prodi.id}`);
    assertSection(prodi.ketentuan, `ketentuan ${prodi.id}`);
  }
}

function assertMatrikulasiJadwal(
  value: unknown,
): asserts value is MatrikulasiJadwal[] {
  if (!Array.isArray(value)) {
    throw new Error("Jadwal matrikulasi harus berupa array.");
  }

  for (const item of value) {
    if (
      !item ||
      typeof item !== "object" ||
      typeof item.id !== "string" ||
      typeof item.prodi !== "string" ||
      typeof item.hari !== "string" ||
      typeof item.tanggal !== "string" ||
      typeof item.mulai !== "string" ||
      !isNullableString(item.lokasi) ||
      !isNullableString(item.selesai) ||
      // Boleh tidak ada sama sekali: file jadwal mentah kadang di-replace utuh
      // dari sumber yang belum punya kolom dresscode.
      (item.dresscode !== undefined && !isNullableString(item.dresscode))
    ) {
      throw new Error("Format baris jadwal matrikulasi tidak valid.");
    }
    if (!KATEGORI_VALID.has(item.kategori as MatrikulasiKategori)) {
      throw new Error(`Kategori jadwal tidak dikenal: ${String(item.kategori)}.`);
    }
  }
}

export async function getMatrikulasiData(): Promise<MatrikulasiData | null> {
  // Sengaja null-safe: kalau file belum ada / rusak, halaman schedule tetap
  // jalan dan popup matrikulasi cuma kembali ke perilaku normal (tanpa dropdown).
  try {
    const [kontenFile, jadwalFile] = await Promise.all([
      fs.readFile(matrikulasiDataPath, "utf8"),
      fs.readFile(matrikulasiJadwalPath, "utf8"),
    ]);

    const konten: unknown = JSON.parse(kontenFile);
    const jadwal: unknown = JSON.parse(jadwalFile);
    assertMatrikulasiKonten(konten);
    assertMatrikulasiJadwal(jadwal);

    // Kode prodi di jadwal harus punya pasangan (id atau alias) di
    // matrikulasi-data.json, kalau tidak sesinya tidak akan pernah tampil
    // di dropdown mana pun.
    const semuaKode = new Set(
      konten.prodi.flatMap((prodi: MatrikulasiProdi) => kodeProdi(prodi)),
    );
    for (const item of jadwal) {
      if (!semuaKode.has(item.prodi)) {
        throw new Error(
          `Prodi "${item.prodi}" ada di jadwal tapi tidak ada di matrikulasi-data.json.`,
        );
      }
    }

    return { ...konten, jadwal };
  } catch {
    return null;
  }
}

export function serializeMatrikulasiData(data: MatrikulasiData): string {
  return `${JSON.stringify(data, null, 2)}\n`;
}

// Serialisasi kanonik file jadwal. Dipakai saat menulis dari admin DAN saat
// tombol download membuat file, supaya hasil download bisa langsung ditaruh ke
// data/matrikulasi-jadwal.json tanpa diformat ulang.
export function serializeMatrikulasiJadwal(jadwal: MatrikulasiJadwal[]): string {
  return `${JSON.stringify(jadwal, null, 2)}\n`;
}

// Kode prodi di jadwal wajib punya pasangan (id atau alias) di konten. Aturan
// yang sama dipakai getMatrikulasiData() saat membaca — dicek juga di sini
// supaya admin tidak bisa menyimpan data yang nanti gagal dibaca.
function assertJadwalCocokDenganKonten(
  konten: MatrikulasiKonten,
  jadwal: MatrikulasiJadwal[],
): void {
  const semuaKode = new Set(
    konten.prodi.flatMap((prodi: MatrikulasiProdi) => kodeProdi(prodi)),
  );
  for (const item of jadwal) {
    if (!semuaKode.has(item.prodi)) {
      throw new Error(
        `Prodi "${item.prodi}" ada di jadwal tapi tidak ada di daftar prodi.`,
      );
    }
  }

  const idTerpakai = new Set<string>();
  for (const item of jadwal) {
    if (item.id.trim() === "") {
      throw new Error("Ada baris jadwal tanpa id.");
    }
    if (idTerpakai.has(item.id)) {
      throw new Error(`Id baris jadwal duplikat: ${item.id}.`);
    }
    idTerpakai.add(item.id);
  }
}

// Dipakai server action admin. Yang bisa diedit dari admin cuma jadwal, jadi
// hanya matrikulasi-jadwal.json yang ditulis ulang. Daftar prodi di
// matrikulasi-data.json dibaca dari file (bukan dikirim dari browser) supaya
// tidak bisa ikut terubah lewat form.
export async function saveMatrikulasiJadwal(jadwal: unknown): Promise<void> {
  assertMatrikulasiJadwal(jadwal);

  const kontenFile = await fs.readFile(matrikulasiDataPath, "utf8");
  const konten: unknown = JSON.parse(kontenFile);
  assertMatrikulasiKonten(konten);
  assertJadwalCocokDenganKonten(konten, jadwal);

  await fs.mkdir(path.dirname(matrikulasiJadwalPath), { recursive: true });
  await fs.writeFile(
    matrikulasiJadwalPath,
    serializeMatrikulasiJadwal(jadwal),
    "utf8",
  );
}
