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

  return (
    <div
      className="relative min-h-screen text-gray-200 flex flex-col items-center justify-start p-4 overflow-x-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/assets/template/bg-orange.webp')" }}
    >
      <img
        src="/assets/template/border-br.webp"
        alt="bl"
        className="absolute bottom-0 right-0 w-[20%] h-auto"
      />
      <img
        src="/assets/template/border-tl.webp"
        alt="br"
        className="absolute top-0 left-0 h-[38%] w-auto"
      />
      <img
        src="/assets/template/logos.webp"
        alt="br"
        className="absolute top-0 h-[10%] w-auto z-20"
      />
      <div className="fixed inset-0 z-10 pointer-events-none">
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

      <div className="relative z-10 flex flex-col items-center justify-center w-full h-screen pt-[12rem] pb-[6rem]">
        <img
          src="/assets/template/coming-soon.webp"
          alt="OWEEK 2026"
          className="mb-2q w-[100%] max-w-2xl h-auto"
        />
        <img
          src="/assets/template/oweek-title.webp"
          alt="OWEEK 2026"
          className="mb-0 w-[100%] max-w-5xl h-auto"
        />
        <div className="relative p-8 md:p-16 flex justify-center w-screen">
          <div className="bg-[#ff7100] w-screen h-auto absolute"></div>
          <div
            className="absolute inset-0 z-0 bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/assets/template/inner-square.webp')",
            }}
          ></div>
          <div className="relative z-10 grid grid-cols-2 md:flex gap-4 md:gap-8 justify-center font-bold font-inter w-full max-w-[20rem] md:max-w-none">
            {mounted &&
              [
                {
                  label: "HARI",
                  value: String(timeLeft.days).padStart(2, "0"),
                },
                {
                  label: "JAM",
                  value: String(timeLeft.hours).padStart(2, "0"),
                },
                {
                  label: "MENIT",
                  value: String(timeLeft.minutes).padStart(2, "0"),
                },
                {
                  label: "DETIK",
                  value: String(timeLeft.seconds).padStart(2, "0"),
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-2 md:gap-4 w-full md:w-[190px]"
                >
                  <GlassSurface
                    width="100%"
                    height="100%"
                    borderRadius={30}
                    className="flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_0_rgba(255,255,255,0.1)] aspect-[3/4] md:h-[240px]"
                  >
                    <span className="text-5xl sm:text-6xl md:text-8xl font-bold text-gray-200 drop-shadow-md">
                      {item.value}
                    </span>
                  </GlassSurface>

                  <div className="px-4 py-2 md:px-12 md:py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg mt-2 w-full text-center">
                    <span className="text-lg md:text-2xl font-bold text-gray-300 tracking-wider">
                      {item.label}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
