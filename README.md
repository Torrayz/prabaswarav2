# 📘 CV. Prabaswara Gandar Prima — Manual Book & Panduan Deployment

Selamat datang di repositori web company profile **CV. Prabaswara Gandar Prima**. Dokumen ini adalah panduan lengkap (manual book) untuk menjalankan, mengembangkan, dan mendeploy aplikasi ini baik di laptop Anda sendiri, laptop orang lain, maupun server berbasis Docker.

Website ini dibangun menggunakan stack modern:
- **Framework:** Next.js 14 (App Router) + TypeScript
- **Styling:** Tailwind CSS + Framer Motion (untuk animasi UI)
- **Database & Backend:** Supabase (PostgreSQL, row-level-security)
- **Rate Limiting:** Upstash Redis (mencegah spam form kontak)
- **Validasi Data:** Zod

---

## 📑 Daftar Isi
1. [Panduan Menjalankan Secara Lokal (Development)](#1-panduan-menjalankan-secara-lokal-development)
2. [Panduan Jika Ingin Memindahkan Proyek ke Laptop Lain](#2-panduan-jika-ingin-memindahkan-proyek-ke-laptop-lain)
3. [Panduan Menjalankan Melalui Docker (Production/Server)](#3-panduan-menjalankan-melalui-docker-productionserver)
4. [Tanya Jawab / Troubleshooting](#4-tanya-jawab--troubleshooting)

---

## 1. Panduan Menjalankan Secara Lokal (Development)

Mode *Development* digunakan jika Anda ingin mengubah kode sumber (coding) dan ingin melihat perubahannya secara real-time.

### Prasyarat
- **Node.js** versi 18.17 atau yang lebih baru (Disarankan versi 20 LTS).
- **NPM** (biasanya sudah terinstal bersama Node.js).
- **Git** terinstal di laptop Anda.

### Langkah-Langkah:
1. Buka terminal Anda (Command Prompt/PowerShell/Terminal).
2. Arahkan ke folder proyek ini (jika Anda sudah melakukan clone git):
   ```bash
   cd prabaswarav2
   ```
3. Instal semua dependensi:
   ```bash
   npm install
   ```
4. **SANGAT PENTING**: Pastikan Anda memiliki file `.env.local` di dalam root direktori folder dengan isi kredensial yang valid (Supabase URL, Anon Key, dsb). Jika belum, '*Copy*' template dari `.env.example` lalu isi nilainya berdasarkan dashboard Supabase & Upstash:
   ```bash
   cp .env.example .env.local
   ```
   Lalu buka file `.env.local` dan lengkapi nilainya:
   ```ini
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJh......
   SUPABASE_SERVICE_ROLE_KEY=eyJh......
   UPSTASH_REDIS_REST_URL=https://xxxxxxxxx.upstash.io
   UPSTASH_REDIS_REST_TOKEN=ARp.......
   ```
5. Jalankan server Development lokal:
   ```bash
   npm run dev
   ```
6. Buka browser dan kunjungi: **http://localhost:3000**

---

## 2. Panduan Jika Ingin Memindahkan Proyek ke Laptop Lain

Misalnya Anda ingin agar proyek ini dikerjakan oleh developer lain atau Anda ganti laptop, Anda dapat mengikuti cara ini agar tidak terjadi *error dependency*.

1. Dari laptop yang baru, buka aplikasi Terminal.
2. Clone repository git ini:
   ```bash
   git clone <URL_REPOSITORY_ANDA>
   cd prabaswarav2
   ```
3. Lakukan penginstalan package dari awal untuk *environment* laptop yang baru:
   ```bash
   npm install
   ```
4. Karena file kredensial (`.env.local`) itu bersumber rahasia dan **tidak pernah tersimpan di Github (di gitignore)**, maka Anda harus meminta/meng-copy file `.env.local` dari laptop Anda sebelumnya, lalu **menaruhnya manual secara langsung** di dalam folder `prabaswarav2/` di laptop baru tersebut.
5. Jalankan `npm run dev` seperti biasa selesai!

---

## 3. Panduan Menjalankan Melalui Docker (Production/Server)

Docker adalah pilihan terbaik jika Anda ingin menjalankan aplikasi ini di server (seperti VPS Ubuntu/DigitalOcean), ataupun jika di laptop lain Anda malas menginstal Node.js tapi sudah ada Docker terinstal. Metode ini disetel sebagai mode *Production Standalone* yang mandiri dan super cepat.

### Prasyarat
- Memiliki software **Docker** dan **Docker Compose** terinstal di PC/Server.

### Langkah-Langkah Menjalankan via Docker Compose
1. Pastikan Anda sudah memiliki file environment `.env.local`. **Tips Khusus Docker**: Karena `docker-compose` akan membaca `.env` secara default, salin file lokal Anda ke `.env`:
   ```bash
   cp .env.local .env
   ```
2. Jalankan perintah build & up melalui terminal:
   ```bash
   docker-compose up --build -d
   ```
   - `--build`: Instruksi agar Docker membuat image baru (mengcompile Next.js menjadi production mode via `Dockerfile`). Ini memakan waktu beberapa menit.
   - `-d`: Instruksi agar Docker berjalan di latar belakang (*Detached Mode*).
3. Jika sudah berstatus "Started" atau "Running", Anda bisa mengecek website di:
   **http://localhost:3000** (jika di laptop sendiri) atau **http://IP_SERVER:3000** (jika diakses melalui internet).

### Perintah Penting Docker:
- Melihat log aktivitas (untuk debug form kontak error dsb):
  ```bash
  docker logs -f prabaswarav2-web
  ```
- Mematikan server docker:
  ```bash
  docker-compose down
  ```

---

## 4. Tanya Jawab / Troubleshooting

**Q: Saya menambahkan layanan baru melalui Supabase namun gambar layanannya (*Icon/Emoji*) tidak muncul di layar?**
> A: Pastikan URL / emoji layanannya diisi. Namun jika itu terjadi di tampilan "Layanan Kami" (/services), ingat bahwa halaman itu menggunakan ISR (dibersihkan cache-nya tiap 1 jam / `revalidate 3600`). Anda bisa menunggunya sejenak atau me-restart `npm run build` jika sedang Development.

**Q: Seseorang mengeluh form kontaknya tidak bisa ditekan lagi dan error?**
> A: Web ini dilengkapi pengamanan *Upstash Redis Rate Limiter*. Limit form kontak ditujukan **maksimum 5 kali pengiriman pesan dalam batas jangka waktu 10 menit per 1 Alamat IP**. Minta pengguna menunggu sekitar 10 menit lagi. 

**Q: Kenapa saat `docker-compose build` gagal gara-gara variabel Supabase tidak ada?**
> A: Fitur "Static Pages" (SSG) milik Next.js memverifikasi link ketika proses build image docker. Anda wajib memastikan file environment Anda terisi lengkap sebelum di-build, atau variabelnya terekspor di command docker tersebut.

**Q: Bagaimana cara saya merubah Font dan Skema Warna?**
> A: Anda bisa mengubah skema warna dari file `app/globals.css` (di dalam bloc `:root{ --navy: ... }`) serta `tailwind.config.ts`. Untuk mengubah Font dari Google, ada di file `app/layout.tsx` (ubah importnya).
