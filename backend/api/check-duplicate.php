<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once __DIR__ . "/../app/config/database.php";
require_once __DIR__ . "/../app/helpers/response.php";
require_once __DIR__ . "/../app/helpers/AuthMiddleware.php";

$user = AuthMiddleware::check();

$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input['nomor_ijazah']) || !isset($input['file_hash'])) {
    jsonResponse(false, "Nomor ijazah dan file hash wajib diisi");
}

$nomorIjazah = $conn->real_escape_string(trim($input['nomor_ijazah']));
$fileHash = $conn->real_escape_string(trim($input['file_hash']));

try {
    $queryNomor = "SELECT id, nama, sekolah FROM ijazah 
                   WHERE nomor_ijazah = '$nomorIjazah' 
                   AND (is_deleted = 0 OR is_deleted IS NULL)";
    $resultNomor = $conn->query($queryNomor);
    
    if ($resultNomor->num_rows > 0) {
        $existing = $resultNomor->fetch_assoc();
        jsonResponse(false, "Nomor ijazah sudah digunakan oleh: {$existing['nama']} dari {$existing['sekolah']}", [
            'duplicate' => true,
            'type' => 'nomor',
            'existing_data' => $existing
        ]);
    }
    
    $queryHash = "SELECT id, nama, nomor_ijazah, sekolah FROM ijazah 
                  WHERE file_hash = '$fileHash' 
                  AND (is_deleted = 0 OR is_deleted IS NULL)";
    $resultHash = $conn->query($queryHash);
    
    if ($resultHash->num_rows > 0) {
        $existing = $resultHash->fetch_assoc();
        jsonResponse(false, "File yang sama sudah diupload untuk: {$existing['nama']} (Nomor: {$existing['nomor_ijazah']})", [
            'duplicate' => true,
            'type' => 'file',
            'existing_data' => $existing
        ]);
    }
    
    jsonResponse(true, "No duplicate found", [
        'duplicate' => false
    ]);
    
} catch (Exception $e) {
    jsonResponse(false, "Terjadi kesalahan: " . $e->getMessage());
}
