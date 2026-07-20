"use client";

import { useMemo, useState } from "react";
import type { JadwalDay } from "../../../lib/jadwal";

type JadwalViewerProps = {
  schedule: JadwalDay[];
};

export default function JadwalViewer({ schedule }: JadwalViewerProps) {
  // activeIndex menentukan day yang sedang tampil di card utama.
  // popupDay berisi data day yang sedang dibuka di popup detail.
  const [activeIndex, setActiveIndex] = useState(0);
  const [popupDay, setPopupDay] = useState<JadwalDay | null>(null);

  const activeDay = schedule[activeIndex];
  const hasMultipleDays = schedule.length > 1;

  const counterLabel = useMemo(() => {
    if (!schedule.length) return "0 / 0";
    return `${activeIndex + 1} / ${schedule.length}`;
  }, [activeIndex, schedule.length]);

  const showPreviousDay = () => {
    setActiveIndex((current) => (current === 0 ? schedule.length - 1 : current - 1));
  };

  const showNextDay = () => {
    setActiveIndex((current) => (current === schedule.length - 1 ? 0 : current + 1));
  };

  if (!activeDay) {
    return <p className="jadwal-empty">Jadwal belum tersedia.</p>;
  }

  return (
    <>
      <div className="jadwal-carousel" aria-live="polite">
        <button
          className="jadwal-nav-button"
          type="button"
          onClick={showPreviousDay}
          disabled={!hasMultipleDays}
          aria-label="Tampilkan hari sebelumnya"
        >
          Prev
        </button>

        <button
          className="jadwal-day-card"
          type="button"
          onClick={() => setPopupDay(activeDay)}
          aria-label={`Buka rundown ${activeDay.day}`}
        >
          <span className="jadwal-day-count">{counterLabel}</span>
          {/* Class is-long menjaga judul panjang seperti "Pra-Oweek" tetap rapi di mobile. */}
          <strong className={activeDay.day.length > 7 ? "is-long" : undefined}>
            {activeDay.day}
          </strong>
          <span>{activeDay.date}</span>
          <small>Klik untuk lihat rundown</small>
        </button>

        <button
          className="jadwal-nav-button"
          type="button"
          onClick={showNextDay}
          disabled={!hasMultipleDays}
          aria-label="Tampilkan hari berikutnya"
        >
          Next
        </button>
      </div>

      <div className="jadwal-dot-row" aria-label="Pilih hari">
        {schedule.map((day, index) => (
          <button
            className={index === activeIndex ? "jadwal-dot is-active" : "jadwal-dot"}
            type="button"
            key={`${day.day}-${day.date}`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Tampilkan ${day.day}`}
            aria-current={index === activeIndex ? "true" : undefined}
          />
        ))}
      </div>

      {popupDay ? (
        <div
          className="jadwal-modal-backdrop"
          role="presentation"
          onClick={() => setPopupDay(null)}
        >
          <section
            className="jadwal-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="jadwal-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="jadwal-modal-close"
              type="button"
              onClick={() => setPopupDay(null)}
              aria-label="Tutup popup rundown"
            >
              X
            </button>

            <div className="jadwal-modal-scroll">
              <p className="jadwal-modal-section-title">Keterangan</p>
              <h2 id="jadwal-modal-title">{popupDay.details.title}</h2>

              <ul className="jadwal-info-list">
                <li>
                  <span className="jadwal-info-dot" />
                  <span>{popupDay.date}</span>
                </li>
                <li>
                  <span className="jadwal-info-dot" />
                  <span>{popupDay.details.location}</span>
                </li>
                <li>
                  <span className="jadwal-info-dot" />
                  <span>{popupDay.details.time}</span>
                </li>
              </ul>

              <section className="jadwal-dresscode" aria-label="Dresscode">
                <h3>Dresscode</h3>
                <p>{popupDay.details.dresscode}</p>
                <div className="jadwal-dresscode-grid">
                  {/* Path gambar Do/Don't disimpan di JSON, tetapi diubah lewat form upload admin. */}
                  <div className="jadwal-dresscode-column">
                    <h4>Do</h4>
                    {popupDay.details.dresscodeDoImage ? (
                      <img
                        src={popupDay.details.dresscodeDoImage}
                        alt={`Do dresscode ${popupDay.day}`}
                        className="jadwal-dresscode-image"
                      />
                    ) : (
                      <div className="jadwal-dresscode-placeholder">
                        Tambahkan gambar Do lewat admin.
                      </div>
                    )}
                  </div>

                  <div className="jadwal-dresscode-column">
                    <h4>Don&apos;t</h4>
                    {popupDay.details.dresscodeDontImage ? (
                      <img
                        src={popupDay.details.dresscodeDontImage}
                        alt={`Don't dresscode ${popupDay.day}`}
                        className="jadwal-dresscode-image"
                      />
                    ) : (
                      <div className="jadwal-dresscode-placeholder">
                        Tambahkan gambar Don&apos;t lewat admin.
                      </div>
                    )}
                  </div>
                </div>
              </section>

              <section className="jadwal-rundown-section" aria-label="Rundown">
                <h3>Rundown</h3>
                <ol className="jadwal-list">
                  {(popupDay.items ?? []).map((item) => (
                    <li key={`${popupDay.day}-${item.time}-${item.activity}`}>
                      <time>{item.time}</time>
                      <span>{item.activity}</span>
                    </li>
                  ))}
                </ol>
              </section>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
