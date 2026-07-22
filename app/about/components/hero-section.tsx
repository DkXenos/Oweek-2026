"use client";

import { motion, useReducedMotion } from "motion/react";
import { fadeScale, fadeUp, slideX } from "./anim";
import "./hero-section.css";

export default function HeroSection() {
  const reduced = useReducedMotion();
  // reduced-motion users get the resting frame with no travel
  const init = reduced ? false : "hidden";

  return (
    <section className="about-hero-container">
      <motion.img
        src="/assets/about/fireworks.png"
        alt=""
        className="hero-fireworks"
        decoding="async"
        variants={fadeScale(0.1)}
        initial={init}
        animate="show"
      />

      {/* pillars arrive from the edges they're pinned to */}
      <motion.img
        src="/assets/about/pillar-left-top.png"
        alt=""
        className="hero-pillar-left"
        decoding="async"
        variants={slideX(0.15, -70)}
        initial={init}
        animate="show"
      />
      <motion.img
        src="/assets/about/pillar-right-top.png"
        alt=""
        className="hero-pillar-right"
        decoding="async"
        variants={slideX(0.15, 70)}
        initial={init}
        animate="show"
      />

      {/* in-flow content; flex centers the tentang frame in the section */}
      <div className="hero-content">
        <motion.img
          src="/assets/about/tentang-desc-hd.png"
          alt="Tentang Orientation Week"
          className="tentang-desc"
          decoding="async"
          fetchPriority="high"
          variants={fadeUp(0.4, 48)}
          initial={init}
          animate="show"
        />
      </div>
    </section>
  );
}
