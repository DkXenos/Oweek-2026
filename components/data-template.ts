import type { JadwalDay } from "@/lib/jadwal";

export interface ScheduleDay {
  index: number;
  judul: string;
  title: string;
  date: string;
  location: string;
  time: string | string[];
  dresscodeDoImage?: string;
  dresscodeDontImage?: string;
}
export function toScheduleDays(jadwal: JadwalDay[]): ScheduleDay[] {
  return jadwal.map((day, index) => ({
    index,
    judul: day.day,
    title: day.details.title,
    date: day.date,
    location: day.details.location,
    time: day.details.time,
    dresscodeDoImage: day.details.dresscodeDoImage || "",
    dresscodeDontImage: day.details.dresscodeDontImage || "",
  }));
}
