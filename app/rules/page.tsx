"use client";

import "./styles.css";
import { useState, useRef, useEffect } from "react";
import rules from './rulesData'

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
        <p className="filler">p</p>
        <span className="dropdown-title">{selected.pasal} - {selected.category}</span>

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
                key={item.id}
                className="dropdown-item"
                onClick={() => {
                  setSelected(item);
                  setOpen(false);
                }}
              >
                {item.pasal} - {item.category}
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
  const hasChild = selected.description.some(
    (section) => section.details.length > 0 && section.details[0] !== ""
  );
  return (
    <div className="rules-container">
      <div className="gradient-bg" />

      <img
        src="/assets/homepage/clouds-background.webp"
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

      <div className="decor-left">
        <img
          src="/assets/rules/cap.png"
          alt=""
          className="cap"
        />
        <img
          src="/assets/rules/flower-pot.png"
          alt=""
          className="flower-pot"
        />
      </div>

      <div className="decor-right">
        <img
          src="/assets/rules/cip.png"
          alt=""
          className="cip"
        />
        <img
          src="/assets/rules/cup.png"
          alt=""
          className="cup"
        />
      </div>

      <div className="rules-title">
        <img src="/assets/rules/rules-title.png" alt="" />
      </div>

      <RuleDropdown
        selected={selected}
        setSelected={setSelected}
      />

      <div className="rules-box">
        <div className="text-content">
          <ol className="parent-list">
            {selected.description.map((section, index) => {
              const hasHeading = section.heading.trim() !== "";
              const hasDetails =
                section.details.length > 0 && section.details[0] !== "";

              return hasHeading ? (
                <li
                  key={index}
                  className={hasChild ? "parent-bold" : "parent-normal"}
                >
                  <span
                    dangerouslySetInnerHTML={{
                      __html: section.heading,
                    }}
                  />

                  {hasDetails && (
                    <ol className="child-list" type="a">
                      {section.details.map((detail, i) => (
                        <li
                          key={i}
                          dangerouslySetInnerHTML={{
                            __html: detail,
                          }}
                        />
                      ))}
                    </ol>
                  )}

                  {section.notes && (
                    <p
                      className="rule-note"
                      dangerouslySetInnerHTML={{
                        __html: section.notes,
                      }}
                    />
                  )}
                </li>
              ) : (
                section.details.map((detail, i) => (
                  <li
                    key={`${index}-${i}`}
                    className={hasChild ? "parent-bold" : "parent-normal"}
                  >
                    <span
                      dangerouslySetInnerHTML={{
                        __html: detail,
                      }}
                    />

                    {section.notes && i === section.details.length - 1 && (
                      <p
                        className="rule-note"
                        dangerouslySetInnerHTML={{
                          __html: section.notes,
                        }}
                      />
                    )}
                  </li>
                ))
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}