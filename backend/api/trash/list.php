<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once __DIR__ . "/../../app/config/database.php";
require_once __DIR__ . "/../../app/helpers/response.php";
require_once __DIR__ . "/../../app/helpers/AuthMiddleware.php";

// Check super admin access
try {
    $user = AuthMiddleware::check();
    
    if ($user['role'] !== 'super_admin') {
        jsonResponse(false, "Hanya Super Admin yang dapat mengakses trash");
    }
    
    // Check if columns exist (migration check)
    $checkColumns = $conn->query("SHOW COLUMNS FROM ijazah LIKE 'is_deleted'");
    if ($checkColumns->num_rows === 0) {
        jsonResponse(false, "Database migration belum dijalankan. Silakan import soft_delete_migration.sql terlebih dahulu.");
    }
    
    // Get deleted ijazah within 90 days
    $query = "SELECT 
                i.*,
                u.username as deleted_by_username,
                DATEDIFF(NOW(), i.deleted_at) as days_in_trash,
                (90 - DATEDIFF(NOW(), i.deleted_at)) as days_remaining
              FROM ijazah i
              LEFT JOIN users u ON i.deleted_by = u.id
              WHERE i.is_deleted = 1
              ORDER BY i.deleted_at DESC";
    
    $result = $conn->query($query);
    
    if (!$result) {
        throw new Exception("Query gagal: " . $conn->error);
    }
    
    $data = [];
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    
    jsonResponse(true, "Data trash berhasil dimuat", [
        'items' => $data,
        'count' => count($data)
    ]);
    
} catch (Exception $e) {
    jsonResponse(false, $e->getMessage());
}
