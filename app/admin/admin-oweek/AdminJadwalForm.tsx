"use client";

import { useState } from "react";
import type { JadwalDay } from "../../../lib/jadwal";

type AdminJadwalFormProps = {
  initialJadwal: JadwalDay[];
  action: (formData: FormData) => void;
};

// Waktu bisa satu baris atau beberapa baris. Di form, admin mengetik satu
// waktu per baris. Simpan sebagai string kalau cuma satu baris, atau array
// kalau lebih dari satu, supaya JSON tetap rapi.
function timeToText(time: string | string[]): string {
  return Array.isArray(time) ? time.join("\n") : time;
}

// Selama diedit, waktu disimpan apa adanya sebagai teks (spasi/baris kosong
// tetap utuh). Konversi ke string/array baru dilakukan saat form dikirim.
function toEditableDay(day: JadwalDay): JadwalDay {
  return {
    ...day,
    details: { ...day.details, time: timeToText(day.details.time) },
  };
}

function textToTime(text: string): string | string[] {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length <= 1) return lines[0] ?? "";
  return lines;
}

function createEmptyDay(): JadwalDay {
  // Template day baru. Path gambar sengaja kosong karena gambar diatur
  // melalui form upload, bukan dari form data utama.
  return {
    day: "Day Baru",
    date: "",
    details: {
      title: "",
      location: "",
      time: "",
      dresscode: "",
      dresscodeDoImage: "",
      dresscodeDontImage: "",
    },
    items: [],
  };
}

export default function AdminJadwalForm({
  initialJadwal,
  action,
}: AdminJadwalFormProps) {
  const [jadwal, setJadwal] = useState<JadwalDay[]>(() =>
    initialJadwal.map(toEditableDay),
  );

  // Bentuk final yang dikirim ke server action.
  const jadwalForSubmit = jadwal.map((day) => ({
    ...day,
    details: {
      ...day.details,
      time: textToTime(timeToText(day.details.time)),
    },
  }));

  const updateDay = (dayIndex: number, nextDay: JadwalDay) => {
    // Update satu day tanpa mengubah day lain.
    setJadwal((current) =>
      current.map((day, index) => (index === dayIndex ? nextDay : day)),
    );
  };

  const addDay = () => {
    setJadwal((current) => [...current, createEmptyDay()]);
  };

  const removeDay = (dayIndex: number) => {
    setJadwal((current) => current.filter((_, index) => index !== dayIndex));
  };

  return (
    <form action={action} className="admin-editor">
      {/* Server action menerima JSON dari state form ini.
          Field gambar Do/Don't tetap tersimpan di state, tetapi tidak
          ditampilkan agar admin tidak merusak path secara manual. */}
      <input
        type="hidden"
        name="jadwalJson"
        value={JSON.stringify(jadwalForSubmit)}
      />

      <p className="admin-help">
        Edit data jadwal lewat field terpisah. Path gambar Do/Don&apos;t
        disimpan otomatis dari form upload, jadi tidak perlu diedit manual.
      </p>

      <div className="admin-day-list">
        {jadwal.map((day, dayIndex) => (
          // Key WAJIB tidak ikut berubah saat field diedit. Kalau key memakai
          // day.day, tiap ketikan bikin React unmount panel lama dan mount
          // panel baru, jadi input kehilangan fokus setelah 1 huruf.
          <section className="admin-day-panel" key={dayIndex}>
            <header className="admin-day-header">
              <h2>{day.day || `Day ${dayIndex + 1}`}</h2>
              <button
                className="admin-small-button"
                type="button"
                onClick={() => removeDay(dayIndex)}
                disabled={jadwal.length === 1}
              >
                Hapus Day
              </button>
            </header>

            <div className="admin-form-grid">
              <label className="admin-field">
                <span>Judul Day</span>
                <input
                  type="text"
                  value={day.day}
                  onChange={(event) =>
                    updateDay(dayIndex, { ...day, day: event.target.value })
                  }
                  required
                />
              </label>

              <label className="admin-field">
                <span>Tanggal</span>
                <input
                  type="text"
                  value={day.date}
                  onChange={(event) =>
                    updateDay(dayIndex, { ...day, date: event.target.value })
                  }
                  placeholder="Minggu, 17 Agustus 2026"
                  required
                />
              </label>

              <label className="admin-field admin-field-wide">
                <span>Keterangan</span>
                <input
                  type="text"
                  value={day.details.title}
                  onChange={(event) =>
                    updateDay(dayIndex, {
                      ...day,
                      details: { ...day.details, title: event.target.value },
                    })
                  }
                />
              </label>

              <label className="admin-field">
                <span>Lokasi</span>
                <input
                  type="text"
                  value={day.details.location}
                  onChange={(event) =>
                    updateDay(dayIndex, {
                      ...day,
                      details: { ...day.details, location: event.target.value },
                    })
                  }
                  required
                />
              </label>

              <label className="admin-field admin-field-wide">
                <span>Waktu (satu baris per waktu)</span>
                <textarea
                  rows={3}
                  value={timeToText(day.details.time)}
                  onChange={(event) =>
                    updateDay(dayIndex, {
                      ...day,
                      details: {
                        ...day.details,
                        time: textToTime(event.target.value),
                      },
                    })
                  }
                  placeholder={"Sesi 1 07.30-12.15 WIB\nSesi 2 12.15-17.00 WIB"}
                />
              </label>

              <label className="admin-field admin-field-wide">
                <span>Dresscode</span>
                <input
                  type="text"
                  value={day.details.dresscode}
                  onChange={(event) =>
                    updateDay(dayIndex, {
                      ...day,
                      details: { ...day.details, dresscode: event.target.value },
                    })
                  }
                />
              </label>
            </div>
          </section>
        ))}
      </div>

      <div className="admin-form-actions">
        <button className="admin-secondary-button" type="button" onClick={addDay}>
          Tambah Day
        </button>
        <button className="admin-save" type="submit">
          Simpan Jadwal
        </button>
      </div>
    </form>
  );
}
