"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
  // Panah ke bawah sebagai petunjuk bahwa isi popup masih bisa di-scroll.
  // Hanya tampil kalau kontennya memang lebih tinggi dari areanya DAN user
  // belum scroll sama sekali.
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const [showScrollHint, setShowScrollHint] = useState(false);

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

  // Banner Parents Gathering dikenali dari adanya URL parentsGathering di data
  // (bukan dari nomor banner, supaya aman kalau urutan banner berubah). URL itu
  // sekaligus jadi link "Pelajari lebih lanjut" di tab keterangan.
  const isParentsGathering = Boolean(
    entry?.keterangan.parentsGathering?.trim(),
  );

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

  // Banner matrikulasi & Parents Gathering hanya punya isi keterangan: tombol
  // tab tidak ditampilkan dan isinya dikunci di tab keterangan. activeTab
  // sengaja tidak di-reset supaya tab pilihan user di banner lain tidak ikut
  // berubah setelah membuka salah satu banner ini.
  const isKeteranganOnly = isMatrikulasi || isParentsGathering;
  const currentTab: PopupTab = isKeteranganOnly ? "keterangan" : activeTab;

  // Kalau banner yang dibuka berganti, reset pilihan prodi.
  useEffect(() => {
    setSelectedProdiId(null);
  }, [selectedImageId]);

  const updateScrollHint = useCallback(() => {
    const body = bodyRef.current;
    if (!body) return;
    const scrollable = body.scrollHeight - body.clientHeight > 8;
    setShowScrollHint(scrollable && body.scrollTop <= 8);
  }, []);

  useEffect(() => {
    const body = bodyRef.current;
    if (!body) return;

    updateScrollHint();
    body.addEventListener("scroll", updateScrollHint, { passive: true });
    window.addEventListener("resize", updateScrollHint);
    // Gambar dresscode dimuat belakangan; tingginya baru diketahui setelah load.
    body.addEventListener("load", updateScrollHint, true);

    return () => {
      body.removeEventListener("scroll", updateScrollHint);
      window.removeEventListener("resize", updateScrollHint);
      body.removeEventListener("load", updateScrollHint, true);
    };
    // Ganti tab / prodi mengganti isi popup, jadi hint dihitung ulang.
  }, [mounted, currentTab, selectedImageId, selectedProdiId, isContentLocked, updateScrollHint]);

  const renderContent = () => {
    if (!entry || isContentLocked) return null;
    switch (currentTab) {
      case "penugasan":
        return <Penugasan data={selectedProdi?.penugasan ?? entry.penugasan} />;
      case "ketentuan":
        return <Ketentuan data={selectedProdi?.ketentuan ?? entry.ketentuan} />;
      default:
        return (
          <Keterangan
            data={entry.keterangan}
            showParentsGatheringLink={isParentsGathering}
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
          {/* Wadahnya tetap dirender walau tombolnya disembunyikan supaya
              jarak atas isi popup tidak berubah. */}
          <div className="popup-navbar">
            {!isKeteranganOnly && (
              <ScheduleButton selectedTab={currentTab} onSelectTab={setActiveTab} />
            )}
          </div>
          <div className="popup-text-body" ref={bodyRef}>
            {isMatrikulasi && matrikulasiData && (
              <ProdiSelect
                data={matrikulasiData}
                selectedProdi={selectedProdi}
                onSelectProdi={setSelectedProdiId}
              />
            )}
            {/* Selama prodi belum dipilih, isi popup memang kosong — beri
                petunjuk supaya tidak terlihat seperti popup yang gagal muat. */}
            {isContentLocked && (
              <p className="prodi-select-hint">
                Mohon pilih program studi terlebih dahulu
              </p>
            )}
            {renderContent()}
          </div>
        </div>
        <div
          className={`popup-scroll-hint${showScrollHint ? "" : " popup-scroll-hint-hidden"}`}
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="#a767d1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="5 9 12 16 19 9" />
          </svg>
        </div>
      </div>
    </div>,
    document.body,
  );
}
