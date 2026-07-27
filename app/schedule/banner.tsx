"use client";

import "./banner.css";
import Popup from "./popup/popup";
import { useEffect, useState } from "react";
import type { ScheduleData } from "../../lib/schedule-data";

export default function Banner({ data }: { data: ScheduleData }) {
  const images = [
    { id: "0", src: "assets/thumbnail/praoweek.png" },
    { id: "1", src: "assets/thumbnail/upacarabendera.png" },
    { id: "2", src: "assets/thumbnail/matrikulasi.png" },
    { id: "3", src: "assets/thumbnail/day1.png" },
    { id: "4", src: "assets/thumbnail/day2.png" },
    { id: "5", src: "assets/thumbnail/day3.png" },
    { id: "6", src: "assets/thumbnail/day4.png" },
    { id: "7", src: "assets/thumbnail/day5.png" },
  ];

  const [page, setPage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [imagePerPage, setImagePerPage] = useState(3);

  useEffect(() => {
    const updateImagePerPage = () => {
      if (window.innerWidth < 768) {
        setImagePerPage(1);
      } else if (window.innerWidth < 1024) {
        setImagePerPage(2);
      } else {
        setImagePerPage(3);
      }
    };

    updateImagePerPage();
    window.addEventListener("resize", updateImagePerPage);

    return () => window.removeEventListener("resize", updateImagePerPage);
  }, []);

  const pageCount = Math.ceil(images.length / imagePerPage);
  const visibleImage = images.slice(
    page * imagePerPage,
    page * imagePerPage + imagePerPage,
  );

  useEffect(() => {
    setPage((current) => Math.min(current, Math.max(0, pageCount - 1)));
  }, [pageCount]);

  const nextPage = () =>
    setPage((current) => Math.min(current + 1, pageCount - 1));
  const prevPage = () => setPage((current) => Math.max(current - 1, 0));

  const openPopup = (imageId: string) => {
    setSelectedImageId(imageId);
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
    setSelectedImageId(null);
  };

  return (
    <>
      <div className="banner-container">
        <button
          className="arrow-button button-left-container"
          onClick={prevPage}
          disabled={page === 0}
        >
          <img
            src="/assets/schedule/button-arrow-left.svg"
            alt=""
            className="button-left"
          />
        </button>
        <div className="banners-box">
          {visibleImage.map((image) => (
            <div
              key={image.id}
              className={`banner-box-` + image.id + ` banner-boxes`}
            >
              <img
                onClick={() => openPopup(image.id)}
                key={image.id}
                src={image.src}
                alt=""
                className={`banner-` + image.id}
              />
            </div>
          ))}
        </div>
        <button
          className="arrow-button button-right-container"
          onClick={nextPage}
          disabled={page === pageCount - 1}
        >
          <img
            src="/assets/schedule/button-arrow-right.svg"
            alt=""
            className="button-right"
          />
        </button>
      </div>

      {isOpen && (
        <Popup
          data={data}
          selectedImageId={selectedImageId}
          onClose={closePopup}
        />
      )}
    </>
  );
}
