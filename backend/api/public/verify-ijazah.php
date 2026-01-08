<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once __DIR__ . "/../../app/config/database.php";
require_once __DIR__ . "/../../app/helpers/response.php";

// NO AUTH REQUIRED - Public endpoint

$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input['nomor_ijazah']) || empty(trim($input['nomor_ijazah']))) {
    jsonResponse(false, "Nomor ijazah wajib diisi");
}

$nomorIjazah = $conn->real_escape_string(trim($input['nomor_ijazah']));

try {
    // Query ijazah - only return verified ijazah, exclude soft deleted
    $query = "SELECT nama, sekolah, tahun, status_verifikasi 
              FROM ijazah 
              WHERE nomor_ijazah = '$nomorIjazah' 
              AND (is_deleted = 0 OR is_deleted IS NULL)
              AND status_verifikasi = 1
              LIMIT 1";
    
    $result = $conn->query($query);
    
    if ($result->num_rows === 0) {
        jsonResponse(false, "Ijazah tidak ditemukan atau belum terverifikasi");
    }
    
    $data = $result->fetch_assoc();
    
    // Return limited data for privacy
    jsonResponse(true, "Ijazah valid dan terverifikasi", [
        'nama' => $data['nama'],
        'sekolah' => $data['sekolah'],
        'tahun' => (string)$data['tahun'],
        'status_verifikasi' => 'terverifikasi',
        'valid' => true
    ]);
    
} catch (Exception $e) {
    jsonResponse(false, "Terjadi kesalahan sistem. Silakan coba lagi.");
}
