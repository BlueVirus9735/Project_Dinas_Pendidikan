<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once __DIR__ . "/../../app/config/database.php";
require_once __DIR__ . "/../../app/helpers/response.php";
require_once __DIR__ . "/../../app/helpers/AuthMiddleware.php";
require_once __DIR__ . "/../../app/helpers/ActivityLogger.php";

// Check super admin access
$user = AuthMiddleware::check();

if ($user['role'] !== 'super_admin') {
    jsonResponse(false, "Hanya Super Admin yang dapat permanent delete");
}

$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input['id'])) {
    jsonResponse(false, "ID tidak ditemukan");
}

$id = $conn->real_escape_string($input['id']);

try {
    // Get deleted ijazah data
    $query = "SELECT * FROM ijazah WHERE id = '$id' AND is_deleted = 1";
    $result = $conn->query($query);
    
    if ($result->num_rows === 0) {
        jsonResponse(false, "Data tidak ditemukan di trash");
    }
    
    $data = $result->fetch_assoc();
    $filePath = "../../uploads/ijazah/" . $data['file_path'];
    
    // PERMANENT DELETE from database
    $conn->query("DELETE FROM ijazah WHERE id='$id'");
    
    // Delete file permanently
    if (file_exists($filePath)) {
        unlink($filePath);
    }
    
    // Log CRITICAL activity
    ActivityLogger::log(
        $conn,
        $user,
        'ijazah_permanent_delete',
        'ijazah',
        "[CRITICAL] PERMANENT DELETE ijazah siswa: {$data['nama']} (NISN: {$data['nisn']}) - File: {$data['file_path']}"
    );
    
    jsonResponse(true, "Ijazah berhasil dihapus permanen", [
        'id' => $id,
        'nama' => $data['nama'],
        'warning' => 'Data tidak dapat dipulihkan'
    ]);
    
} catch (Exception $e) {
    jsonResponse(false, $e->getMessage());
}
