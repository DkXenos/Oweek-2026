"use client";

import { useState } from "react";
// Hanya import TYPE dari lib/schedule-data. Import type di-erase saat build,
// jadi modul fs/path di lib itu TIDAK ikut ke bundle client.
import type { ScheduleData } from "../../../lib/schedule-data";
import AutoGrowTextarea from "./AutoGrowTextarea";

type AdminScheduleFormProps = {
  initialData: ScheduleData;
  action: (formData: FormData) => void;
};

// Selama diedit, field yang aslinya array (time, content) disimpan
// sebagai teks multi-baris. Konversi ke array baru dilakukan saat submit /
// download supaya caret input tidak "loncat" tiap ketikan.
type DraftEntry = {
  keterangan: {
    title: string;
    subtitle: string;
    date: string;
    location: string;
    time: string;
    // Path gambar tidak diedit di form, tapi tetap dibawa agar tidak hilang
    // saat disimpan / didownload.
    dresscodeDoImage: string;
    dresscode: string;
    // URL opsional untuk link "Pelajari lebih lanjut" (dipakai banner
    // Parents Gathering). Kosong = link tidak ditampilkan.
    parentsGathering: string;
  };
  penugasan: { title: string; content: string };
  ketentuan: { title: string; content: string };
};

function linesToText(lines: string[]): string {
  return lines.join("\n");
}

function textToLines(text: string): string[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function toSubtitle(text: string): string | string[] {
  const lines = textToLines(text);
  if (lines.length > 1) return lines;
  return lines[0] ?? "";
}

function toDraft(data: ScheduleData): DraftEntry[] {
  return data.map((entry) => ({
    keterangan: {
      title: entry.keterangan.title,
      // subtitle boleh satu baris (string) atau beberapa baris (array); di form
      // keduanya diedit sebagai teks multi-baris.
      subtitle: Array.isArray(entry.keterangan.subtitle)
        ? linesToText(entry.keterangan.subtitle)
        : entry.keterangan.subtitle,
      date: entry.keterangan.date,
      location: entry.keterangan.location,
      time: linesToText(entry.keterangan.time),
      dresscodeDoImage: entry.keterangan.dresscodeDoImage,
      dresscode: entry.keterangan.dresscode,
      parentsGathering: entry.keterangan.parentsGathering ?? "",
    },
    penugasan: {
      title: entry.penugasan.title,
      content: linesToText(entry.penugasan.content),
    },
    ketentuan: {
      title: entry.ketentuan.title,
      content: linesToText(entry.ketentuan.content),
    },
  }));
}

function fromDraft(draft: DraftEntry[]): ScheduleData {
  return draft.map((entry) => ({
    keterangan: {
      title: entry.keterangan.title,
      // Ditulis balik sebagai array hanya kalau memang lebih dari satu baris,
      // supaya subtitle satu baris tetap tersimpan sebagai string biasa.
      subtitle: toSubtitle(entry.keterangan.subtitle),
      date: entry.keterangan.date,
      location: entry.keterangan.location,
      time: textToLines(entry.keterangan.time),
      dresscodeDoImage: entry.keterangan.dresscodeDoImage,
      dresscode: entry.keterangan.dresscode,
      // Field opsional: hanya ditulis ke JSON kalau memang diisi.
      ...(entry.keterangan.parentsGathering.trim()
        ? { parentsGathering: entry.keterangan.parentsGathering.trim() }
        : {}),
    },
    penugasan: {
      title: entry.penugasan.title,
      content: textToLines(entry.penugasan.content),
    },
    ketentuan: {
      title: entry.ketentuan.title,
      content: textToLines(entry.ketentuan.content),
    },
  }));
}

// HARUS identik dengan serializeScheduleData() di lib/schedule-data.ts, supaya
// file hasil download bisa langsung ditaruh ke data/schedule-data.json.
function serialize(data: ScheduleData): string {
  return `${JSON.stringify(data, null, 2)}\n`;
}

export default function AdminScheduleForm({
  initialData,
  action,
}: AdminScheduleFormProps) {
  const [draft, setDraft] = useState<DraftEntry[]>(() => toDraft(initialData));
  // Hanya satu hari yang ditampilkan sekaligus, dipilih lewat dropdown.
  const [selectedIndex, setSelectedIndex] = useState(0);

  const dataForSubmit = fromDraft(draft);
  const index = Math.min(selectedIndex, draft.length - 1);
  const entry = draft[index];

  // Update satu entry tanpa mengubah entry lain.
  const updateEntry = (index: number, next: DraftEntry) => {
    setDraft((current) => current.map((e, i) => (i === index ? next : e)));
  };

  const downloadJson = () => {
    const blob = new Blob([serialize(dataForSubmit)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "schedule-data.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <form action={action} className="admin-editor">
      {/* Server action menerima seluruh data sebagai JSON tersembunyi. */}
      <input
        type="hidden"
        name="scheduleJson"
        value={JSON.stringify(dataForSubmit)}
      />

      <p className="admin-help">
        Edit isi popup Keterangan (dresscode), Penugasan, dan Ketentuan untuk
        tiap hari. Untuk field bertanda &quot;satu baris = satu item&quot;, tulis
        satu item per baris. Path gambar dresscode diatur manual lewat file JSON
        / code editor, jadi tidak muncul di sini.
      </p>

      <label className="admin-field admin-day-selector">
        <span>Pilih Hari</span>
        <select
          value={index}
          onChange={(event) => setSelectedIndex(Number(event.target.value))}
        >
          {draft.map((item, i) => (
            <option key={i} value={i}>
              {i + 1}. {item.keterangan.title || `Entry ${i + 1}`}
            </option>
          ))}
        </select>
      </label>

      <div className="admin-day-list">
        {/* Hanya render hari yang dipilih. key=index memaksa remount saat ganti
            hari, tapi tetap stabil selama satu hari diedit (fokus tidak hilang). */}
          <section className="admin-day-panel" key={index}>
            <header className="admin-day-header">
              <h2>{entry.keterangan.title || `Entry ${index + 1}`}</h2>
            </header>

            {/* ---------- KETERANGAN ---------- */}
            <h3 className="admin-section-title">Keterangan</h3>
            <div className="admin-form-grid">
              <label className="admin-field">
                <span>Judul</span>
                <input
                  type="text"
                  value={entry.keterangan.title}
                  onChange={(event) =>
                    updateEntry(index, {
                      ...entry,
                      keterangan: { ...entry.keterangan, title: event.target.value },
                    })
                  }
                  required
                />
              </label>

              <label className="admin-field">
                <span>Tanggal</span>
                <input
                  type="text"
                  value={entry.keterangan.date}
                  onChange={(event) =>
                    updateEntry(index, {
                      ...entry,
                      keterangan: { ...entry.keterangan, date: event.target.value },
                    })
                  }
                  placeholder="Minggu, 17 Agustus 2026"
                />
              </label>

              <label className="admin-field admin-field-wide">
                <span>Subjudul (satu baris = satu baris tampilan)</span>
                <AutoGrowTextarea
                  value={entry.keterangan.subtitle}
                  onChange={(event) =>
                    updateEntry(index, {
                      ...entry,
                      keterangan: { ...entry.keterangan, subtitle: event.target.value },
                    })
                  }
                />
              </label>

              <label className="admin-field admin-field-wide">
                <span>Lokasi</span>
                <input
                  type="text"
                  value={entry.keterangan.location}
                  onChange={(event) =>
                    updateEntry(index, {
                      ...entry,
                      keterangan: { ...entry.keterangan, location: event.target.value },
                    })
                  }
                />
              </label>

              <label className="admin-field admin-field-wide">
                <span>Waktu (satu baris = satu item)</span>
                <AutoGrowTextarea
                  value={entry.keterangan.time}
                  onChange={(event) =>
                    updateEntry(index, {
                      ...entry,
                      keterangan: { ...entry.keterangan, time: event.target.value },
                    })
                  }
                  placeholder={"Sesi 1 07.30-12.15 WIB\nSesi 2 12.15-17.00 WIB"}
                />
              </label>

              <label className="admin-field admin-field-wide">
                <span>Dresscode (satu baris teks, tampil di tengah)</span>
                <input
                  type="text"
                  value={entry.keterangan.dresscode}
                  onChange={(event) =>
                    updateEntry(index, {
                      ...entry,
                      keterangan: { ...entry.keterangan, dresscode: event.target.value },
                    })
                  }
                  placeholder="Kemeja Putih, Jeans Hitam, Sepatu Hitam"
                />
              </label>

              <label className="admin-field admin-field-wide">
                <span>
                  Link &quot;Pelajari lebih lanjut&quot; (opsional, dipakai banner
                  Parents Gathering). Kosongkan kalau tidak dipakai.
                </span>
                <input
                  type="url"
                  value={entry.keterangan.parentsGathering}
                  onChange={(event) =>
                    updateEntry(index, {
                      ...entry,
                      keterangan: {
                        ...entry.keterangan,
                        parentsGathering: event.target.value,
                      },
                    })
                  }
                  placeholder="https://..."
                />
              </label>
            </div>

            {/* ---------- PENUGASAN ---------- */}
            <h3 className="admin-section-title">Penugasan</h3>
            <div className="admin-form-grid">
              <label className="admin-field admin-field-wide">
                <span>Judul Penugasan</span>
                <input
                  type="text"
                  value={entry.penugasan.title}
                  onChange={(event) =>
                    updateEntry(index, {
                      ...entry,
                      penugasan: { ...entry.penugasan, title: event.target.value },
                    })
                  }
                />
              </label>

              <label className="admin-field admin-field-wide">
                <span>
                  Isi Penugasan (satu baris = satu poin). Format: &quot;## JUDUL&quot; =
                  judul blok, &quot;# Judul&quot; = sub-judul, *tebal*,
                  [LINK](https://...) = hyperlink
                </span>
                <AutoGrowTextarea
                  value={entry.penugasan.content}
                  onChange={(event) =>
                    updateEntry(index, {
                      ...entry,
                      penugasan: { ...entry.penugasan, content: event.target.value },
                    })
                  }
                />
              </label>
            </div>

            {/* ---------- KETENTUAN ---------- */}
            <h3 className="admin-section-title">Ketentuan</h3>
            <div className="admin-form-grid">
              <label className="admin-field admin-field-wide">
                <span>Judul Ketentuan</span>
                <input
                  type="text"
                  value={entry.ketentuan.title}
                  onChange={(event) =>
                    updateEntry(index, {
                      ...entry,
                      ketentuan: { ...entry.ketentuan, title: event.target.value },
                    })
                  }
                />
              </label>

              <label className="admin-field admin-field-wide">
                <span>
                  Isi Ketentuan (satu baris = satu poin). Format: &quot;## JUDUL&quot; =
                  judul blok, &quot;# Judul&quot; = sub-judul, *tebal*,
                  [LINK](https://...) = hyperlink
                </span>
                <AutoGrowTextarea
                  value={entry.ketentuan.content}
                  onChange={(event) =>
                    updateEntry(index, {
                      ...entry,
                      ketentuan: { ...entry.ketentuan, content: event.target.value },
                    })
                  }
                />
              </label>
            </div>
          </section>
      </div>

      <div className="admin-form-actions">
        <button className="admin-secondary-button" type="button" onClick={downloadJson}>
          Download JSON (Backup)
        </button>
        <button className="admin-save" type="submit">
          Simpan
        </button>
      </div>
    </form>
  );
}
