# 🎓 Sistem Informasi Arsip Ijazah Digital (E-Arsip)

**E-Arsip** adalah platform manajemen dokumen kelulusan yang dirancang khusus untuk Dinas Pendidikan. Sistem ini berfokus pada keamanan penyimpanan, validasi integritas dokumen menggunakan AI/Parser, dan efisiensi alur penerbitan Surat Keterangan Pengganti Ijazah (SKPI).

![Stack](https://img.shields.io/badge/Stack-React%20%7C%20PHP%20%7C%20MySQL-blue)
![Security](https://img.shields.io/badge/Security-HttpOnly%20Cookies%20%7C%20Enkripsi%20XOR-green)
![Integrity](https://img.shields.io/badge/Integrity-PdfParser--Check-orange)

---

## 🌟 Fitur Utama

### 1. 📂 Manajemen Arsip Ijazah Digital

- **Smart Indexing**: Pencarian dokumen super cepat berdasarkan NISN, Nama, Sekolah, atau Tahun Kelulusan.
- **🛡️ Integritas Konten (Anti-Manipulation)**: Menggunakan library `smalot/pdfparser` untuk "membaca" isi PDF. Sistem otomatis menolak upload jika konten dokumen sudah ada di database, meskipun file biner telah dimodifikasi (diedit metadata/dikompres).
- **🔐 Cloud Encryption**: Setiap file yang diupload dienkripsi menggunakan algoritma XOR sebelum disimpan di server, memastikan data tidak dapat dibuka secara ilegal.

### 2. 📜 Modul SKPI (Surat Keterangan Pengganti Ijazah)

- **Alur Digital SOP**: Pengajuan dari sekolah -> Lampiran Surat Polisi -> Verifikasi Admin Dinas -> Approval.
- **Secure Printing**: Cetak otomatis dengan penomoran sistem dan token keamanan unik untuk mencegah pemalsuan dokumen fisik.
- **Status Tracking**: Visualisasi status pengajuan (Pending, Approved, Rejected) yang jelas untuk operator sekolah.

### 3. ♻️ Trash Can & Audit Log

- **Soft Delete System**: Fitur "Kotak Sampah" untuk memulihkan ijazah yang tidak sengaja terhapus.
- **Activity Logger**: Pencatatan setiap aksi admin (Login, View, Download, Delete) sebagai fungsi audit trail yang transparan.

---

## 🛠️ Arsitektur & Teknologi

### 🌐 Frontend (React Ecosystem)

- **Engine**: React 18 dengan Vite (Pemuatan super cepat).
- **UI Architecture**: Premium Glassmorphism Design menggunakan Tailwind CSS.
- **State Management**: Context API untuk manajemen autentikasi global.
- **APIs**: Axios Interceptor untuk penanganan kredensial cookie otomatis.

### ⚙️ Backend (PHP RESTful API)

- **Core**: PHP Native dengan pola arsitektur MVC (Model-View-Controller).
- **Security Logic**:
  - **HttpOnly Cookies**: JWT disimpan di level browser yang tidak bisa diakses JavaScript (Proteksi XSS).
  - **PDO Statements**: Proteksi penuh terhadap SQL Injection.
  - **CORS Management**: Integrasi lintas origin yang aman antara frontend dan backend.
- **Libraries**:
  - `smalot/pdfparser` untuk validasi konten dokumen.
  - `firebase/php-jwt` untuk sistem keamanan sesi.

---

## 🚀 Panduan Instalasi & Penggunaan

### 1. Persiapan Lingkungan

- **PHP**: Versi 8.1 atau lebih tinggi.
- **Database**: MySQL / MariaDB.
- **Tools**: Composer & Node.js (npm).

### 2. Konfigurasi Backend

```bash
cd backend
composer install
```

- Konfigurasi database di `backend/app/config/database.php`.
- Pastikan folder `backend/uploads/ijazah` memiliki izin tulis (writeable).

### 3. Konfigurasi Frontend

```bash
cd frontend
npm install
```

- Pastikan URL API di `frontend/src/services/api.js` mengarah ke server backend Anda.

### 4. Menjalankan Sistem

Di direktori utama (root), jalankan:

```bash
npm run full
```

_Perintah ini akan menyalakan server Frontend (Vite) dan memastika koneksi Backend siap digunakan._

---

## 🔐 Keamanan & Hak Akses

- **Super Admin**: Akses penuh ke seluruh sistem, audit log, dan manajemen user.
- **Admin Ijazah**: Fokus pada verifikasi pengajuan SKPI dan manajemen arsip.
- **Operator Sekolah**: Akses terbatas untuk input dan monitoring data sekolah masing-masing.

---

## 🔐 Deep Dive: Sistem Keamanan Dokumen (XOR & Base64)

Untuk menjamin kerahasiaan dokumen, E-Arsip menggunakan kombinasi **XOR Cipher** dan **Base64 Encoding** sebelum file disimpan ke server.

### 1. 🔑 XOR Encryption (Symmetric Cipher)

Sistem menggunakan operasi bitwise XOR (`^`) antara byte file asli dengan kunci rahasia.

- **Kunci Rahasia**: Menggunakan `nomor_ijazah` siswa. Ini berarti setiap ijazah didekripsi dengan kunci yang unik.
- **Logika**: `Data Asli ^ Kunci = Data Terenkripsi`.
- **Keunggulan**: Sangat ringan (performa tinggi) dan bersifat _reversible_ (timbal balik). Untuk mengembalikan file asli, sistem cukup melakukan XOR kembali dengan kunci yang sama: `Data Terenkripsi ^ Kunci = Data Asli`.

### 2. 📦 Base64 Encoding

Hasil dari operasi XOR adalah data biner mentah yang seringkali mengandung karakter non-printable yang bisa merusak struktur file atau database.

- **Fungsi**: Mengonversi data biner hasil enkripsi menjadi string karakter ASCII yang aman (A-Z, a-z, 0-9, +, /).
- **Tujuan**: Memastikan data terenkripsi dapat disimpan sebagai teks biasa (`.txt` terselubung) di server tanpa risiko korupsi data saat proses transfer atau penyimpanan.

---

> [!IMPORTANT]
> Dengan kombinasi ini, meskipun seseorang berhasil membobol folder `uploads/ijazah`, mereka hanya akan menemukan string teks acak yang tidak bisa dibuka tanpa mengetahui kunci `nomor_ijazah` yang tepat untuk setiap file.

---

© 2026 Dinas Pendidikan - "Digitalisasi Arsip untuk Integritas Pendidikan."
