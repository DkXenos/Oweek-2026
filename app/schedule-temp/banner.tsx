"use client";

import "./banner.css";
import ScheduleButton from "./schedule-button";
import Keterangan from "./keterangan"
import { useState } from "react";

export default function Banner(){
    const images = [
        {id: '1', src:"assets/schedule/banner-left.png"},
        {id: '2', src:"assets/schedule/banner-mid.png"},
        {id: '3', src:"assets/schedule/banner-right.png"},
        {id: '4', src:"assets/schedule/banner-right.png"},
        {id: '5', src:"assets/schedule/banner-mid.png"},
        {id: '6', src:"assets/schedule/banner-left.png"}
    ]

    const [page, setPage] = useState(0);
    const imagesPerPage = 3;
    const pageCount = Math.ceil(images.length / imagesPerPage);
    const visibleImages = images.slice(page * imagesPerPage, page * imagesPerPage + imagesPerPage);

    const prevPage = () => setPage((current) => Math.max(current - 1, 0));
    const nextPage = () => setPage((current) => Math.min(current + 1, pageCount - 1));

    const [isOpen, setIsOpen] = useState(false);
    const openPopup = () => setIsOpen(true);
    const closePopup = () => setIsOpen(false);

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
                    {visibleImages.map((image) => (
                        <img onClick={openPopup} key={image.id} src={image.src} alt="" className={`banner-`+ image.id}/>
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
 
            {isOpen && (
                <>
                    <div className="popup-backdrop" onClick={closePopup}>
                        <div className="popup-container">
                            <div className="popup-inner-shadow">
                                <div className="popup-navbar">
                                    <ScheduleButton /> 
                                    
                                </div>
                                <div className="popup-text-body">
                                    {/* keterangan temporary*/}
                                    <Keterangan />
                                </div>
                            </div>
                        </div>
                        <div className="close-button-container">
                            {/* <img 
                                src="/assets/schedule/close-button.svg" 
                                alt="" 
                                className="close-button"
                            /> */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="108" height="108" viewBox="0 0 108 108" fill="none">
                                <rect x="-2.67442" y="2.67442" width="102.651" height="102.651" rx="50.4574" transform="matrix(-1 0 0 1 102.651 0)" fill="url(#paint0_linear_316_6730)" stroke="url(#paint1_linear_316_6730)" strokeWidth="5.34884"/>
                                <line x1="37.9689" y1="35.1453" x2="72.1863" y2="71.2201" stroke="#A767D1" strokeWidth="8.52368" strokeLinecap="round"/>
                                <line x1="4.26184" y1="-4.26184" x2="53.9833" y2="-4.26184" transform="matrix(-0.688181 0.725539 0.725539 0.688181 77.5776 34.9861)" stroke="#A767D1" strokeWidth="8.52368" strokeLinecap="round"/>
                                <defs>
                                    <linearGradient id="paint0_linear_316_6730" x1="0" y1="54" x2="108" y2="54" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#FFED8F"/>
                                        <stop offset="1" stopColor="#FBF7EE"/>
                                    </linearGradient>
                                    <linearGradient id="paint1_linear_316_6730" x1="0" y1="54" x2="108" y2="54" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#E8AA2E"/>
                                        <stop offset="0.475962" stopColor="#F8E89B"/>
                                        <stop offset="1" stopColor="#ECB23A"/>
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}