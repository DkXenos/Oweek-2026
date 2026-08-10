import type { PopupSection } from "../../../lib/schedule-data";
import RichText from "./rich-text";

// Renderer bersama untuk tab penugasan & ketentuan: judul section, lalu tiap
// baris content jadi satu poin. Dua tingkat judul, sama-sama tanpa bullet:
//
//   "## JUDUL"  blok besar dalam satu hari (mis. "## PENUGASAN ORMAWA FEST 2026")
//   "# Judul"   tugas tersendiri di dalam blok itu (mis. "# Exploration Card")
//
// "## " harus dicek lebih dulu karena "# " juga cocok dengan awalannya.
const HEADING_PREFIX = "## ";
const SUBHEADING_PREFIX = "# ";

export default function SectionBody({ data }: { data: PopupSection }) {
  return (
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

        if (content.startsWith(SUBHEADING_PREFIX)) {
          return (
            <div key={id} className="content-text-box content-subheading-box">
              <span className="content-text content-subheading">
                {content.slice(SUBHEADING_PREFIX.length)}
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
  );
}
