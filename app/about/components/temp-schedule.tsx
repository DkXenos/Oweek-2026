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
        <span className="schedule-nav-icon">‹</span>
      </button>

      <div className="schedule-card">
        <h2 className="schedule-day">DAY {day.day}</h2>
        <h3 className="schedule-title">{day.title}</h3>

        <div className="schedule-detail-list">
          <div className="schedule-detail-row">
            <span className="schedule-dot" />
            <span className="schedule-detail-text">{day.date}</span>
          </div>
          <div className="schedule-detail-row">
            <span className="schedule-dot" />
            <span className="schedule-detail-text">{day.location}</span>
          </div>
          <div className="schedule-detail-row">
            <span className="schedule-dot" />
            <span className="schedule-detail-text">{day.time}</span>
          </div>
        </div>
      </div>

      <button
        className="schedule-nav schedule-next"
        onClick={goNext}
        aria-label="Next day"
      >
        <span className="schedule-nav-icon">›</span>
      </button>
    </div>
  );
}
