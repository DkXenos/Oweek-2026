// Schedule data — one entry per day. The component maps over this array and the
// left/right nav buttons cycle through it. Add/edit days here only.

export interface ScheduleDay {
  /** the day number shown as "DAY 1", "DAY 2", … */
  day: number;
  /** the event title (the large heading on the card) */
  title: string;
  /** calendar date line */
  date: string;
  /** venue line */
  location: string;
  /** time-range line */
  time: string;
}

export const scheduleDays: ScheduleDay[] = [
  {
    day: 1,
    title: "UPACARA & PEMBUKAAN & SEMINAR PILLARS OF ENTREPRENEURSHIP",
    date: "Minggu, 17 Agustus 2025",
    location: "UC Plaza & Universitas Ciputra Surabaya",
    time: "06.30–13.00 WIB",
  },
  {
    day: 2,
    title: "WORKSHOP & TALKSHOW INSPIRASI MAHASISWA BARU",
    date: "Senin, 18 Agustus 2025",
    location: "Universitas Ciputra Surabaya",
    time: "07.00–15.00 WIB",
  },
  {
    day: 3,
    title: "MALAM PUNCAK & PENUTUPAN ORIENTATION WEEK",
    date: "Selasa, 19 Agustus 2025",
    location: "Universitas Ciputra Surabaya",
    time: "08.00–16.00 WIB",
  },
];
