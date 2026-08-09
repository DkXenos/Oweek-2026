import type { PopupSection } from "./schedule-data";

// Modul ini AMAN dipakai client component: cuma tipe + helper murni, tanpa
// import "fs"/"path". Loader file JSON-nya ada di matrikulasi-data.server.ts
// dan hanya boleh diimpor dari server component.
//
// Data matrikulasi TERPISAH dari data/schedule-data.json supaya editan per
// prodi tidak bentrok dengan data schedule utama yang diedit admin.
// schedule-data.json tetap jadi sumber keterangan/dresscode matrikulasi;
// file matrikulasi hanya menimpa tab penugasan + ketentuan sesuai prodi.
export type MatrikulasiProdi = {
  // id dipakai sebagai value dropdown, mis. "ibm" -> penugasan-ibm/ketentuan-ibm.
  id: string;
  label: string;
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
};

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
