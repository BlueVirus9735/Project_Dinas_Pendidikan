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
    jsonResponse(false, "Hanya Super Admin yang dapat restore ijazah");
}

$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input['id'])) {
    jsonResponse(false, "ID tidak ditemukan");
}

$id = $conn->real_escape_string($input['id']);

try {
    // Get deleted ijazah data
    $query = "SELECT i.*, u.username as deleted_by_username 
              FROM ijazah i
              LEFT JOIN users u ON i.deleted_by = u.id
              WHERE i.id = '$id' AND i.is_deleted = 1";
    
    $result = $conn->query($query);
    
    if ($result->num_rows === 0) {
        jsonResponse(false, "Data tidak ditemukan di trash");
    }
    
    $data = $result->fetch_assoc();
    
    // Restore ijazah
    $stmt = $conn->prepare("UPDATE ijazah SET is_deleted = 0, deleted_at = NULL, deleted_by = NULL, delete_reason = NULL WHERE id = ?");
    $stmt->bind_param("i", $id);
    
    if ($stmt->execute()) {
        // Log restore activity
        ActivityLogger::log(
            $conn,
            $user,
            'ijazah_restore',
            'ijazah',
            "Memulihkan ijazah siswa: {$data['nama']} (NISN: {$data['nisn']}) yang dihapus oleh {$data['deleted_by_username']}"
        );
        
        jsonResponse(true, "Ijazah berhasil dipulihkan", [
            'id' => $id,
            'nama' => $data['nama']
        ]);
    } else {
        jsonResponse(false, "Gagal memulihkan ijazah");
    }
    
    $stmt->close();
    
} catch (Exception $e) {
    jsonResponse(false, $e->getMessage());
}
