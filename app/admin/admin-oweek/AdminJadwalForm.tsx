"use client";

import { useState } from "react";
import type { JadwalDay } from "../../../lib/jadwal";

type AdminJadwalFormProps = {
  initialJadwal: JadwalDay[];
  action: (formData: FormData) => void;
};

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
    items: [{ time: "", activity: "" }],
  };
}

export default function AdminJadwalForm({
  initialJadwal,
  action,
}: AdminJadwalFormProps) {
  const [jadwal, setJadwal] = useState<JadwalDay[]>(initialJadwal);

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

  const addRundownItem = (dayIndex: number) => {
    const day = jadwal[dayIndex];
    updateDay(dayIndex, {
      ...day,
      items: [...day.items, { time: "", activity: "" }],
    });
  };

  const removeRundownItem = (dayIndex: number, itemIndex: number) => {
    const day = jadwal[dayIndex];
    updateDay(dayIndex, {
      ...day,
      items: day.items.filter((_, index) => index !== itemIndex),
    });
  };

  return (
    <form action={action} className="admin-editor">
      {/* Server action menerima JSON dari state form ini.
          Field gambar Do/Don't tetap tersimpan di state, tetapi tidak
          ditampilkan agar admin tidak merusak path secara manual. */}
      <input type="hidden" name="jadwalJson" value={JSON.stringify(jadwal)} />

      <p className="admin-help">
        Edit data jadwal lewat field terpisah. Path gambar Do/Don&apos;t
        disimpan otomatis dari form upload, jadi tidak perlu diedit manual.
      </p>

      <div className="admin-day-list">
        {jadwal.map((day, dayIndex) => (
          <section className="admin-day-panel" key={`${day.day}-${dayIndex}`}>
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
                  placeholder="17 Agustus 2026"
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
                  required
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

              <label className="admin-field">
                <span>Waktu</span>
                <input
                  type="text"
                  value={day.details.time}
                  onChange={(event) =>
                    updateDay(dayIndex, {
                      ...day,
                      details: { ...day.details, time: event.target.value },
                    })
                  }
                  placeholder="06.30-13.00 WIB"
                  required
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
                  required
                />
              </label>
            </div>

            <div className="admin-rundown">
              <div className="admin-rundown-title">
                <h3>Rundown</h3>
                <button
                  className="admin-small-button"
                  type="button"
                  onClick={() => addRundownItem(dayIndex)}
                >
                  Tambah Rundown
                </button>
              </div>

              {day.items.map((item, itemIndex) => (
                <div
                  className="admin-rundown-row"
                  key={`${day.day}-${itemIndex}`}
                >
                  <input
                    type="text"
                    value={item.time}
                    onChange={(event) => {
                      const items = day.items.map((currentItem, index) =>
                        index === itemIndex
                          ? { ...currentItem, time: event.target.value }
                          : currentItem,
                      );
                      updateDay(dayIndex, { ...day, items });
                    }}
                    placeholder="07.00"
                    required
                  />
                  <input
                    type="text"
                    value={item.activity}
                    onChange={(event) => {
                      const items = day.items.map((currentItem, index) =>
                        index === itemIndex
                          ? { ...currentItem, activity: event.target.value }
                          : currentItem,
                      );
                      updateDay(dayIndex, { ...day, items });
                    }}
                    placeholder="Absensi"
                    required
                  />
                  <button
                    className="admin-icon-button"
                    type="button"
                    onClick={() => removeRundownItem(dayIndex, itemIndex)}
                    disabled={day.items.length === 1}
                    aria-label="Hapus rundown"
                  >
                    X
                  </button>
                </div>
              ))}
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
