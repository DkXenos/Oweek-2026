import "./ketentuan_penugasan.css";
import type { PopupSection } from "../../../lib/schedule-data";

export default function Ketentuan({ data }: { data: PopupSection }) {
    return(
        <>
            <div className="box-container">
                <h2 className="popup-title">{data.title}</h2>
                {data.content.map((content, id) => (
                    <div key={id} className="content-text-box">
                        <span className="popup-dot" />
                        <span className="content-text">{content}</span>
                    </div>
                ))}
            </div>
        </>
    )
}
