import "./agenda.css";
import type { AgendaGroup } from "../../../lib/matrikulasi-data";

// Dipakai di tab keterangan banner matrikulasi. Satu banner memuat 3 acara
// (matrikulasi, industry visit, prodi day), jadi tanggal/lokasi/jam tidak bisa
// dipakai bareng — tiap acara dirender sebagai grup sendiri, dan tiap sesi di
// dalamnya punya baris tanggal, lokasi, dan jam masing-masing.
export default function Agenda({ groups }: { groups: AgendaGroup[] }) {
  return (
    <div className="agenda">
      {groups.map((group) => (
        <section className="agenda-group" key={group.kategori}>
          <h2 className="agenda-title">{group.label}</h2>

          {group.sesi.length === 0 ? (
            <p className="agenda-kosong">Tidak ada jadwal untuk prodi ini</p>
          ) : (
            <div className="agenda-sesi-list">
              {group.sesi.map((sesi) => (
                <div className="agenda-sesi" key={sesi.id}>
                  <div className="agenda-row">
                    <span className="agenda-dot" />
                    <span className="agenda-text">{sesi.tanggal}</span>
                  </div>

                  {sesi.lokasi && (
                    <div className="agenda-row">
                      <span className="agenda-dot" />
                      <span className="agenda-text">{sesi.lokasi}</span>
                    </div>
                  )}

                  <div className="agenda-row">
                    <span className="agenda-dot" />
                    <span className="agenda-text">{sesi.waktu}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
