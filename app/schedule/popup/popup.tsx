"use client";

import { useEffect, useState } from "react";
import ScheduleButton from "./popup-button";
import Keterangan from "./keterangan";
import Penugasan from "./penugasan";
import Ketentuan from "./ketentuan";
import type { ScheduleData } from "../../../lib/schedule-data";

type PopupTab = "keterangan" | "penugasan" | "ketentuan";

interface PopupProps {
  data: ScheduleData;
  selectedImageId: string | null;
  onClose: () => void;
}

export default function Popup({ data, selectedImageId, onClose }: PopupProps) {
  const [activeTab, setActiveTab] = useState<PopupTab>("keterangan");

  // Resolve entry berdasarkan banner yang diklik. Clamp agar index selalu valid.
  const selectedIndex = Math.max(
    0,
    Math.min(data.length - 1, Number(selectedImageId ?? "0")),
  );
  const entry = data[selectedIndex];

  useEffect(() => {
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalBodyPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.paddingRight = originalBodyPaddingRight;
    };
  }, []);

  const renderContent = () => {
    if (!entry) return null;
    switch (activeTab) {
      case "penugasan":
        return <Penugasan data={entry.penugasan} />;
      case "ketentuan":
        return <Ketentuan data={entry.ketentuan} />;
      default:
        return <Keterangan data={entry.keterangan} />;
    }
  };

  return (
    <div
      className="popup-backdrop"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="popup-container" onClick={(event) => event.stopPropagation()}>
        <div className="popup-inner-shadow">
          <div className="popup-navbar">
            <ScheduleButton selectedTab={activeTab} onSelectTab={setActiveTab} />
          </div>
          <div className="popup-text-body">{renderContent()}</div>
        </div>
      </div>
      <div className="close-button-container" onClick={(event) => event.stopPropagation()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="108"
          height="108"
          viewBox="0 0 108 108"
          fill="none"
          onClick={(event) => {
            event.stopPropagation();
            onClose();
          }}
        >
          <rect
            x="-2.67442"
            y="2.67442"
            width="102.651"
            height="102.651"
            rx="50.4574"
            transform="matrix(-1 0 0 1 102.651 0)"
            fill="url(#paint0_linear_316_6730)"
            stroke="url(#paint1_linear_316_6730)"
            strokeWidth="5.34884"
          />
          <line x1="37.9689" y1="35.1453" x2="72.1863" y2="71.2201" stroke="#A767D1" strokeWidth="8.52368" strokeLinecap="round" />
          <line
            x1="4.26184"
            y1="-4.26184"
            x2="53.9833"
            y2="-4.26184"
            transform="matrix(-0.688181 0.725539 0.725539 0.688181 77.5776 34.9861)"
            stroke="#A767D1"
            strokeWidth="8.52368"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="paint0_linear_316_6730" x1="0" y1="54" x2="108" y2="54" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFED8F" />
              <stop offset="1" stopColor="#FBF7EE" />
            </linearGradient>
            <linearGradient id="paint1_linear_316_6730" x1="0" y1="54" x2="108" y2="54" gradientUnits="userSpaceOnUse">
              <stop stopColor="#E8AA2E" />
              <stop offset="0.475962" stopColor="#F8E89B" />
              <stop offset="1" stopColor="#ECB23A" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
