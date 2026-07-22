"use client";

import { useState, useEffect, useRef } from "react";
import useMedia from "react-use/lib/useMedia";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type MotionProps,
  type TargetAndTransition,
  type Transition,
} from "motion/react";
import "./styles.css";

const COUNTDOWN_UNITS = ["DAYS", "HOURS", "MINUTES", "SECONDS"] as const;

// how long the entrance choreography runs; idle loops take over after this
const INTRO_MS = 1800;

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

// countdown cards resolve one after another, left to right
const rowVariants = {
  hidden: {},
  show: { transition: { delayChildren: 0.7, staggerChildren: 0.12 } },
};

// within a card: the frame flips first, then the label follows close behind
const unitVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.22 } },
};

const frameVariants = {
  hidden: { opacity: 0, rotateY: -100, y: 24 },
  show: {
    opacity: 1,
    rotateY: 0,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

// slides down out from beneath the frame; the slot clips its travel
const labelVariants = {
  hidden: { opacity: 0, y: "-220%" },
  show: {
    opacity: 1,
    y: "0%",
    transition: { duration: 0.42, ease: EASE_OUT },
  },
};

/**
 * Meteors. `len` is in vmax and the travel below is a multiple of each
 * streak's own width, so the whole shower scales with the viewport without
 * any breakpoint work. `gap` is the pause between passes — varied and long
 * enough that they read as occasional, not as rain.
 */
const METEORS = [
  { top: -6, left: 4, len: 16, angle: 29, dur: 1.7, delay: 0.4, gap: 7.5 },
  { top: 8, left: -12, len: 21, angle: 32, dur: 2.1, delay: 3.2, gap: 11 },
  { top: -10, left: 38, len: 14, angle: 27, dur: 1.5, delay: 6.1, gap: 9 },
  { top: 22, left: 12, len: 18, angle: 34, dur: 1.9, delay: 9.4, gap: 13 },
  { top: -4, left: 62, len: 22, angle: 30, dur: 2.2, delay: 4.8, gap: 15 },
  { top: 15, left: 48, len: 13, angle: 28, dur: 1.4, delay: 12.6, gap: 10.5 },
  { top: 30, left: -8, len: 17, angle: 33, dur: 1.8, delay: 15.3, gap: 12 },
];

// asset-free drifting light motes; fixed values so SSR and client match
const MOTES = [
  { left: 6, bottom: 12, size: 7, rise: 190, drift: 26, dur: 13, delay: 0, peak: 0.55 },
  { left: 14, bottom: 4, size: 4, rise: 240, drift: -18, dur: 17, delay: 2.4, peak: 0.4 },
  { left: 22, bottom: 26, size: 9, rise: 160, drift: 32, dur: 11, delay: 5.1, peak: 0.5 },
  { left: 31, bottom: 8, size: 5, rise: 210, drift: -24, dur: 15, delay: 1.2, peak: 0.45 },
  { left: 39, bottom: 20, size: 6, rise: 175, drift: 20, dur: 12.5, delay: 6.8, peak: 0.6 },
  { left: 47, bottom: 2, size: 8, rise: 260, drift: -30, dur: 18, delay: 3.6, peak: 0.35 },
  { left: 55, bottom: 16, size: 4, rise: 200, drift: 22, dur: 14, delay: 8.2, peak: 0.5 },
  { left: 63, bottom: 30, size: 7, rise: 150, drift: -16, dur: 10.5, delay: 4.4, peak: 0.55 },
  { left: 71, bottom: 6, size: 5, rise: 230, drift: 28, dur: 16, delay: 0.8, peak: 0.4 },
  { left: 79, bottom: 22, size: 9, rise: 170, drift: -26, dur: 12, delay: 7.5, peak: 0.5 },
  { left: 87, bottom: 10, size: 6, rise: 220, drift: 18, dur: 15.5, delay: 2.9, peak: 0.45 },
  { left: 94, bottom: 28, size: 4, rise: 185, drift: -20, dur: 13.5, delay: 5.7, peak: 0.55 },
];

export default function Home() {
  const [introDone, setIntroDone] = useState(false);
  const [inView, setInView] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  // thin out the particle layers on phones/tablets, where fill rate is scarcest
  const lite = useMedia("(max-width: 900px)", false);
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
    const tick = () => {
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
        return true;
      }
      return false;
    };

    // run once immediately so the cards don't sit on 00 for a whole second
    tick();
    const interval = setInterval(() => {
      if (!tick()) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  // hand off from the entrance animation to the idle loops
  useEffect(() => {
    if (reduced) return;
    const t = setTimeout(() => setIntroDone(true), INTRO_MS);
    return () => clearTimeout(t);
  }, [reduced]);

  // stop every loop once the hero scrolls away — otherwise ~35 animations keep
  // burning frames and battery for the whole rest of the page
  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "150px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const idle = introDone && inView && !reduced;
  const meteors = lite ? METEORS.slice(0, 4) : METEORS;
  const motes = lite ? MOTES.filter((_, i) => i % 2 === 0) : MOTES;

  /**
   * Builds the motion props for an asset: an entrance tween that, once the
   * intro is over, hands off to an optional looping idle animation.
   * Reduced-motion users skip straight to the resting frame.
   */
  const anim = (
    from: TargetAndTransition,
    rest: TargetAndTransition,
    introT: Transition,
    loop?: TargetAndTransition,
    loopT?: Transition,
  ): MotionProps => {
    if (reduced) return { initial: false, animate: rest };
    return {
      initial: from,
      animate: idle && loop ? { ...rest, ...loop } : rest,
      transition: idle && loop ? loopT : introT,
    };
  };

  const values = [timeLeft.days, timeLeft.hours, timeLeft.minutes, timeLeft.seconds];

  return (
    <div className="homepage-container" ref={rootRef}>
      <motion.div
        className="gradient-bg"
        {...anim({ opacity: 0 }, { opacity: 1 }, { duration: 0.9 })}
      />

      {/* meteor shower across the upper sky, behind the castle and pillars */}
      {idle && (
        <div className="meteor-layer" aria-hidden>
          {meteors.map((m, i) => (
            <div
              key={i}
              className="meteor"
              style={{
                top: `${m.top}%`,
                left: `${m.left}%`,
                transform: `rotate(${m.angle}deg)`,
              }}
            >
              <motion.div
                className="meteor-streak"
                style={{ width: `${m.len}vmax` }}
                initial={{ x: "-100%", opacity: 0 }}
                animate={{
                  x: ["-100%", "380%"],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: m.dur,
                  delay: m.delay,
                  repeat: Infinity,
                  repeatDelay: m.gap,
                  ease: "easeIn",
                  opacity: {
                    duration: m.dur,
                    delay: m.delay,
                    repeat: Infinity,
                    repeatDelay: m.gap,
                    times: [0, 0.12, 0.7, 1],
                    ease: "linear",
                  },
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* slow-rising light motes; start only once the entrance has settled */}
      {idle && (
        <div className="motes-layer" aria-hidden>
          {motes.map((m, i) => (
            <motion.span
              key={i}
              className="mote"
              style={{
                left: `${m.left}%`,
                bottom: `${m.bottom}%`,
                width: m.size,
                height: m.size,
              }}
              initial={{ opacity: 0, y: 0, x: 0 }}
              animate={{
                opacity: [0, m.peak, m.peak, 0],
                y: [0, -m.rise],
                x: [0, m.drift, 0],
              }}
              transition={{
                duration: m.dur,
                delay: m.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      <motion.img
        src="/assets/homepage/clouds-background.png"
        alt=""
        className="clouds-bg"
        decoding="async"
        fetchPriority="high"
        {...anim(
          { opacity: 0, scale: 1.06 },
          { opacity: 1, scale: 1 },
          { duration: 1.2, ease: EASE_OUT },
        )}
      />

      <motion.img
        src="/assets/homepage/firework-top.png"
        alt=""
        className="firework-top"
        loading="lazy"
        decoding="async"
        {...anim(
          { opacity: 0, scale: 0.94 },
          { opacity: 1, scale: 1 },
          { duration: 0.9, delay: 0.35, ease: EASE_OUT },
          { scale: [1, 1.02, 1] },
          { scale: { duration: 7, repeat: Infinity, ease: "easeInOut" } },
        )}
      />

      {/* centered decorative circle; flex layer centers it, sits behind the castle */}
      <div className="circle-layer">
        <motion.img
          src="/assets/homepage/circle-background.png"
          alt=""
          className="circle-bg"
          loading="lazy"
          decoding="async"
          {...anim(
            { opacity: 0, scale: 0.7, rotate: -25 },
            { opacity: 1, scale: 1, rotate: 0 },
            { duration: 1.1, ease: EASE_OUT },
            { rotate: 360, y: [0, -14, 0] },
            {
              rotate: { duration: 90, repeat: Infinity, ease: "linear" },
              y: { duration: 7, repeat: Infinity, ease: "easeInOut" },
            },
          )}
        />
      </div>

      <div className="pillar-container">
        <motion.img
          src="/assets/homepage/border-left.png"
          alt=""
          className="border-l"
          loading="lazy"
          decoding="async"
          {...anim(
            { opacity: 0, x: -70 },
            { opacity: 1, x: 0 },
            { duration: 1, delay: 0.15, ease: EASE_OUT },
          )}
        />
        <motion.img
          src="/assets/homepage/border-right.png"
          alt=""
          className="border-r"
          loading="lazy"
          decoding="async"
          {...anim(
            { opacity: 0, x: 70 },
            { opacity: 1, x: 0 },
            { duration: 1, delay: 0.15, ease: EASE_OUT },
          )}
        />
      </div>

      {/* hero fills the space above the footer; castle + mascots anchor to ITS
          bottom edge, which is the footer's top edge */}
      <div className="hero">
        <div className="mascot-layer">
          <div className="mascot-col-left">
            <motion.img
              src="/assets/homepage/ccclt.png"
              alt=""
              className="mascot-lefttop"
              loading="lazy"
              decoding="async"
              {...anim(
                { opacity: 0, y: 40, scale: 0.85 },
                { opacity: 1, y: 0, scale: 1 },
                { duration: 0.7, delay: 0.7, ease: EASE_OUT },
                { y: [0, -10, 0], rotate: [0, -2, 0, 2, 0] },
                {
                  y: { duration: 3.6, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" },
                },
              )}
            />
            <motion.img
              src="/assets/homepage/yuccanew.png"
              alt=""
              className="mascot-leftbottom"
              loading="lazy"
              decoding="async"
              {...anim(
                { opacity: 0, y: 40, scale: 0.85 },
                { opacity: 1, y: 0, scale: 1 },
                { duration: 0.7, delay: 0.85, ease: EASE_OUT },
                { y: [0, -13, 0], rotate: [0, 2, 0, -2, 0] },
                {
                  y: { duration: 4.4, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 9, repeat: Infinity, ease: "easeInOut" },
                },
              )}
            />
          </div>
          <div className="mascot-col-right">
            <motion.img
              src="/assets/homepage/cccrt.png"
              alt=""
              className="mascot-righttop"
              loading="lazy"
              decoding="async"
              {...anim(
                { opacity: 0, y: 40, scale: 0.85 },
                { opacity: 1, y: 0, scale: 1 },
                { duration: 0.7, delay: 0.78, ease: EASE_OUT },
                { y: [0, -11, 0], rotate: [0, 2.5, 0, -2.5, 0] },
                {
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 7.5, repeat: Infinity, ease: "easeInOut" },
                },
              )}
            />
            <motion.img
              src="/assets/homepage/cccrb.png"
              alt=""
              className="mascot-rightbottom"
              loading="lazy"
              decoding="async"
              {...anim(
                { opacity: 0, y: 40, scale: 0.85 },
                { opacity: 1, y: 0, scale: 1 },
                { duration: 0.7, delay: 0.93, ease: EASE_OUT },
                { y: [0, -9, 0], rotate: [0, -2, 0, 2, 0] },
                {
                  y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 10, repeat: Infinity, ease: "easeInOut" },
                },
              )}
            />
          </div>
        </div>

        <div className="castle-layer">
          <motion.img
            src="/assets/homepage/home-castle-center.png"
            alt=""
            className="castle-center"
            decoding="async"
            fetchPriority="high"
            {...anim(
              { opacity: 0, y: 60 },
              { opacity: 1, y: 0 },
              { duration: 1, delay: 0.25, ease: EASE_OUT },
            )}
          />
        </div>

        {/* the two in-flow assets share an 80%-tall centered block, 50% each,
            so they fill it evenly with no gap in the middle */}
        <div className="hero-content">
          <div className="title-slot">
            <div className="title-shine-wrap">
              <motion.img
                src="/assets/homepage/magnify-title.png"
                alt="Welcome to Magnify"
                className="magnify-title"
                decoding="async"
                fetchPriority="high"
                {...anim(
                  { opacity: 0, y: -34, scale: 0.82 },
                  { opacity: 1, y: 0, scale: 1 },
                  { duration: 0.9, delay: 0.5, ease: EASE_OUT },
                  { scale: [1, 1.018, 1] },
                  {
                    scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                  },
                )}
              />
              {idle && (
                <div className="shine shine-title" aria-hidden>
                  <motion.div
                    className="shine-bar"
                    initial={{ x: "-150%" }}
                    animate={{ x: "400%" }}
                    transition={{
                      duration: 1.5,
                      delay: 2.4,
                      repeat: Infinity,
                      repeatDelay: 9,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="countdown-container">
            <motion.div
              className="countdown-row"
              variants={rowVariants}
              initial={reduced ? false : "hidden"}
              animate="show"
            >
              {COUNTDOWN_UNITS.map((label, i) => {
                const display = String(values[i]).padStart(2, "0");

                return (
                  <motion.div
                    className="countdown-unit"
                    key={label}
                    variants={unitVariants}
                  >
                    <motion.div
                      className="countdown-frame"
                      variants={frameVariants}
                    >
                      <img
                        src="/assets/homepage/countdown-border.png"
                        alt=""
                        decoding="async"
                        className="countdown-frame-img"
                      />
                      {/* sheen travels across the cards left to right, echoing
                          the order they flipped in */}
                      {idle && (
                        <div className="shine shine-frame" aria-hidden>
                          <motion.div
                            className="shine-bar"
                            initial={{ x: "-150%" }}
                            animate={{ x: "400%" }}
                            transition={{
                              duration: 1.1,
                              delay: 1.2 + i * 0.18,
                              repeat: Infinity,
                              repeatDelay: 6.5,
                              ease: "easeInOut",
                            }}
                          />
                        </div>
                      )}
                      {/* each new value flips in as the old one flips away */}
                      <AnimatePresence initial={false}>
                        <motion.span
                          key={display}
                          className="countdown-value"
                          initial={reduced ? false : { rotateX: -90, opacity: 0 }}
                          animate={{ rotateX: 0, opacity: 1 }}
                          exit={
                            reduced
                              ? { opacity: 0 }
                              : { rotateX: 90, opacity: 0 }
                          }
                          transition={{ duration: 0.4, ease: EASE_OUT }}
                        >
                          {display}
                        </motion.span>
                      </AnimatePresence>
                    </motion.div>
                    <div className="countdown-label-slot">
                      <motion.div
                        className="countdown-label"
                        variants={labelVariants}
                      >
                        <span className="countdown-label-text">{label}</span>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
