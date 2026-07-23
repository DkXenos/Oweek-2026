"use client";

import { useState } from "react";
import type { ScheduleDay } from "./data-template";
import "./temp-schedule.css";

type TempScheduleProps = {
  days: ScheduleDay[];
};

export default function TempSchedule({ days }: TempScheduleProps) {
  const [index, setIndex] = useState(0);
  const [showDresscode, setShowDresscode] = useState(false);
  const total = days.length;

  if (total === 0) return null;

  const safeIndex = index % total;
  const day = days[safeIndex];

  const goPrev = () => {
    setShowDresscode(false);
    setIndex((i) => (i - 1 + total) % total);
  };
  const goNext = () => {
    setShowDresscode(false);
    setIndex((i) => (i + 1) % total);
  };

  const hasDresscode = Boolean(day.dresscodeDoImage || day.dresscodeDontImage);

  return (
    <div className="schedule-container">
      {/* left/right nav buttons flank the card at the screen edges (flex space-between) */}
      <button
        className="schedule-nav schedule-prev"
        onClick={goPrev}
        aria-label="Previous day"
      >
        <span className="schedule-nav-face">
          <svg
            className="schedule-nav-icon"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M15 4.5l-7.5 7.5 7.5 7.5"
              stroke="#A767D1"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      <div className="schedule-card">
        <div className="schedule-card-gap">
          <div className="schedule-card-inner">
            {/* every day is rendered stacked in one grid cell so the card keeps
                the height of the tallest day — switching days never resizes it */}
            <div className="schedule-slides">
              {days.map((d, i) => (
                <div
                  key={d.index}
                  className={`schedule-slide${i === safeIndex ? " is-active" : ""}`}
                  aria-hidden={i !== safeIndex}
                >
                  <div className="schedule-heading">
                    <h2 className="schedule-day text-center">{d.judul}</h2>
                    {/* <p className="schedule-subtitle">-</p> */}
                  </div>

                  {d.title && d.title.trim() !== "" && (
                    <h3 className="schedule-title">{d.title}</h3>
                  )}

                  <div className="schedule-detail-list">
                    <div className="schedule-detail-row">
                      <span className="schedule-dot" />
                      <span className="schedule-detail-text">{d.date}</span>
                    </div>
                    <div className="schedule-detail-row">
                      <span className="schedule-dot" />
                      <span className="schedule-detail-text">{d.location}</span>
                    </div>
                    {Array.isArray(d.time) ? (
                      d.time.map((t, idx) => (
                        <div key={idx} className="schedule-detail-row">
                          <span className="schedule-dot" />
                          <span className="schedule-detail-text">{t}</span>
                        </div>
                      ))
                    ) : (
                      <div className="schedule-detail-row">
                        <span className="schedule-dot" />
                        <span className="schedule-detail-text">{d.time}</span>
                      </div>
                    )}
                  </div>

                  {Boolean(d.dresscodeDoImage || d.dresscodeDontImage) && (
                    <button
                      type="button"
                      className="schedule-dresscode-button"
                      onClick={() => setShowDresscode(true)}
                      tabIndex={i === safeIndex ? 0 : -1}
                    >
                      Lihat Dresscode
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <button
        className="schedule-nav schedule-next"
        onClick={goNext}
        aria-label="Next day"
      >
        <span className="schedule-nav-face">
          <svg
            className="schedule-nav-icon"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M9 4.5l7.5 7.5-7.5 7.5"
              stroke="#A767D1"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      {hasDresscode && showDresscode && (
        <div
          className="schedule-dresscode-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={`Dresscode ${day.judul}`}
          onClick={() => setShowDresscode(false)}
        >
          <div
            className="schedule-dresscode-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="schedule-dresscode-close"
              onClick={() => setShowDresscode(false)}
              aria-label="Tutup"
            >
              ×
            </button>
            <h3 className="schedule-dresscode-title">Dresscode {day.judul}</h3>
            <div className="schedule-dresscode-grid">
              {day.dresscodeDoImage ? (
                <figure className="schedule-dresscode-figure">
                  <img
                    src={day.dresscodeDoImage}
                    alt={`Dresscode Do ${day.judul}`}
                    className="schedule-dresscode-image"
                  />
                  <figcaption className="schedule-dresscode-caption schedule-dresscode-do">
                    DO
                  </figcaption>
                </figure>
              ) : null}
              {day.dresscodeDontImage ? (
                <figure className="schedule-dresscode-figure">
                  <img
                    src={day.dresscodeDontImage}
                    alt={`Dresscode Don't ${day.judul}`}
                    className="schedule-dresscode-image"
                  />
                  <figcaption className="schedule-dresscode-caption schedule-dresscode-dont">
                    DON&apos;T
                  </figcaption>
                </figure>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
