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

      {/* card: thick gold frame → cream gap → thin gold line → content */}
      <div className="schedule-card">
        <div className="schedule-card-gap">
          <div className="schedule-card-inner">
            <div className="schedule-heading">
              <h2 className="schedule-day text-center">{day.judul}</h2>
              {/* <p className="schedule-subtitle">-</p> */}
            </div>

            {day.title && day.title.trim() !== "" && (
              <h3 className="schedule-title">{day.title}</h3>
            )}

            <div className="schedule-detail-list">
              <div className="schedule-detail-row">
                <span className="schedule-dot" />
                <span className="schedule-detail-text">{day.date}</span>
              </div>
              <div className="schedule-detail-row">
                <span className="schedule-dot" />
                <span className="schedule-detail-text">{day.location}</span>
              </div>
              {Array.isArray(day.time) ? (
                day.time.map((t, idx) => (
                  <div key={idx} className="schedule-detail-row">
                    <span className="schedule-dot" />
                    <span className="schedule-detail-text">{t}</span>
                  </div>
                ))
              ) : (
                <div className="schedule-detail-row">
                  <span className="schedule-dot" />
                  <span className="schedule-detail-text">{day.time}</span>
                </div>
              )}
            </div>

            {hasDresscode && (
              <button
                type="button"
                className="schedule-dresscode-button"
                onClick={() => setShowDresscode(true)}
              >
                Lihat Dresscode
              </button>
            )}
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
