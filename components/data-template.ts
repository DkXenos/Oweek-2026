// Display model for the schedule card. The source of truth now lives in
// `data/jadwal.json` (edited via the admin at /admin/admin-oweek). The public
// page reads that JSON with `getJadwal()` and maps each entry to a `ScheduleDay`
// here, so the component stays decoupled from the raw JSON shape.

import type { JadwalDay } from "@/lib/jadwal";

export interface ScheduleDay {
  /** position in the list, used only as a stable key */
  index: number;
  /** the big heading on the card (e.g. "DAY 1", "PRA OWEEK") — from JadwalDay.day */
  judul: string;
  /** the event title (the large sub-heading on the card) — from details.title */
  title: string;
  /** calendar date line */
  date: string;
  /** venue line */
  location: string;
  /** time-range line(s) — a single string or several stacked lines */
  time: string | string[];
  /** dresscode "Do" image path served statically from /public (may be empty) */
  dresscodeDoImage?: string;
  /** dresscode "Don't" image path served statically from /public (may be empty) */
  dresscodeDontImage?: string;
}

/** Map the admin JSON (JadwalDay[]) into the display model the card expects. */
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
