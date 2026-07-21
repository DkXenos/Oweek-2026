"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import "./mascots.css";

export default function Mascots() {
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <section className="mascots-container">
      {/* bushes straddle the hero/mascots boundary (crossover layer) */}
      <div className="bush-layer">
        <img src="/assets/about/bush-left.png" alt="" className="bush-left" />
        <img src="/assets/about/bush-right.png" alt="" className="bush-right" />
      </div>

      {/* mobile-only pots anchored to the bottom corners of the section */}
      <div className="pot-layer">
        <img src="/assets/about-mobile/pot-l.png" alt="" className="pot-left" />
        <img src="/assets/about-mobile/pot-r.png" alt="" className="pot-right" />
      </div>

      {/* balloons hang from the top corners, just inside the pillars */}
      <div className="baloon-layer">
        <img
          src="/assets/about/baloon-left.png"
          alt=""
          className="baloon-left"
        />
        <img
          src="/assets/about/baloon-right.png"
          alt=""
          className="baloon-right"
        />
      </div>

      <img
        src="/assets/about/pillar-left-bottom.png"
        alt=""
        className="mascots-pillar-left"
      />
      <img
        src="/assets/about/pillar-right-bottom.png"
        alt=""
        className="mascots-pillar-right"
      />

      <div className="fireworks-bottom-layer">
        <img
          src="/assets/about/fireworks-bottom.png"
          alt=""
          className="fireworks-bottom"
        />
      </div>

      <img
        src="/assets/about/mascots-title.png"
        alt="The University's Mascots"
        className="mascots-title"
      />

      <div className="mascots-content">
        <div className="mascot-wrapper">
          <div className="mascot-ring-layer">
            <img
              src="/assets/about/mascot-ring.png"
              alt=""
              className="mascot-ring"
            />
          </div>
          <img
            src="/assets/about/mascots-cropped.png"
            alt="The university's mascots"
            className="mascots-img"
            onClick={() => setPopupOpen(true)}
          />
        </div>
      </div>

      {popupOpen &&
        createPortal(
          <div
            className="mascot-popup-overlay"
            onClick={() => setPopupOpen(false)}
          >
            <div
              className="mascot-popup-content"
              onClick={(e) => e.stopPropagation()}
            >
              {/* desktop assets swap to the about-mobile pair on phones (CSS) */}
              <img src="/assets/about/yucca.png" alt="Yucca" className="popup-yucca" />
              <img src="/assets/about/ccc.png" alt="Chap, Chip & Chup" className="popup-ccc" />

              <button
                className="mascot-popup-close"
                onClick={() => setPopupOpen(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
