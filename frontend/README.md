# 🎓 Sistem Informasi Dinas Pendidikan (SIPENDIK)

Platform modern untuk pengelolaan **Dana BOS (Bantuan Operasional Sekolah)** dan **Arsip Digital Ijazah**, dilengkapi dengan analisis cerdas menggunakan metode K-Means Clustering.

![Project Status](https://img.shields.io/badge/Status-Active-success)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![Tech](https://img.shields.io/badge/Tech-React%20%7C%20Vite%20%7C%20PHP-violet)

## ✨ Fitur Unggulan

### 💰 Manajemen Dana BOS & K-Means

- **Smart Clustering**: Mengelompokkan sekolah berdasarkan prioritas perbaikan (Tinggi/Sedang/Rendah) menggunakan algoritma **K-Means**.
- **Analisis Multi-Variabel**: Memperhitungkan 5 dimensi data (Siswa, Guru, Rombel, Dana BOS, Kerusakan).
- **Alur Verifikasi Digital**:
  - **Operator Sekolah**: Input & Upload bukti BKU.
  - **Admin/Verifikator**: Review, Approve, atau Reject (dengan catatan revisi).

### 📜 E-Arsip Ijazah Digital

- **Penyimpanan Terpusat**: Digitalisasi ijazah siswa dari SD, SMP, hingga SMA/SMK.
- **Smart Filtering**: Pencarian canggih berdasarkan:
  - Jenjang (SD/SMP/SMA/SMK) _otomatis mendeteksi data database_
  - Nama Sekolah
  - Tahun Lulus
  - Nama Siswa / NISN
- **Akses Aman**: Keamanan file terjamin dengan format penamaan unik.

### 🔐 Keamanan & User Management

Sistem Multi-Role yang terintegrasi:

1. **Super Admin**: Akses penuh ke seluruh sistem.
2. **Admin BOS**: Fokus pada verifikasi dan monitoring dana BOS.
3. **Admin Ijazah**: Pengelola arsip ijazah sekolah.
4. **Operator Sekolah**: Akses terbatas hanya untuk data sekolahnya sendiri (Privacy Protected).

---

## 🛠️ Teknologi yang Digunakan

### Frontend (Client-Side)

- **Framework**: [React.js](https://react.dev/) + [Vite](https://vitejs.dev/) (Super Cepat)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Modern UI)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/) (Visualisasi Data)
- **Alerts**: [SweetAlert2](https://sweetalert2.github.io/)
- **Network**: [Axios](https://axios-http.com/)

### Backend (Server-Side)

- **Language**: PHP Native (REST API Architecture)
- **Database**: MySQL / MariaDB
- **Encryption**: XOR + Base64 (Untuk keamanan file)

---

## 🚀 Panduan Instalasi (Frontend)

Ikuti langkah berikut untuk menjalankan aplikasi di komputer lokal:

### 1. Prasyarat

Pastikan komputer Anda sudah terinstall:

- [Node.js](https://nodejs.org/) (Versi 16 ke atas recommended)
- [Git](https://git-scm.com/)

### 2. Clone & Install

```bash
# Masuk ke folder frontend
cd frontend

# Install dependencies (library)
npm install
```

### 3. Menjalankan Aplikasi

```bash
# Jalankan mode development
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173` (biasanya).

### 4. Build untuk Produksi

Jika ingin menaruh aplikasi di server hosting:

```bash
npm run build
```

---

## 📂 Struktur Project

```
frontend/
├── src/
│   ├── components/  # Komponen UI yang bisa dipakai ulang
│   ├── context/     # AuthProvider (Login logic)
│   ├── layouts/     # Sidebar & Topbar layout
│   ├── pages/       # Halaman utama (Dashboard, DataBOS, dll)
│   ├── services/    # Koneksi ke API Backend
│   └── utils/       # Fungsi bantuan
└── vite.config.js   # Konfigurasi Vite
```

---

## 👨‍💻 Author

Dikembangkan oleh **BlueVirus9735** untuk kebutuhan digitalisasi Dinas Pendidikan.

> _"Pendidikan adalah senjata paling ampuh untuk mengubah dunia."_ - Nelson Mandela
