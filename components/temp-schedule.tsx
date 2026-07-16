"use client";

import { useState } from "react";
import { scheduleDays } from "./data-template";
import "./temp-schedule.css";

export default function TempSchedule() {
  const [index, setIndex] = useState(0);
  const total = scheduleDays.length;
  const day = scheduleDays[index];

  const goPrev = () => setIndex((i) => (i - 1 + total) % total);
  const goNext = () => setIndex((i) => (i + 1) % total);

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
              <h2 className="schedule-day">{day.judul}</h2>
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
    </div>
  );
}
