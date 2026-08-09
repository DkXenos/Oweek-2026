import { Fragment, type ReactNode } from "react";

// Isi penugasan & ketentuan ditulis dengan markup ringan (bukan HTML mentah),
// supaya aman diedit dari form admin dan gampang ditulis:
//
//   *tebal*            -> teks tebal
//   [LINK](https://…)  -> hyperlink (bold + underline, buka tab baru)
//
// Selain dua pola itu, teks dirender apa adanya. Tidak ada HTML yang di-inject,
// jadi tanda < > & di dalam data tetap aman.

// Urutan penting: pola link dicoba lebih dulu supaya URL yang mengandung *
// tidak salah dibaca sebagai penanda bold.
const TOKEN = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|\*([^*]+)\*/g;

export function parseRichText(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  TOKEN.lastIndex = 0;
  while ((match = TOKEN.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const [, linkLabel, linkHref, boldText] = match;
    if (linkHref) {
      nodes.push(
        <a
          key={match.index}
          className="content-link"
          href={linkHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          {linkLabel}
        </a>,
      );
    } else {
      nodes.push(
        <b key={match.index} className="content-bold">
          {boldText}
        </b>,
      );
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

export default function RichText({ text }: { text: string }) {
  return <>{parseRichText(text).map((node, id) => <Fragment key={id}>{node}</Fragment>)}</>;
}
