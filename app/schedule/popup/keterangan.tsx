import type { KeteranganData } from "../../../lib/schedule-data";
import type { AgendaGroup } from "../../../lib/matrikulasi-data";
import Agenda from "./agenda";
import "./keterangan.css";

export default function Keterangan({
  data,
  showParentsGatheringLink,
  // Khusus banner matrikulasi: isinya 3 acara dengan tanggal/lokasi/jam
  // masing-masing, jadi menggantikan baris date/location/time bawaan.
  agenda,
}: {
  data: KeteranganData;
  showParentsGatheringLink: boolean;
  agenda?: AgendaGroup[];
}) {
    const isAgenda = Boolean(agenda && agenda.length > 0);
    // Path gambar bisa kosong selama datanya belum diisi. <img src=""> bikin
    // browser me-request ulang halamannya, jadi elemennya jangan dirender.
    const doImage = data.dresscodeDoImage?.trim() ?? "";
    const dresscodeText = data.dresscode?.trim() ?? "";
    const showDresscode =
        !isAgenda && (doImage !== "" || dresscodeText !== "");

    return(
        <>
            <h1 className="keterangan-title">{data.title}</h1>
            <div className={`keterangan-detail${isAgenda ? " keterangan-detail-agenda" : ""}`}>
                {data.subtitle && data.subtitle.trim() !== "" && (
                    <div className="keterangan-subtitle">{data.subtitle}</div>
                )}
                {isAgenda && agenda ? (
                    <Agenda groups={agenda} />
                ) : (
                    <>
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
                    </>
                )}
            </div>
            {showParentsGatheringLink && data.parentsGathering && (
                <a
                    href={data.parentsGathering}
                    className="keterangan-dresscode-title keterangan-parents-link"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <u>Pelajari lebih lanjut --{`>`}</u>
                </a>
            )}
            {/* Banner matrikulasi punya dresscode sendiri per hari di dalam
                agenda, jadi blok dresscode + gambar DO/DON'T di sini disembunyikan
                khusus untuk banner itu. Banner lain tidak berubah. */}
            {showDresscode && (
                <>
                    <h2 className="keterangan-dresscode-title">Dresscode</h2>
                    {(doImage !== "") && (
                        <div className="keterangan-dresscode-box">
                            {doImage !== "" && (
                                <div className="keterangan-dresscode-do">
                                    <div className="image-box">
                                        <img src={doImage} alt="" />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                    {/* Satu baris teks dresscode, di tengah, di bawah kedua gambar. */}
                    {dresscodeText !== "" && (
                        <p className="dresscode-text keterangan-dresscode-text">{dresscodeText}</p>
                    )}
                </>
            )}
        </>
    )
}
