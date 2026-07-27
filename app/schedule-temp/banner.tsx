"use client";

import "./banner.css";
import Popup from "./popup/popup";
import { useEffect, useState } from "react";

export default function Banner(){
    const images = [
        {id: '0', src:"assets/schedule/banner-left.png"},
        {id: '1', src:"assets/schedule/banner-mid.png"},
        {id: '2', src:"assets/schedule/banner-right.png"},
        {id: '3', src:"assets/schedule/banner-right.png"},
        {id: '4', src:"assets/schedule/banner-mid.png"},
        {id: '5', src:"assets/schedule/banner-left.png"},
        {id: '6', src:"assets/schedule/banner-mid.png"}
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
    const visibleImage = images.slice(page * imagePerPage, page * imagePerPage + imagePerPage);

    useEffect(() => {
        setPage((current) => Math.min(current, Math.max(0, pageCount - 1)));
    }, [pageCount]);

    const nextPage = () => setPage((current) => Math.min(current + 1, pageCount - 1));
    const prevPage = () => setPage((current) => Math.max(current - 1, 0));

    const openPopup = (imageId: string) => {
        setSelectedImageId(imageId);
        setIsOpen(true);
    };

    const closePopup = () => {
        setIsOpen(false);
        setSelectedImageId(null);
    };

    return(
        <>
            <div className="banner-container">
                <button className="arrow-button button-left-container" onClick={prevPage} disabled={page === 0}> 
                    <img 
                        src="/assets/schedule/button-arrow-left.svg" 
                        alt="" 
                        className="button-left"
                    />
                </button>
                <div className="banners-box">
                    {visibleImage.map((image) => (
                        <div key={image.id} className={`banner-box-` + image.id + ` banner-boxes`}>
                            <img 
                                onClick={() => openPopup(image.id)} 
                                key={image.id} 
                                src={image.src} 
                                alt="" className={`banner-`+ image.id}
                            />
                        </div>
                    ))}
                </div>
                <button className="arrow-button button-right-container" onClick={nextPage} disabled={page === pageCount - 1}>
                    <img 
                        src="/assets/schedule/button-arrow-right.svg" 
                        alt="" 
                        className="button-right"
                    />
                </button>
            </div>
 
            {isOpen && <Popup selectedImageId={selectedImageId} onClose={closePopup} />}
        </>
    )
}