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
require_once __DIR__ . "/../app/helpers/ActivityLogger.php";

// Check auth - only admin_ijazah and super_admin
$user = AuthMiddleware::check();

if (!in_array($user['role'], ['admin_ijazah', 'super_admin'])) {
    jsonResponse(false, "Hanya Admin Ijazah dan Super Admin yang dapat memverifikasi");
}

$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input['id'])) {
    jsonResponse(false, "ID ijazah tidak ditemukan");
}

$id = $conn->real_escape_string($input['id']);

try {
    // Get current ijazah data
    $query = "SELECT * FROM ijazah WHERE id = '$id' AND (is_deleted = 0 OR is_deleted IS NULL)";
    $result = $conn->query($query);
    
    if ($result->num_rows === 0) {
        jsonResponse(false, "Ijazah tidak ditemukan");
    }
    
    $data = $result->fetch_assoc();
    $currentStatus = $data['status_verifikasi'];
    
    // Toggle verification status
    $newStatus = $currentStatus == 1 ? 0 : 1;
    
    $updateQuery = "UPDATE ijazah SET status_verifikasi = $newStatus WHERE id = '$id'";
    
    if ($conn->query($updateQuery)) {
        // Log activity
        $action = $newStatus == 1 ? 'memverifikasi' : 'membatalkan verifikasi';
        ActivityLogger::log(
            $conn,
            $user,
            $newStatus == 1 ? 'ijazah_verify' : 'ijazah_unverify',
            'ijazah',
            "Admin {$action} ijazah siswa: {$data['nama']} (NISN: {$data['nisn']}) dari {$data['sekolah']}"
        );
        
        jsonResponse(true, $newStatus == 1 ? "Ijazah berhasil diverifikasi" : "Verifikasi ijazah dibatalkan", [
            'id' => $id,
            'status_verifikasi' => $newStatus
        ]);
    } else {
        jsonResponse(false, "Gagal mengubah status verifikasi");
    }
    
} catch (Exception $e) {
    jsonResponse(false, "Terjadi kesalahan: " . $e->getMessage());
}
