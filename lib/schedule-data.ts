import { promises as fs } from "fs";
import path from "path";

// Satu entry = satu banner di halaman /schedule (index 0..n mengikuti urutan
// banner). Tiap entry punya 3 tab popup: keterangan (dresscode), penugasan,
// dan ketentuan.
export type KeteranganData = {
  title: string;
  subtitle: string;
  date: string;
  location: string;
  time: string[];
  // Path gambar dresscode. Diisi manual dari code editor / file JSON,
  // TIDAK diedit lewat form admin. Contoh: "/assets/dresscode/day1-do.png".
  dresscodeDoImage: string;
  dresscodeDontImage: string;
  // Teks dresscode DO dan DON'T (mis. "Kemeja Putih"). Ini yang diedit admin.
  do: string[];
  dont: string[];
  parentsGathering?: string;
};

export type PopupSection = {
  title: string;
  content: string[];
};

export type ScheduleEntry = {
  keterangan: KeteranganData;
  penugasan: PopupSection;
  ketentuan: PopupSection;
};

export type ScheduleData = ScheduleEntry[];

// Semua fitur schedule membaca/menulis satu file ini.
// Jika folder data dipindah, cukup ubah path ini.
const scheduleDataPath = path.join(process.cwd(), "data", "schedule-data.json");

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function assertSection(value: unknown, label: string): asserts value is PopupSection {
  if (
    !value ||
    typeof value !== "object" ||
    typeof (value as PopupSection).title !== "string" ||
    !isStringArray((value as PopupSection).content)
  ) {
    throw new Error(`Format ${label} tidak valid.`);
  }
}

function assertScheduleData(value: unknown): asserts value is ScheduleData {
  if (!Array.isArray(value)) {
    throw new Error("Schedule data harus berupa array.");
  }

  for (const entry of value) {
    if (!entry || typeof entry !== "object") {
      throw new Error("Format entry schedule tidak valid.");
    }

    const keterangan = (entry as ScheduleEntry).keterangan;
    if (
      !keterangan ||
      typeof keterangan !== "object" ||
      typeof keterangan.title !== "string" ||
      typeof keterangan.subtitle !== "string" ||
      typeof keterangan.date !== "string" ||
      typeof keterangan.location !== "string" ||
      !isStringArray(keterangan.time) ||
      typeof keterangan.dresscodeDoImage !== "string" ||
      typeof keterangan.dresscodeDontImage !== "string" ||
      !isStringArray(keterangan.do) ||
      !isStringArray(keterangan.dont)
    ) {
      throw new Error("Format keterangan schedule tidak valid.");
    }

    assertSection((entry as ScheduleEntry).penugasan, "penugasan");
    assertSection((entry as ScheduleEntry).ketentuan, "ketentuan");
  }
}

export async function getScheduleData(): Promise<ScheduleData> {
  // Dipakai halaman publik /schedule dan halaman admin.
  const file = await fs.readFile(scheduleDataPath, "utf8");
  const data: unknown = JSON.parse(file);
  assertScheduleData(data);
  return data;
}

// Serialisasi kanonik: dipakai saat menulis file DAN saat tombol download
// di admin membuat file. Dengan format identik, file hasil download bisa
// langsung ditaruh ke data/schedule-data.json tanpa perlu diformat ulang.
export function serializeScheduleData(data: ScheduleData): string {
  return `${JSON.stringify(data, null, 2)}\n`;
}

export async function saveScheduleData(data: unknown): Promise<void> {
  // Dipakai server action admin untuk menulis ulang file JSON.
  assertScheduleData(data);
  await fs.mkdir(path.dirname(scheduleDataPath), { recursive: true });
  await fs.writeFile(scheduleDataPath, serializeScheduleData(data), "utf8");
}
