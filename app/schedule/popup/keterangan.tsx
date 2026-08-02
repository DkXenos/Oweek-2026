import type { KeteranganData } from "../../../lib/schedule-data";
import "./keterangan.css";

export default function Keterangan({ data }: { data: KeteranganData }) {
    return(
        <>
            <h1 className="keterangan-title">{data.title}</h1>
            <div className="keterangan-detail">
                {data.subtitle && data.subtitle.trim() !== "" && (
                    <div className="keterangan-subtitle">{data.subtitle}</div>
                )}
                <div className="keterangan-item">
                    <span className="keterangan-dot" />
                    <span className="keterangan-detail-text">{data.date}</span>
                </div>
                <div className="keterangan-item">
                    <span className="keterangan-dot" />
                    <span className="keterangan-detail-text">{data.location}</span>
                </div>
                {data.time.map((time, id) => (
                    <div key={id} className="keterangan-item">
                        <span className="keterangan-dot" />
                        <span className="keterangan-detail-text">{time}</span>
                    </div>
                ))}
            </div>
            <h2 className="keterangan-dresscode-title">Dresscode</h2>
            <div className="keterangan-dresscode-box">
                <div className="keterangan-dresscode-do">
                    <h3 className="dresscode-text-do dresscode-text">DO</h3>
                    <div className="image-box">
                        <img src={data.dresscodeDoImage} alt="" />
                    </div>
                    <div className="dresscode-detail">
                        {data.do.map((text, id) => (
                            <p key={id} className="dresscode-text">{text}</p>
                        ))}
                    </div>
                </div>
                <div className="keterangan-dresscode-dont">
                    <h3 className="dresscode-text-dont dresscode-text">DON'T</h3>
                    <div className="image-box">
                        <img src={data.dresscodeDontImage} alt="" />
                    </div>
                    <div className="dresscode-detail">
                        {data.dont.map((text, id) => (
                            <p key={id} className="dresscode-text">{text}</p>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
