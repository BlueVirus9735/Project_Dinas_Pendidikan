<?php
require_once __DIR__ . '/../app/config/cors.php';
require_once __DIR__ . '/../app/models/StudentModel.php';
require_once __DIR__ . '/../app/helpers/response.php';
require_once __DIR__ . '/../app/helpers/AuthMiddleware.php';

// Authorization check
$user = AuthMiddleware::check();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(false, 'Method not allowed');
}

// Get input data
$input = json_decode(file_get_contents('php://input'), true);

$nisn = $input['nisn'] ?? null;
$nama = $input['nama'] ?? null;
$tanggal_lahir = $input['tanggal_lahir'] ?? null;
$nama_ayah = $input['nama_ayah'] ?? null;
$nama_ibu = $input['nama_ibu'] ?? null;
$nama_wali = $input['nama_wali'] ?? null;
$sekolah_asal = $input['sekolah_asal'] ?? null;
$jenjang = $input['jenjang'] ?? null;

// Validation
if (!$nisn || !$nama || !$tanggal_lahir || !$sekolah_asal) {
    jsonResponse(false, 'Mohon lengkapi semua data wajib (NISN, Nama, Tgl Lahir, Sekolah).');
}

// Enforce School Logic based on Role
if ($user['role'] === 'operator_sekolah') {
    // If logged in as school operator, force the school name from their profile
    $userSekolah = $user['nama_sekolah'] ?? '';
    
    // Optional: Check if user actually has a school name set
    if (!$userSekolah) {
        jsonResponse(false, 'Akun anda tidak memiliki data sekolah terorarisasi.');
    }

    // Override input
    $sekolah_asal = $userSekolah;
}

$model = new StudentModel();

// Check if NISN already exists
$existing = $model->findByNisn($nisn);
if ($existing) {
    jsonResponse(false, 'NISN sudah terdaftar atas nama: ' . $existing['nama']);
}

// Prepare data for model
$studentData = [
    'nisn' => $nisn,
    'nama' => $nama,
    'tanggal_lahir' => $tanggal_lahir,
    'nama_ayah' => $nama_ayah,
    'nama_ibu' => $nama_ibu,
    'nama_wali' => $nama_wali,
    'sekolah_asal' => $sekolah_asal,
    'jenjang' => $jenjang
];

try {
    if ($model->create($studentData)) {
        jsonResponse(true, 'Data siswa berhasil ditambahkan.', $studentData);
    } else {
        jsonResponse(false, 'Gagal menyimpan data siswa.');
    }
} catch (Exception $e) {
    jsonResponse(false, 'Error: ' . $e->getMessage());
}
