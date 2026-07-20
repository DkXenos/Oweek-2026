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
    judul: "INDEPENDENCE DAY",
    title: "UPACARA BENDERA & OPENING CEREMONY & SEMINAR 5E & TM SELLING",
    date: "Minggu, 17 Agustus 2026",
    location: "Universitas Ciputra Surabaya",
    time: ["06.30 - 08.05 WIB (Upacara Bendera)", "08.05 - 09:48 WIB (Opening Ceremony)", "09:48 - 13.32 WIB (Seminar 5E)", "14:20 - 16.47 WIB (TM SELLING)"]
  },
  {
    index: 2,
    judul: "DAY 1",
    title: "WE SEE THE LIGHT (TALKSHOW & SHOWCASE SELLING)",
    date: "Senin, 31 Agustus 2026",
    location: "Hall Sekolah Ciputra Surabaya",
    time: ["Sesi 1 7.30-12.15 WIB", "Sesi 2 12.15-17.00 WIB"],
  },
  {
    index: 3,
    judul: "DAY 2",
    title: "WHERE MAGIC FINDS YOU (STUDENT DEVELOPMENT PROGRAM & ORMAWA FEST)",
    date: "Selasa, 1 September 2026",
    location: "Universitas Ciputra Surabaya",
    time: "07.00 - 17.00 WIB",
  },
  {
    index: 4,
    judul: "DAY 3",
    title: "INTO THE EVER AFTER (PRA-LDK & ORMAWA FEST)",
    date: "Rabu, 2 September 2026",
    location: "Universitas Ciputra Surabaya",
    time: "07.00 - 15.30 WIB",
  },
  {
    index: 5,
    judul: "DAY 4",
    title: "SYMBIOTIC PALLETE FOR INFINITE FLAVOURS (SELLING DAY)",
    date: "Kamis, 3 September 2026",
    location: "Ciputra World Mall Surabaya",
    time: "08.30 - 21.00 WIB",
  },
  {
    index: 6,
    judul: "DAY 5",
    title: "THE GOLDEN EPILOGUE  (SIDANG SENAT & CLOSING)",
    date: "Jumat, 4 September 2026 ",
    location: "Ciputra World Mall Surabaya",
    time: "14.00 - 21.10 WIB",
  },
];
