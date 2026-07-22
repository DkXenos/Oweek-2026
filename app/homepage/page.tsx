"use client";

import { useState, useEffect } from "react";
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

// countdown cards flip in one after another, left to right
const rowVariants = {
  hidden: {},
  show: { transition: { delayChildren: 0.95, staggerChildren: 0.14 } },
};

const cardVariants = {
  hidden: { opacity: 0, rotateY: -100, y: 24 },
  show: {
    opacity: 1,
    rotateY: 0,
    y: 0,
    transition: { duration: 0.75, ease: EASE_OUT },
  },
};

export default function Home() {
  const [introDone, setIntroDone] = useState(false);
  const reduced = useReducedMotion();
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

  const idle = introDone && !reduced;

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
    <div className="homepage-container">
      <motion.div
        className="gradient-bg"
        {...anim({ opacity: 0 }, { opacity: 1 }, { duration: 0.9 })}
      />

      {/* slow breathing light over the sky */}
      <motion.div
        className="sky-glow"
        {...anim(
          { opacity: 0 },
          { opacity: 0.55 },
          { duration: 1.4, delay: 0.3 },
          { opacity: [0.4, 0.7, 0.4], scale: [1, 1.06, 1] },
          {
            opacity: { duration: 9, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 9, repeat: Infinity, ease: "easeInOut" },
          },
        )}
      />

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
          { scale: [1, 1.03, 1] },
          { scale: { duration: 18, repeat: Infinity, ease: "easeInOut" } },
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
          { opacity: [0.7, 1, 0.85, 1], scale: [1, 1.02, 1] },
          {
            opacity: { duration: 5, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 7, repeat: Infinity, ease: "easeInOut" },
          },
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
                { scale: { duration: 6, repeat: Infinity, ease: "easeInOut" } },
              )}
            />
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
                    variants={cardVariants}
                  >
                    <div className="countdown-frame">
                      <img
                        src="/assets/homepage/countdown-border.png"
                        alt=""
                        decoding="async"
                        className="countdown-frame-img"
                      />
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
                    </div>
                    <div className="countdown-label">
                      <span className="countdown-label-text">{label}</span>
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
