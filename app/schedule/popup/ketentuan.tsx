import "./ketentuan_penugasan.css";
import type { PopupSection } from "../../../lib/schedule-data";
import RichText from "./rich-text";

export default function Ketentuan({ data }: { data: PopupSection }) {
    return(
        <>
            <div className="box-container">
                <h2 className="popup-title">{data.title}</h2>
                {data.content.map((content, id) => (
                    <div key={id} className="content-text-box">
                        {/* Bullet-nya dibuat lewat ::before di .content-bullet supaya
                            sejajar dengan baris pertama teks, bukan di tengah paragraf. */}
                        <span className="content-text content-bullet">
                            <RichText text={content} />
                        </span>
                    </div>
                ))}
            </div>
        </>
    )
}
