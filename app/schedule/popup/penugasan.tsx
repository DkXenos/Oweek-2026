import "./ketentuan_penugasan.css";
import type { PopupSection } from "../../../lib/schedule-data";
import RichText from "./rich-text";

// Satu baris content yang diawali "## " dirender sebagai sub-judul (tanpa bullet),
// dipakai untuk memisahkan blok penugasan dalam satu hari, mis. penugasan DAY 2
// dengan "## PENUGASAN ORMAWA FEST 2026". Baris biasa tetap jadi bullet.
const HEADING_PREFIX = "## ";

export default function Penugasan({ data }: { data: PopupSection }) {
    return(
        <>
            <div className="box-container">
                <h2 className="popup-title">{data.title}</h2>
                {data.content.map((content, id) => {
                    if (content.startsWith(HEADING_PREFIX)) {
                        return (
                            <div key={id} className="content-text-box content-heading-box">
                                <span className="content-text content-heading">
                                    {content.slice(HEADING_PREFIX.length)}
                                </span>
                            </div>
                        );
                    }

                    return (
                        <div key={id} className="content-text-box">
                            {/* Bullet-nya dibuat lewat ::before di .content-bullet supaya
                                sejajar dengan baris pertama teks, bukan di tengah paragraf. */}
                            <span className="content-text content-bullet">
                                <RichText text={content} />
                            </span>
                        </div>
                    );
                })}
            </div>
        </>
    )
}
