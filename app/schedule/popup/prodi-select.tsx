"use client";

import "./prodi-select.css";
import { useEffect, useRef, useState } from "react";
import type { MatrikulasiData, MatrikulasiProdi } from "../../../lib/matrikulasi-data";

// Dropdown khusus banner matrikulasi. Banner lain tidak me-render komponen ini.
// Bentuknya mengikuti dropdown di halaman /rules (button pill + menu scroll),
// tapi class-nya diberi prefix "prodi-" supaya tidak bentrok dengan CSS global
// .dropdown milik rules.
export default function ProdiSelect({
  data,
  selectedProdi,
  onSelectProdi,
}: {
  data: MatrikulasiData;
  selectedProdi: MatrikulasiProdi | null;
  onSelectProdi: (prodiId: string) => void;
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
    <div className="prodi-dropdown" ref={dropdownRef}>
      <button
        className={`prodi-dropdown-btn ${open ? "active" : ""}`}
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="prodi-dropdown-title">
          {selectedProdi ? selectedProdi.label : data.placeholder}
        </span>

        <img
          src="/assets/rules/dropdown-button.png"
          className={`prodi-dropdown-arrow ${open ? "rotate" : ""}`}
          alt=""
        />
      </button>

      {open && (
        <div className="prodi-dropdown-menu" role="listbox">
          <div className="prodi-dropdown-scroll">
            {data.prodi.map((prodi) => (
              <button
                key={prodi.id}
                className={`prodi-dropdown-item ${
                  selectedProdi?.id === prodi.id ? "selected" : ""
                }`}
                role="option"
                aria-selected={selectedProdi?.id === prodi.id}
                onClick={() => {
                  onSelectProdi(prodi.id);
                  setOpen(false);
                }}
              >
                {prodi.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
