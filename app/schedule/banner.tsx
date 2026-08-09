"use client";

import "./banner.css";
import Popup from "./popup/popup";
import { useEffect, useState } from "react";
import type { ScheduleData } from "../../lib/schedule-data";

export default function Banner({ data }: { data: ScheduleData }) {
  const images = [
    { id: "0", src: "/assets/thumbnail/praoweek.webp" },
    { id: "1", src: "/assets/thumbnail/upacarabendera.webp" },
    { id: "2", src: "/assets/thumbnail/matrikulasi.png" },
    { id: "3", src: "/assets/thumbnail/day1.webp" },
    { id: "4", src: "/assets/thumbnail/day2.webp" },
    { id: "5", src: "/assets/thumbnail/day3.webp" },
    { id: "6", src: "/assets/thumbnail/day4.webp" },
    { id: "7", src: "/assets/thumbnail/day5.webp" },
    { id: "8", src: "/assets/thumbnail/day5.webp" },
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

  const pageCount = Math.max(1, Math.ceil(images.length / imagePerPage));

  useEffect(() => {
    setPage((current) => Math.min(current, Math.max(0, pageCount - 1)));
  }, [pageCount]);

  // Paging wraps: past the last page loops back to the first, and vice versa.
  const nextPage = () => setPage((current) => (current + 1) % pageCount);
  const prevPage = () =>
    setPage((current) => (current - 1 + pageCount) % pageCount);

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
          aria-label="Previous schedule page"
        >
          <img
            src="/assets/schedule/button-arrow-left.svg"
            alt=""
            className="button-left"
          />
        </button>
        <div className="banners-box">
          <div
            className="banner-track"
            style={{ transform: `translateX(-${page * 100}%)` }}
          >
            {Array.from({ length: pageCount }, (_, pageIndex) => {
              const pageImages = images.slice(
                pageIndex * imagePerPage,
                (pageIndex + 1) * imagePerPage,
              );

              return (
                <div
                  className={`banner-page banner-page-${pageIndex}${page === pageIndex ? " active" : ""}`}
                  key={`banner-page-${pageIndex}`}
                >
                  {pageImages.map((image, index) => (
                    <div
                      key={image.id}
                      className={`banner-box-${image.id} banner-boxes`}
                      style={{
                        animationDelay: `${index * 0.15 + 0.15}s`,
                      }}
                    >
                      <img
                        onClick={() => openPopup(image.id)}
                        src={image.src}
                        alt=""
                        className={`banner-${image.id}`}
                        fetchPriority={index < imagePerPage ? "high" : "low"}
                      />
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
        <button
          className="arrow-button button-right-container"
          onClick={nextPage}
          aria-label="Next schedule page"
        >
          <img
            src="/assets/schedule/button-arrow-right.svg"
            alt=""
            className="button-right"
          />
        </button>
      </div>

      <div className="pagination-container" aria-label="Schedule pagination">
        {Array.from({ length: pageCount }, (_, index) => (
          <div
            key={`pagination-dot-${index}`}
            className={`pagination-dot${page === index ? " active" : ""}`}
            onClick={() => setPage(index)}
            role="button"
            tabIndex={0}
            aria-label={`Go to page ${index + 1}`}
            aria-current={page === index ? "page" : undefined}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                setPage(index);
              }
            }}
          />
        ))}
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
