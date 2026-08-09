import { promises as fs } from "fs";
import path from "path";
import type { PopupSection } from "./schedule-data";
import type { MatrikulasiData } from "./matrikulasi-data";

// Hanya untuk server component. Tipe + helper yang dipakai client ada di
// matrikulasi-data.ts (tanpa fs), supaya bundle client tidak ikut menarik
// modul node dan build tidak gagal "Can't resolve 'fs'".
const matrikulasiDataPath = path.join(
  process.cwd(),
  "data",
  "matrikulasi-data.json",
);

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
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

function assertMatrikulasiData(
  value: unknown,
): asserts value is MatrikulasiData {
  if (
    !value ||
    typeof value !== "object" ||
    typeof (value as MatrikulasiData).bannerId !== "string" ||
    typeof (value as MatrikulasiData).placeholder !== "string" ||
    !Array.isArray((value as MatrikulasiData).prodi)
  ) {
    throw new Error("Format matrikulasi data tidak valid.");
  }

  const seen = new Set<string>();
  for (const prodi of (value as MatrikulasiData).prodi) {
    if (
      !prodi ||
      typeof prodi !== "object" ||
      typeof prodi.id !== "string" ||
      prodi.id.trim() === "" ||
      typeof prodi.label !== "string"
    ) {
      throw new Error("Format prodi matrikulasi tidak valid.");
    }
    if (seen.has(prodi.id)) {
      throw new Error(`Prodi matrikulasi duplikat: ${prodi.id}.`);
    }
    seen.add(prodi.id);

    assertSection(prodi.penugasan, `penugasan ${prodi.id}`);
    assertSection(prodi.ketentuan, `ketentuan ${prodi.id}`);
  }
}

export async function getMatrikulasiData(): Promise<MatrikulasiData | null> {
  // Sengaja null-safe: kalau file belum ada / rusak, halaman schedule tetap
  // jalan dan popup matrikulasi cuma kembali ke perilaku normal (tanpa dropdown).
  try {
    const file = await fs.readFile(matrikulasiDataPath, "utf8");
    const data: unknown = JSON.parse(file);
    assertMatrikulasiData(data);
    return data;
  } catch {
    return null;
  }
}

export function serializeMatrikulasiData(data: MatrikulasiData): string {
  return `${JSON.stringify(data, null, 2)}\n`;
}
