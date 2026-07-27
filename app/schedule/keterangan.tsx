import { scheduleKeterangan } from "./popup-data";
import "./keterangan.css";

export default function keterangan({ selectedImageId = "0" }: { selectedImageId?: string }){
    const selectedIndex = Math.max(0, Math.min(scheduleKeterangan.length - 1, Number(selectedImageId || "0")));
    const day = scheduleKeterangan[selectedIndex];

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
            <h2 className="keterangan-dresscode-title">Dresscode</h2>
            <div className="keterangan-dresscode-box">
                <div className="keterangan-dresscode-do">
                    <h3 className="dresscode-text-do dresscode-text">DO</h3>
                    <div className="image-box">
                        <img src={day.image?.at(0)} alt="" />
                    </div>
                    <div className="dresscode-detail">
                        <p className="dresscode-text">{day.atasan?.at(0)}</p>
                        <p className="dresscode-text">{day.celana?.at(0)}</p>
                        <p className="dresscode-text">{day.sepatu?.at(0)}</p>
                    </div>
                </div>
                <div className="keterangan-dresscode-dont">
                    <h3 className="dresscode-text-dont dresscode-text">DON'T</h3>
                    <div className="image-box">
                        <img src={day.image?.at(1)} alt="" />
                    </div>
                    <div className="dresscode-detail">
                        <p className="dresscode-text">{day.atasan?.at(1)}</p>
                        <p className="dresscode-text">{day.celana?.at(1)}</p>
                        <p className="dresscode-text">{day.sepatu?.at(1)}</p>
                    </div>
                </div>
            </div>
        </>
    )
}