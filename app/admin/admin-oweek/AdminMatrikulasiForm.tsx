"use client";

import { useState } from "react";
// Hanya import TYPE dari lib. Import type di-erase saat build, jadi modul
// fs/path di matrikulasi-data.server.ts TIDAK ikut ke bundle client.
import type {
  MatrikulasiData,
  MatrikulasiJadwal,
  MatrikulasiKategori,
  MatrikulasiProdi,
} from "../../../lib/matrikulasi-data";
import { KATEGORI_URUT, kodeProdi } from "../../../lib/matrikulasi-data";

type AdminMatrikulasiFormProps = {
  initialData: MatrikulasiData;
  action: (formData: FormData) => void;
};

// Panel ini HANYA mengedit jadwal (matrikulasi-jadwal.json). Penugasan &
// ketentuan per prodi tidak diedit di sini — popup matrikulasi memang cuma
// menampilkan tab keterangan, jadi field-nya tidak ada gunanya di form.
// Daftar prodi (matrikulasi-data.json) dipakai untuk filter saja.

const HARI = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

// "2026-08-03" -> "Senin". Tanggal di-parse sebagai waktu lokal (bukan
// new Date("2026-08-03") yang dibaca UTC dan bisa mundur sehari).
function hariDariTanggal(tanggal: string): string {
  const [tahun, bulan, hari] = tanggal.split("-").map(Number);
  if (!tahun || !bulan || !hari) return "";
  return HARI[new Date(tahun, bulan - 1, hari).getDay()] ?? "";
}

// HARUS identik dengan serializeMatrikulasiJadwal() di
// lib/matrikulasi-data.server.ts, supaya file hasil download bisa langsung
// ditaruh ke data/matrikulasi-jadwal.json.
function serialize(data: unknown): string {
  return `${JSON.stringify(data, null, 2)}\n`;
}

export default function AdminMatrikulasiForm({
  initialData,
  action,
}: AdminMatrikulasiFormProps) {
  const [jadwal, setJadwal] = useState<MatrikulasiJadwal[]>(
    () => initialData.jadwal,
  );
  // Sama seperti form schedule: satu prodi ditampilkan sekaligus, dipilih lewat
  // dropdown. Bedanya di sini dropdown-nya juga jadi filter untuk jadwal.
  const [selectedProdiIndex, setSelectedProdiIndex] = useState(0);

  const index = Math.min(selectedProdiIndex, initialData.prodi.length - 1);
  const prodi: MatrikulasiProdi = initialData.prodi[index];

  // Satu prodi bisa punya beberapa kode (id + alias, mis. CB dan CBz), jadi
  // filternya memakai kodeProdi() — logika yang sama dengan popup schedule.
  const kodeAktif = new Set(kodeProdi(prodi));
  // Index asli disimpan supaya update/hapus menunjuk ke baris yang benar di
  // array jadwal penuh, bukan di hasil filter.
  const barisProdi = jadwal
    .map((item, jadwalIndex) => ({ item, jadwalIndex }))
    .filter(({ item }) => kodeAktif.has(item.prodi));

  const updateBaris = (jadwalIndex: number, next: MatrikulasiJadwal) => {
    setJadwal((current) =>
      current.map((item, i) => (i === jadwalIndex ? next : item)),
    );
  };

  const hapusBaris = (jadwalIndex: number) => {
    setJadwal((current) => current.filter((_, i) => i !== jadwalIndex));
  };

  const tambahBaris = (kategori: MatrikulasiKategori) => {
    setJadwal((current) => {
      // Id wajib unik. Kalau pola dasarnya bentrok, ditambah -2, -3, dst.
      const dasar = `baru-${prodi.id.toLowerCase()}-${kategori}`;
      const terpakai = new Set(current.map((item) => item.id));
      let id = dasar;
      let urutan = 2;
      while (terpakai.has(id)) {
        id = `${dasar}-${urutan}`;
        urutan += 1;
      }

      return [
        ...current,
        {
          id,
          prodi: prodi.id,
          kategori,
          hari: "",
          tanggal: "",
          lokasi: null,
          mulai: "",
          selesai: null,
          dresscode: null,
        },
      ];
    });
  };

  const downloadJson = () => {
    const blob = new Blob([serialize(jadwal)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "matrikulasi-jadwal.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <form action={action} className="admin-editor">
      {/* Server action menerima seluruh jadwal sebagai JSON tersembunyi. */}
      <input
        type="hidden"
        name="matrikulasiJadwalJson"
        value={JSON.stringify(jadwal)}
      />

      <p className="admin-help">
        Pilih prodi dulu, lalu edit jadwal Matrikulasi, Industry Visit, dan Prodi
        Day untuk prodi tersebut. Jam selesai kosong = tampil
        &quot;selesai&quot;; lokasi/dresscode kosong = barisnya tidak muncul di
        popup. Nama hari terisi otomatis dari tanggal.
      </p>

      <label className="admin-field admin-day-selector">
        <span>Pilih Program Studi</span>
        <select
          value={index}
          onChange={(event) =>
            setSelectedProdiIndex(Number(event.target.value))
          }
        >
          {initialData.prodi.map((item, i) => (
            <option key={item.id} value={i}>
              {item.label || item.id}
            </option>
          ))}
        </select>
      </label>

      <div className="admin-day-list">
        {/* key=prodi.id memaksa remount saat ganti prodi, tapi tetap stabil
            selama satu prodi diedit (fokus input tidak hilang). */}
        <section className="admin-day-panel" key={prodi.id}>
          <header className="admin-day-header">
            <h2>{prodi.label || prodi.id}</h2>
          </header>

          {KATEGORI_URUT.map(({ kategori, label }) => {
            const baris = barisProdi.filter(
              ({ item }) => item.kategori === kategori,
            );

            return (
              <div key={kategori}>
                <h3 className="admin-section-title">{label}</h3>

                {baris.length === 0 ? (
                  <p className="admin-help">
                    Belum ada jadwal {label} untuk prodi ini.
                  </p>
                ) : (
                  baris.map(({ item, jadwalIndex }) => (
                    <div className="admin-form-grid" key={item.id}>
                      <label className="admin-field">
                        <span>Tanggal{item.hari ? ` (${item.hari})` : ""}</span>
                        <input
                          type="date"
                          value={item.tanggal}
                          onChange={(event) =>
                            updateBaris(jadwalIndex, {
                              ...item,
                              tanggal: event.target.value,
                              hari: hariDariTanggal(event.target.value),
                            })
                          }
                          required
                        />
                      </label>

                      <label className="admin-field">
                        <span>Lokasi (kosongkan kalau belum ada)</span>
                        <input
                          type="text"
                          value={item.lokasi ?? ""}
                          onChange={(event) =>
                            updateBaris(jadwalIndex, {
                              ...item,
                              lokasi: event.target.value.trim()
                                ? event.target.value
                                : null,
                            })
                          }
                        />
                      </label>

                      <label className="admin-field">
                        <span>Jam Mulai</span>
                        <input
                          type="time"
                          value={item.mulai}
                          onChange={(event) =>
                            updateBaris(jadwalIndex, {
                              ...item,
                              mulai: event.target.value,
                            })
                          }
                          required
                        />
                      </label>

                      <label className="admin-field">
                        <span>Jam Selesai (kosong = &quot;selesai&quot;)</span>
                        <input
                          type="time"
                          value={item.selesai ?? ""}
                          onChange={(event) =>
                            updateBaris(jadwalIndex, {
                              ...item,
                              selesai: event.target.value || null,
                            })
                          }
                        />
                      </label>

                      <label className="admin-field admin-field-wide">
                        <span>Dresscode (kosongkan kalau belum ada)</span>
                        <input
                          type="text"
                          value={item.dresscode ?? ""}
                          onChange={(event) =>
                            updateBaris(jadwalIndex, {
                              ...item,
                              dresscode: event.target.value.trim()
                                ? event.target.value
                                : null,
                            })
                          }
                        />
                      </label>

                      <div className="admin-field">
                        <button
                          className="admin-icon-button"
                          type="button"
                          onClick={() => hapusBaris(jadwalIndex)}
                        >
                          Hapus sesi ini
                        </button>
                      </div>
                    </div>
                  ))
                )}

                <button
                  className="admin-small-button"
                  type="button"
                  onClick={() => tambahBaris(kategori)}
                >
                  + Tambah sesi {label}
                </button>
              </div>
            );
          })}
        </section>
      </div>

      <div className="admin-form-actions">
        <button
          className="admin-secondary-button"
          type="button"
          onClick={downloadJson}
        >
          Download JSON (Backup)
        </button>
        <button className="admin-save" type="submit">
          Simpan Matrikulasi
        </button>
      </div>
    </form>
  );
}
