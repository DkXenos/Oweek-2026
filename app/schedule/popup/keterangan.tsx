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
    return(
        <>
            <h1 className="keterangan-title">{data.title}</h1>
            <div className={`keterangan-detail${agenda && agenda.length > 0 ? " keterangan-detail-agenda" : ""}`}>
                {data.subtitle && data.subtitle.trim() !== "" && (
                    <div className="keterangan-subtitle">{data.subtitle}</div>
                )}
                {agenda && agenda.length > 0 ? (
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
                <a href={data.parentsGathering} className="keterangan-dresscode-title"><u>Pelajari lebih lanjut --{`>`}</u></a>
            )}
            <h2 className="keterangan-dresscode-title">Dresscode</h2>
            <div className="keterangan-dresscode-box">
                <div className="keterangan-dresscode-do">
                    <div className="image-box">
                        <img src={data.dresscodeDoImage} alt="" />
                    </div>
                </div>
                <div className="keterangan-dresscode-dont">
                    <div className="image-box">
                        <img src={data.dresscodeDontImage} alt="" />
                    </div>
                </div>
            </div>
            {/* Satu baris teks dresscode, di tengah, di bawah kedua gambar. */}
            {data.dresscode && data.dresscode.trim() !== "" && (
                <p className="dresscode-text keterangan-dresscode-text">{data.dresscode}</p>
            )}
        </>
    )
}
