# Dokumentasi Modul Jadwal + Admin JSON

Dokumen ini menjelaskan modul jadwal yang bisa dipisahkan dan diberikan ke tim. Modul ini dibuat untuk Next.js App Router, tanpa database. Data disimpan di file JSON dan gambar dresscode disimpan di folder `public`.

## Fitur

- Halaman publik `/jadwal`
- Navigasi `Prev` dan `Next` untuk mengganti day yang sedang tampil
- Popup detail ketika card day diklik
- Popup berisi keterangan acara, lokasi, waktu, dresscode, gambar `Do`, gambar `Don't`, dan rundown
- Halaman login admin `/login-admin`
- Halaman admin `/admin-oweek`
- Admin bisa tambah day
- Admin bisa hapus day
- Admin bisa edit judul day, tanggal, keterangan, lokasi, waktu, dresscode, dan rundown dari field terpisah
- Admin bisa upload gambar dresscode `Do` dan `Don't`
- Tidak memakai database

## File Yang Harus Diberikan Ke Tim

Copy file dan folder berikut:

```txt
app/jadwal/page.tsx
app/jadwal/JadwalViewer.tsx
app/jadwal/styles.css

app/login-admin/page.tsx
app/login-admin/styles.css

app/admin-oweek/page.tsx
app/admin-oweek/AdminJadwalForm.tsx
app/admin-oweek/styles.css

data/jadwal.json

lib/jadwal.ts
lib/admin-auth.ts

public/assets/jadwal

proxy.ts
```

Catatan:

- Jika project tim sudah punya `proxy.ts`, jangan langsung ditimpa. Gabungkan logic proteksi `/admin-oweek`.
- Folder `public/assets/jadwal` perlu ikut dibawa karena menjadi lokasi gambar dresscode.
- Folder `public/assets/jadwal/uploads` akan terisi otomatis ketika admin upload gambar.

## File Pendukung Yang Perlu Ada Di Project Tujuan

Project tujuan harus punya:

```txt
tsconfig.json
package.json
app/layout.tsx
app/globals.css
```

Pastikan `tsconfig.json` punya path alias:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

## Versi Node.js

Gunakan Node.js:

```txt
>= 20.9.0
```

Rekomendasi:

```txt
Node.js 20 LTS atau Node.js 22 LTS
```

## Environment Variable

Untuk local development, default login adalah:

```txt
Username: admin
Password: admin123
```

Untuk production atau demo ke tim, buat `.env.local`:

```txt
ADMIN_USERNAME=admin
ADMIN_PASSWORD=password-yang-lebih-aman
ADMIN_SESSION_SECRET=random-string-panjang-untuk-sign-cookie
```

Penjelasan:

- `ADMIN_USERNAME`: username admin
- `ADMIN_PASSWORD`: password admin
- `ADMIN_SESSION_SECRET`: secret untuk signature cookie session

`ADMIN_SESSION_SECRET` sebaiknya panjang dan random. Jangan gunakan default untuk production.

## Struktur Data JSON

Data utama ada di:

```txt
data/jadwal.json
```

Contoh struktur:

```json
[
  {
    "day": "Day 1",
    "date": "17 Agustus 2026",
    "details": {
      "title": "UPACARA & PEMBUKAAN",
      "location": "UC Plaza",
      "time": "06.30-13.00 WIB",
      "dresscode": "DO",
      "dresscodeDoImage": "/assets/jadwal/uploads/day-1-do.jpg",
      "dresscodeDontImage": "/assets/jadwal/uploads/day-1-dont.jpg"
    },
    "items": [
      {
        "time": "07.00",
        "activity": "Absensi"
      },
      {
        "time": "08.00",
        "activity": "Snack Time"
      }
    ]
  }
]
```

Jangan edit `dresscodeDoImage` dan `dresscodeDontImage` manual jika tidak perlu. Gunakan form upload di admin agar path otomatis benar.

## Cara Pakai Admin

1. Jalankan project:

```bash
npm run dev
```

2. Buka:

```txt
http://localhost:3000/login-admin
```

3. Login dengan username/password admin.

4. Buka:

```txt
http://localhost:3000/admin-oweek
```

5. Edit data jadwal melalui form:

- Judul Day
- Tanggal
- Keterangan
- Lokasi
- Waktu
- Dresscode
- Rundown

6. Klik `Simpan Jadwal`.

7. Cek hasil di:

```txt
http://localhost:3000/jadwal
```

## Cara Tambah Day

Di `/admin-oweek`:

1. Klik `Tambah Day`.
2. Isi field yang muncul.
3. Tambah rundown jika perlu.
4. Klik `Simpan Jadwal`.

## Cara Upload Gambar Dresscode

Di `/admin-oweek`, bagian `Upload Gambar Dresscode`:

1. Pilih day.
2. Pilih gambar `Do`.
3. Pilih gambar `Don't`.
4. Klik `Upload Gambar`.

File akan disimpan ke:

```txt
public/assets/jadwal/uploads
```

Path akan otomatis masuk ke:

```txt
data/jadwal.json
```

## Batasan Penting

Modul ini tidak memakai database, tetapi tetap memakai server action Next.js untuk menulis file JSON dan upload gambar.

Artinya:

- Cocok untuk local server, VPS, atau Docker dengan volume persistent
- Tidak cocok untuk hosting yang filesystem-nya read-only
- Pada serverless/ephemeral hosting, upload gambar atau edit JSON bisa hilang setelah redeploy/restart

Jika benar-benar hanya front-end tanpa server action sama sekali, browser tidak bisa menulis ke `data/jadwal.json`. Data hanya bisa disimpan di `localStorage`, dan perubahan hanya berlaku di browser user tersebut.

## Penjelasan File Code

`app/jadwal/page.tsx`

Server component untuk halaman publik jadwal. File ini membaca data dari `getJadwal()` lalu mengirim data ke `JadwalViewer`.

`app/jadwal/JadwalViewer.tsx`

Client component untuk UI interaktif. Mengatur state day aktif, tombol Prev/Next, dot indicator, dan popup detail.

`app/jadwal/styles.css`

Styling halaman jadwal, card day, popup, layout dresscode Do/Don't, dan responsive behavior.

`app/login-admin/page.tsx`

Halaman login admin. Mengecek username/password dari environment variable dan membuat cookie session.

`app/admin-oweek/page.tsx`

Halaman admin utama. Berisi server action untuk simpan jadwal, upload gambar, logout, dan guard admin.

`app/admin-oweek/AdminJadwalForm.tsx`

Client component untuk form edit jadwal. Di sini admin bisa tambah day, hapus day, dan edit rundown dari field terpisah.

`app/admin-oweek/styles.css`

Styling admin page, form, upload section, dan field rundown.

`lib/jadwal.ts`

Helper data jadwal. Berisi type data, validasi struktur JSON, fungsi baca JSON, dan fungsi tulis JSON.

`lib/admin-auth.ts`

Helper autentikasi admin. Membuat dan memverifikasi session token dengan HMAC.

`proxy.ts`

Proteksi route `/admin-oweek`. Jika cookie session tidak valid, user diarahkan ke `/login-admin`.

`data/jadwal.json`

File data jadwal yang dibaca halaman publik dan ditulis oleh admin.

`public/assets/jadwal`

Folder untuk gambar dresscode. Subfolder `uploads` dipakai oleh fitur upload admin.

## Checklist Setelah Copy Ke Project Tim

1. Jalankan `npm install`.
2. Pastikan Node.js minimal `20.9.0`.
3. Pastikan path alias `@/*` tersedia.
4. Tambahkan `.env.local`.
5. Jalankan `npm run dev`.
6. Buka `/login-admin`.
7. Login.
8. Edit jadwal di `/admin-oweek`.
9. Cek tampilan di `/jadwal`.
