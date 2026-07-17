"use client";

import "./styles.css";
import { useState, useRef, useEffect } from "react";
import { rules } from './ruleData'

export function RuleDropdown({
  selected,
  setSelected,
}: {
  selected: (typeof rules)[number];
  setSelected: React.Dispatch<
    React.SetStateAction<(typeof rules)[number]>
  >;
}) {
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button
        className={`dropdown-btn ${open ? "active" : ""}`}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="dropdown-title">{selected.title}</span>

        <img
          src="/assets/rules/dropdown-button.png"
          className={`arrow ${open ? "rotate" : ""}`}
          alt=""
        />
      </button>

      {open && (
        <div className="dropdown-menu">
          <div className="dropdown-scroll">
            {rules.map((item) => (
              <button
                key={item.title}
                className="dropdown-item"
                onClick={() => {
                  setSelected(item);
                  setOpen(false);
                }}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Rules() {
  const [selected, setSelected] = useState(rules[0]);
  return (
    <div className="rules-container">
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

      <div className="carousel">
        <img src="/assets/rules/carousel.png" alt="" />
      </div>

      <div className="rules-title">
        <img src="/assets/rules/rules-title.png" alt="" />
      </div>

      <RuleDropdown
        selected={selected}
        setSelected={setSelected}
      />

      <div className="rules-box">

        <img
          src="/assets/rules/text-box.png"
          alt=""
          className="text-box"
        />

        <div className="text-content">
          {selected.content}
        </div>

      </div>
    </div>
  );
}