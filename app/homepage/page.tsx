"use client";

import { useState, useEffect } from "react";
import GlassSurface from "@/components/GlassSurface";
import LightRays from "../../components/LightRays";

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

  return (
    <div className="relative min-h-screen bg-gray-400 text-gray-200 flex flex-col items-center justify-center p-4 overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={1}
          lightSpread={0.5}
          rayLength={3}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0}
          distortion={0}
          className="custom-rays"
          pulsating={false}
          fadeDistance={1}
          saturation={1}
        />
      </div>
      
      <div className="relative z-10 flex flex-col items-center w-full">
        <h1 className="text-5xl md:text-7xl font-bold font-inter mb-8 tracking-widest text-gray-100">
          OWEEK 2026
        </h1>

        <div className="flex gap-4 md:gap-8 justify-center font-bold font-inter">
        {mounted && [
          { label: "HARI", value: String(timeLeft.days).padStart(2, "0") },
          { label: "JAM", value: String(timeLeft.hours).padStart(2, "0") },
          { label: "MENIT", value: String(timeLeft.minutes).padStart(2, "0") },
          { label: "DETIK", value: String(timeLeft.seconds).padStart(2, "0") },
        ].map((item, index) => (
          <div key={index} className="flex flex-col items-center gap-4">
            <GlassSurface
              width={190}
              height={240}
              borderRadius={30}
              className="flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]"
            >
              <span className="text-6xl md:text-8xl font-bold text-gray-200 drop-shadow-md">
                {item.value}
              </span>
            </GlassSurface>

            <div className="px-8 py-2 md:px-12 md:py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg mt-2">
              <span className="text-xl md:text-2xl font-bold text-gray-300 tracking-wider">
                {item.label}
              </span>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}
