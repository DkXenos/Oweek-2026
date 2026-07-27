# UNUSED

Old schedule/jadwal system, kept only for reference. **Nothing in the app imports
these files** and they are not routes (they live outside `app/`), and `UNUSED` is
excluded from `tsconfig.json`, so they are not type-checked or built.

The live schedule now uses a single data file instead:

- Data:  `data/schedule-data.json`
- Logic: `lib/schedule-data.ts`
- Public page: `app/schedule/` (reads the JSON)
- Admin:  `app/admin/admin-oweek/` (edits + downloads the JSON)

## What's in here (the replaced system)

- `data/jadwal.json` — old data file
- `lib/jadwal.ts` — old read/write/validate helpers
- `components/data-template.ts`, `components/temp-schedule.tsx/.css` — old mapping + component
- `app/admin/jadwal/` — old read-only jadwal viewer page
- `app/schedule-old/` — old schedule page
- `app/admin/jadwal-admin-module.md` — docs for the old module

Safe to delete entirely once you're sure nothing here is needed.
