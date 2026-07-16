// Schedule data — one entry per day. The component maps over this array and the
// left/right nav buttons cycle through it. Add/edit days here only.

export interface ScheduleDay {
  /** the day number shown as "DAY 1", "DAY 2", … */
  index: number;
  judul: string;
  /** the event title (the large heading on the card) */
  title: string;
  /** calendar date line */
  date: string;
  /** venue line */
  location: string;
  /** time-range line */
  time: string | string[];
}

export const scheduleDays: ScheduleDay[] = [
  {
    index: 0,
    judul: "PRA OWEEK",
    title: "",
    date: "Rabu, 14 Agustus 2026",
    location: "Online (Zoom)",
    time: ["Kloter 1 : 07:00 - 10.45 WIB", "Kloter 2 : 13:00 - 16:45 WIB"],
  },
  {
    index: 1,
    judul: "DAY 1",
    title: "WORKSHOP & TALKSHOW INSPIRASI MAHASISWA BARU",
    date: "Senin, 18 Agustus 2025",
    location: "Universitas Ciputra Surabaya",
    time: "07.00–15.00 WIB",
  },
  {
    index: 2,
    judul: "DAY 1",
    title: "MALAM PUNCAK & PENUTUPAN ORIENTATION WEEK",
    date: "Selasa, 19 Agustus 2025",
    location: "Universitas Ciputra Surabaya",
    time: "08.00–16.00 WIB",
  },
];
