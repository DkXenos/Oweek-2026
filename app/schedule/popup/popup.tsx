"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import ScheduleButton from "./popup-button";
import Keterangan from "./keterangan";
import Penugasan from "./penugasan";
import Ketentuan from "./ketentuan";
import ProdiSelect from "./prodi-select";
import type { ScheduleData } from "../../../lib/schedule-data";
import type { MatrikulasiData } from "../../../lib/matrikulasi-data";
import {
  findProdi,
  getAgendaGroups,
  isMatrikulasiBanner,
} from "../../../lib/matrikulasi-data";

type PopupTab = "keterangan" | "penugasan" | "ketentuan";

interface PopupProps {
  data: ScheduleData;
  matrikulasiData?: MatrikulasiData | null;
  selectedImageId: string | null;
  onClose: () => void;
}

export default function Popup({
  data,
  matrikulasiData = null,
  selectedImageId,
  onClose,
}: PopupProps) {
  const [activeTab, setActiveTab] = useState<PopupTab>("keterangan");
  const [selectedProdiId, setSelectedProdiId] = useState<string | null>(null);
  // Popup di-portal ke <body>. Kalau dirender di tempat aslinya, dia terkurung
  // di stacking context .layer-6 (z-index 8) sehingga footer (z-index 100)
  // menutupi tombol X — z-index 2002 milik popup tidak menolong di dalam sana.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const showParentsGatheringLink = selectedImageId === "8";

  // Kasus khusus matrikulasi: user WAJIB pilih prodi dulu. Selama belum
  // memilih, popup hanya menampilkan dropdown — tidak ada konten sama sekali,
  // termasuk tab keterangan. Setelah prodi dipilih:
  // - keterangan: judul & dresscode dari schedule-data, tapi tanggal/lokasi/jam
  //   diganti agenda 3 acara (matrikulasi, industry visit, prodi day) prodi itu;
  // - penugasan & ketentuan: dari data prodi terpilih.
  const isMatrikulasi = isMatrikulasiBanner(matrikulasiData, selectedImageId);
  const selectedProdi = isMatrikulasi
    ? findProdi(matrikulasiData, selectedProdiId)
    : null;
  const isContentLocked = isMatrikulasi && !selectedProdi;
  const agenda = getAgendaGroups(matrikulasiData, selectedProdi?.id ?? null);

  // Kalau banner yang dibuka berganti, reset pilihan prodi.
  useEffect(() => {
    setSelectedProdiId(null);
  }, [selectedImageId]);

  const renderContent = () => {
    if (!entry || isContentLocked) return null;
    switch (activeTab) {
      case "penugasan":
        return <Penugasan data={selectedProdi?.penugasan ?? entry.penugasan} />;
      case "ketentuan":
        return <Ketentuan data={selectedProdi?.ketentuan ?? entry.ketentuan} />;
      default:
        return (
          <Keterangan
            data={entry.keterangan}
            showParentsGatheringLink={showParentsGatheringLink}
            agenda={agenda}
          />
        );
    }
  };

  if (!mounted) return null;

  return createPortal(
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
          <div className="popup-text-body">
            {isMatrikulasi && matrikulasiData && (
              <ProdiSelect
                data={matrikulasiData}
                selectedProdi={selectedProdi}
                onSelectProdi={setSelectedProdiId}
              />
            )}
            {renderContent()}
          </div>
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
    </div>,
    document.body,
  );
}
