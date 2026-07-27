import { promises as fs } from "fs";
import path from "path";

export type JadwalItem = {
  time: string;
  activity: string;
};

export type JadwalDetails = {
  title: string;
  location: string;
  // Satu baris waktu, atau beberapa baris waktu (mis. "Sesi 1 ...", "Sesi 2 ...").
  time: string | string[];
  dresscode: string;
  dresscodeDoImage?: string;
  dresscodeDontImage?: string;
};

export type JadwalDay = {
  day: string;
  date: string;
  details: JadwalDetails;
  // Rundown opsional. Modul jadwal publik tidak menampilkannya, tetapi field
  // ini dipertahankan agar data lama tetap valid.
  items?: JadwalItem[];
};

// Semua fitur jadwal membaca/menulis satu file ini.
// Jika folder data dipindah, cukup ubah path ini.
const jadwalPath = path.join(process.cwd(), "data", "jadwal.json");

function assertJadwal(value: unknown): asserts value is JadwalDay[] {
  if (!Array.isArray(value)) {
    throw new Error("Jadwal harus berupa array.");
  }

  for (const day of value) {
    if (
      !day ||
      typeof day !== "object" ||
      typeof (day as JadwalDay).day !== "string" ||
      typeof (day as JadwalDay).date !== "string" ||
      typeof (day as JadwalDay).details !== "object" ||
      !(day as JadwalDay).details ||
      (
        typeof (day as JadwalDay).items !== "undefined" &&
        !Array.isArray((day as JadwalDay).items)
      )
    ) {
      throw new Error("Format hari jadwal tidak valid.");
    }

    const details = (day as JadwalDay).details;
    const timeIsValid =
      typeof details.time === "string" ||
      (Array.isArray(details.time) &&
        details.time.every((entry) => typeof entry === "string"));

    if (
      typeof details.title !== "string" ||
      typeof details.location !== "string" ||
      !timeIsValid ||
      typeof details.dresscode !== "string" ||
      (
        typeof details.dresscodeDoImage !== "undefined" &&
        typeof details.dresscodeDoImage !== "string"
      ) ||
      (
        typeof details.dresscodeDontImage !== "undefined" &&
        typeof details.dresscodeDontImage !== "string"
      )
    ) {
      throw new Error("Format detail keterangan jadwal tidak valid.");
    }

    for (const item of (day as JadwalDay).items ?? []) {
      if (
        !item ||
        typeof item !== "object" ||
        typeof (item as JadwalItem).time !== "string" ||
        typeof (item as JadwalItem).activity !== "string"
      ) {
        throw new Error("Format item jadwal tidak valid.");
      }
    }
  }
}

export async function getJadwal() {
  // Dipakai oleh halaman publik /jadwal dan halaman admin.
  const file = await fs.readFile(jadwalPath, "utf8");
  const jadwal: unknown = JSON.parse(file);
  assertJadwal(jadwal);
  return jadwal;
}

export async function saveJadwal(jadwal: unknown) {
  // Dipakai oleh server action admin untuk menulis ulang file JSON.
  assertJadwal(jadwal);
  await fs.mkdir(path.dirname(jadwalPath), { recursive: true });
  await fs.writeFile(jadwalPath, `${JSON.stringify(jadwal, null, 2)}\n`, "utf8");
}

export function jadwalToEditableText(jadwal: JadwalDay[]) {
  // JSON -> textarea admin.
  return jadwal
    .map((day) => {
      const items = (day.items ?? [])
        .map((item) => `${item.time} : ${item.activity}`)
        .join("\n");
      const timeText = Array.isArray(day.details.time)
        ? day.details.time.join(" | ")
        : day.details.time;
      return [
        day.day,
        day.date,
        `Keterangan: ${day.details.title}`,
        `Lokasi: ${day.details.location}`,
        `Waktu: ${timeText}`,
        `Dresscode: ${day.details.dresscode}`,
        `Gambar Do: ${day.details.dresscodeDoImage || "-"}`,
        `Gambar Don't: ${day.details.dresscodeDontImage || "-"}`,
        items,
      ].join("\n");
    })
    .join("\n\n");
}

export function editableTextToJadwal(value: string) {
  // Textarea admin -> JSON. Format wajib:
  // Day 1
  // 17 Agustus 2026
  // Keterangan: Upacara & Pembukaan
  // Lokasi: UC Plaza
  // Waktu: 06.30-13.00 WIB
  // Dresscode: DO
  // Gambar Do: /assets/jadwal/day-1-do.png
  // Gambar Don't: /assets/jadwal/day-1-dont.png
  // 07.00 : Absensi
  // 08.00 : Snack Time
  const days = value
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
      const [dayLine, dateLine, ...restLines] = lines;

      if (!dayLine || !dateLine) {
        throw new Error("Setiap blok jadwal wajib punya judul hari dan tanggal.");
      }

      const details = {
        title: "",
        location: "",
        time: "",
        dresscode: "",
        dresscodeDoImage: "",
        dresscodeDontImage: "",
      };
      const itemLines: string[] = [];

      for (const line of restLines) {
        const detailMatch = line.match(/^(Keterangan|Lokasi|Waktu|Dresscode|Gambar Dresscode|Gambar Do|Gambar Don't|Gambar Dont)\s*:\s*(.*)$/i);

        if (!detailMatch) {
          itemLines.push(line);
          continue;
        }

        const key = detailMatch[1].toLowerCase();
        const detailValue = detailMatch[2].trim();

        if (key === "keterangan") details.title = detailValue;
        if (key === "lokasi") details.location = detailValue;
        if (key === "waktu") details.time = detailValue;
        if (key === "dresscode") details.dresscode = detailValue;
        if (key === "gambar dresscode" || key === "gambar do") {
          details.dresscodeDoImage = detailValue === "-" ? "" : detailValue;
        }
        if (key === "gambar don't" || key === "gambar dont") {
          details.dresscodeDontImage = detailValue === "-" ? "" : detailValue;
        }
      }

      const items = itemLines
        .filter(Boolean)
        .map((line) => {
          const match = line.match(/^([^:]+)\s*:\s*(.+)$/);

          if (!match) {
            throw new Error(`Format baris tidak valid: "${line}". Pakai format "07.00 : Absensi".`);
          }

          return {
            time: match[1].trim(),
            activity: match[2].trim(),
          };
        });

      return {
        day: dayLine,
        date: dateLine,
        details,
        items,
      };
    });

  assertJadwal(days);
  return days;
}
