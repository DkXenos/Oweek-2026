import { scheduleKeterangan } from "./popup-data";
import { useState } from "react";
import "./keterangan.css";

export default function keterangan(){
    const [index, setIndex] = useState(0);
    const day = scheduleKeterangan[index];

    return(
        <>
            <h1 className="keterangan-title">{day.title}</h1>
            <div className="keterangan-detail">
                {day.subtitle && day.subtitle.trim() !== "" && (
                    <div className="keterangan-subtitle">{day.subtitle}</div>
                )}
                <div className="keterangan-item">
                    <span className="keterangan-dot" />
                    <span className="keterangan-detail-text">{day.date}</span>
                </div>
                <div className="keterangan-item">
                    <span className="keterangan-dot" />
                    <span className="keterangan-detail-text">{day.location}</span>
                </div>
                {Array.isArray(day.time) ? (
                    day.time.map((time, id) => (
                        <div key={id} className="keterangan-item">
                            <span className="keterangan-dot" />
                            <span className="keterangan-detail-text">{time}</span>
                        </div>
                    ))
                ) : (
                    <div className="keterangan-item">
                        <span className="keterangan-dot" />
                        <span className="keterangan-detail-text">{day.time}</span>
                    </div>
                )}
            </div>
        </>
    )
}