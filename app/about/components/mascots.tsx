"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
} from "motion/react";
import { dropIn, fadeUp, popIn, slideX, spinIn } from "./anim";
import "./mascots.css";

// How long the reveal choreography runs before the idle loops take over.
// Must outlast the slowest entrance — the ring, at 0.4s delay + 1.6s spin —
// otherwise the handoff interrupts its deceleration partway through.
const REVEAL_MS = 2100;

export default function Mascots() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [settled, setSettled] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  // `revealed` latches on once, so the scene assembles a single time.
  // `onScreen` keeps tracking, so the idle loops stop when you scroll away.
  const revealed = useInView(sectionRef, { once: true, amount: 0.2 });
  const onScreen = useInView(sectionRef);

  useEffect(() => {
    if (!revealed || reduced) return;
    const t = setTimeout(() => setSettled(true), REVEAL_MS);
    return () => clearTimeout(t);
  }, [revealed, reduced]);

  // resolved during render: null on the server, document.body on the client.
  // safe for hydration because a closed popup renders nothing either way, so
  // the server and client markup match.
  const portalTarget = typeof document !== "undefined" ? document.body : null;

  const init = reduced ? false : "hidden";
  const state = revealed ? "show" : "hidden";
  const idle = settled && onScreen && !reduced;

  return (
    <section className="mascots-container" ref={sectionRef}>
      {/* bushes straddle the hero/mascots boundary (crossover layer) */}
      <div className="bush-layer">
        <motion.img
          src="/assets/about/bush-left.png"
          alt=""
          className="bush-left"
          loading="lazy"
          decoding="async"
          variants={fadeUp(0.15, 50)}
          initial={init}
          animate={state}
        />
        <motion.img
          src="/assets/about/bush-right.png"
          alt=""
          className="bush-right"
          loading="lazy"
          decoding="async"
          variants={fadeUp(0.25, 50)}
          initial={init}
          animate={state}
        />
      </div>

      {/* mobile-only pots anchored to the bottom corners of the section */}
      <div className="pot-layer">
        <motion.img
          src="/assets/about-mobile/pot-l.png"
          alt=""
          className="pot-left"
          loading="lazy"
          decoding="async"
          variants={fadeUp(0.3, 40)}
          initial={init}
          animate={state}
        />
        <motion.img
          src="/assets/about-mobile/pot-r.png"
          alt=""
          className="pot-right"
          loading="lazy"
          decoding="async"
          variants={fadeUp(0.38, 40)}
          initial={init}
          animate={state}
        />
      </div>

      {/* balloons hang from the top corners, just inside the pillars.
          they drop in, then sway from their tether like real balloons */}
      <div className="baloon-layer">
        <motion.img
          src="/assets/about/baloon-left.png"
          alt=""
          className="baloon-left"
          loading="lazy"
          decoding="async"
          variants={dropIn(0.45)}
          initial={init}
          animate={
            idle
              ? { opacity: 1, y: 0, rotate: [0, 2.4, 0, -2.4, 0] }
              : state
          }
          transition={
            idle
              ? { rotate: { duration: 7, repeat: Infinity, ease: "easeInOut" } }
              : undefined
          }
        />
        <motion.img
          src="/assets/about/baloon-right.png"
          alt=""
          className="baloon-right"
          loading="lazy"
          decoding="async"
          variants={dropIn(0.6)}
          initial={init}
          animate={
            idle
              ? { opacity: 1, y: 0, rotate: [0, -2.8, 0, 2.8, 0] }
              : state
          }
          transition={
            idle
              ? { rotate: { duration: 8.5, repeat: Infinity, ease: "easeInOut" } }
              : undefined
          }
        />
      </div>

      <motion.img
        src="/assets/about/pillar-left-bottom.png"
        alt=""
        className="mascots-pillar-left"
        loading="lazy"
        decoding="async"
        variants={slideX(0.1, -60)}
        initial={init}
        animate={state}
      />
      <motion.img
        src="/assets/about/pillar-right-bottom.png"
        alt=""
        className="mascots-pillar-right"
        loading="lazy"
        decoding="async"
        variants={slideX(0.1, 60)}
        initial={init}
        animate={state}
      />

      <div className="fireworks-bottom-layer">
        <motion.img
          src="/assets/about/fireworks-bottom.png"
          alt=""
          className="fireworks-bottom"
          loading="lazy"
          decoding="async"
          variants={fadeUp(0.55, 36)}
          initial={init}
          animate={state}
        />
      </div>

      <motion.img
        src="/assets/about/mascots-title.png"
        alt="The University's Mascots"
        className="mascots-title"
        loading="lazy"
        decoding="async"
        variants={fadeUp(0.2, 44)}
        initial={init}
        animate={state}
      />

      <div className="mascots-content">
        <div className="mascot-wrapper">
          <div className="mascot-ring-layer">
            {/* ring unwinds into place, then turns slowly forever */}
            <motion.img
              src="/assets/about/mascot-ring.png"
              alt=""
              className="mascot-ring"
              loading="lazy"
              decoding="async"
              variants={spinIn(0.4)}
              initial={init}
              animate={
                idle
                  ? { opacity: 1, rotate: 360, scale: [1, 1.025, 1] }
                  : state
              }
              transition={
                idle
                  ? {
                      rotate: {
                        duration: 100,
                        repeat: Infinity,
                        ease: "linear",
                      },
                      scale: {
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }
                  : undefined
              }
            />
          </div>
          <motion.img
            src="/assets/about/mascots-cropped.png"
            alt="The university's mascots"
            className="mascots-img"
            loading="lazy"
            decoding="async"
            onClick={() => setPopupOpen(true)}
            variants={popIn(0.65)}
            initial={init}
            animate={state}
            // interaction states cost nothing at rest — they only run on input
            whileHover={reduced ? undefined : { scale: 1.04 }}
            whileTap={reduced ? undefined : { scale: 0.97 }}
          />
        </div>
      </div>

      {/* the portal must wrap AnimatePresence, not the other way round:
          AnimatePresence filters its children with isValidElement(), which
          returns false for a portal, so a portal placed inside it vanishes */}
      {portalTarget &&
        createPortal(
          <AnimatePresence>
            {popupOpen && (
              <motion.div
                key="mascot-popup"
                className="mascot-popup-overlay"
                onClick={() => setPopupOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <motion.div
                  className="mascot-popup-content"
                  onClick={(e) => e.stopPropagation()}
                  initial={{ opacity: 0, scale: 0.9, y: 28 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 14 }}
                  transition={{ type: "spring", stiffness: 260, damping: 24 }}
                >
                  {/* desktop assets swap to the about-mobile pair on phones (CSS) */}
                  <img
                    src="/assets/about/yucca.png"
                    alt="Yucca"
                    className="popup-yucca"
                    decoding="async"
                  />
                  <img
                    src="/assets/about/ccc.png"
                    alt="Chap, Chip & Chup"
                    className="popup-ccc"
                    decoding="async"
                  />
  
                  <button
                    className="mascot-popup-close"
                    onClick={() => setPopupOpen(false)}
                    aria-label="Close"
                  >
                    ✕
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          portalTarget,
        )}
    </section>
  );
}
