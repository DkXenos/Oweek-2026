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
    time: [
      "06.30 - 08.05 WIB (Upacara Bendera)",
      "08.05 - 09:48 WIB (Opening Ceremony)",
      "09:48 - 13.32 WIB (Seminar 5E)",
      "14:20 - 16.47 WIB (TM SELLING)",
      "Dresscode: Kemeja Putih, Celana Panjang Hitam Formal, Sepatu Hitam",
    ],
  },
  {
    index: 2,
    judul: "MATRIKULASI & INDUSTRY VISIT & PRODI DAY",
    title: "GLIMPSE OF TOMORROW",
    date: "Senin 24 - Kamis 27 Agustus 2026",
    location: "Menyesuaikan prodi masing masing",
    time: [
    ],
  },
  {
    index: 3,
    judul: "DAY 1",
    title: "WE SEE THE LIGHT (TALKSHOW & SHOWCASE SELLING)",
    date: "Senin, 31 Agustus 2026",
    location: "Hall Sekolah Ciputra Surabaya",
    time: [
      "Sesi 1 7.30-12.15 WIB",
      "Sesi 2 12.15-17.00 WIB",
      "Dresscode: Kemeja/Blouse Putih, Celana Panjang Hitam Bebas, Sepatu Bebas (Menutupi Jari dan Tumit)",
    ],
  },
  {
    index: 4,
    judul: "DAY 2",
    title: "WHERE MAGIC FINDS YOU (STUDENT DEVELOPMENT PROGRAM & ORMAWA FEST)",
    date: "Selasa, 1 September 2026",
    location: "Universitas Ciputra Surabaya",
    time: [
      "07.00 - 17.00 WIB",
      "Dresscode: Kemeja/Blouse Warna Bebas, Celana Panjang Bebas, Sepatu Bebas (Menutupi Jari dan Tumit)",
    ],
  },
  {
    index: 5,
    judul: "DAY 3",
    title: "INTO THE EVER AFTER (PRA-LDK & ORMAWA FEST)",
    date: "Rabu, 2 September 2026",
    location: "Universitas Ciputra Surabaya",
    time: [
      "07.00 - 15.30 WIB",
      "Dresscode: Baju Batik Berkerah (DILARANG DIJADIKAN OUTER), Celana Panjang Bebas (Tidak Sobek), Sepatu Sneakers (Warna Bebas)",
    ],
  },
  {
    index: 6,
    judul: "DAY 4",
    title: "SYMBIOTIC PALLETE FOR INFINITE FLAVOURS (SELLING DAY)",
    date: "Kamis, 3 September 2026",
    location: "Ciputra World Mall Surabaya",
    time: [
      "08.30 - 21.00 WIB",
      "Dresscode: Kaos Universitas Ciputra, celana panjang gelap tidak sobek, name tag, bersepatu (warna bebas) serta menggunakan Atribut/Aksesoris (Sesuai dengan Main Ingredient)",
    ],
  },
  {
    index: 7,
    judul: "DAY 5",
    title: "THE GOLDEN EPILOGUE  (SIDANG SENAT & CLOSING)",
    date: "Jumat, 4 September 2026 ",
    location: "Ciputra World Mall Surabaya",
    time: [
      "14.00 - 21.10 WIB",
      "Dresscode Laki-Laki : Kemeja Putih, Celana Panjang Hitam, Sepatu Bebas",
      "Dresscode Perempuan : Kemeja Putih, Celana Panjang Hitam / Rok Hitam Panjang (dibawah lutut), Sepatu Bebas",
    ],
  },
];
