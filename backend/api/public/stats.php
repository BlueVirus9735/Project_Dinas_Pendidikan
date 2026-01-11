<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once __DIR__ . "/../../app/config/database.php";
require_once __DIR__ . "/../../app/helpers/response.php";

try {
    $sekolahQuery = "SELECT COUNT(DISTINCT sekolah) as total FROM ijazah WHERE (is_deleted = 0 OR is_deleted IS NULL)";
    $sekolahResult = $conn->query($sekolahQuery);
    $totalSekolah = $sekolahResult->fetch_assoc()['total'];

    $ijazahQuery = "SELECT COUNT(*) as total FROM ijazah WHERE status_verifikasi = 1 AND (is_deleted = 0 OR is_deleted IS NULL)";
    $ijazahResult = $conn->query($ijazahQuery);
    $totalIjazah = $ijazahResult->fetch_assoc()['total'];

    $totalSiswa = $totalIjazah;

    jsonResponse(true, "Stats berhasil dimuat", [
        'sekolah' => (int)$totalSekolah,
        'arsip' => (int)$totalIjazah,
        'siswa' => (int)$totalSiswa
    ]);

} catch (Exception $e) {
    jsonResponse(false, "Gagal memuat statistik");
}
