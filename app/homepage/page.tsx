"use client";

import { useState, useEffect } from "react";
import "./styles.css";

const COUNTDOWN_UNITS = ["DAYS", "HOURS", "MINUTES", "SECONDS"] as const;

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const targetDateStr = "2026-08-17";
  const targetTimeStr = "17:00";
  const targetDate = new Date(`${targetDateStr}T${targetTimeStr}:00`).getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // countdown logic
  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const values = [timeLeft.days, timeLeft.hours, timeLeft.minutes, timeLeft.seconds];

  return (
    <div className="homepage-container">
      <div className="gradient-bg" />
      <img
        src="/assets/homepage/clouds-background.png"
        alt=""
        className="clouds-bg"
      />
      <img
        src="/assets/homepage/firework-top.png"
        alt=""
        className="firework-top"
      />

      {/* centered decorative circle; flex layer centers it, sits behind the castle */}
      <div className="circle-layer">
        <img
          src="/assets/homepage/circle-background.png"
          alt=""
          className="circle-bg"
        />
      </div>

      <div className="pillar-container">
        <img
          src="/assets/homepage/border-left.png"
          alt=""
          className="border-l"
        />
        <img
          src="/assets/homepage/border-right.png"
          alt=""
          className="border-r"
        />
      </div>

      {/* hero fills the space above the footer; castle + mascots anchor to ITS
          bottom edge, which is the footer's top edge */}
      <div className="hero">
        <div className="mascot-layer">
          <div className="mascot-col-left">
            <img
              src="/assets/homepage/ccclt.png"
              alt=""
              className="mascot-lefttop"
            />
            <img
              src="/assets/homepage/yuccanew.png"
              alt=""
              className="mascot-leftbottom"
            />
          </div>
          <div className="mascot-col-right">
            <img
              src="/assets/homepage/cccrt.png"
              alt=""
              className="mascot-righttop"
            />
            <img
              src="/assets/homepage/cccrb.png"
              alt=""
              className="mascot-rightbottom"
            />
          </div>
        </div>

        <div className="castle-layer">
          <img
            src="/assets/homepage/home-castle-center.png"
            alt=""
            className="castle-center"
          />
        </div>
        <div className="w-screen backdrop-blur-sm bg-white/10 flex flex-row items-center justify-center py-6 gap-4 md:gap-8 flex-wrap font-inter mt-4">
          <span className="text-sm md:text-lg font-semibold text-gray-200 tracking-wide">
            Line OA: @829hzswf
          </span>
          <span className="hidden md:inline text-gray-400">|</span>
          <span className="text-sm md:text-lg font-semibold text-gray-200 tracking-wide">
            Instagram: @oweekucs
          </span>
          <span className="hidden md:inline text-gray-400">|</span>
          <span className="text-sm md:text-lg font-semibold text-gray-200 tracking-wide">
            Email: oweek@ciputra.ac.id
          </span>
          
        </div>
      </div>
    </div>
  );
}
