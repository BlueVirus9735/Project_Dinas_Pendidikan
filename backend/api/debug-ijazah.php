<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once __DIR__ . "/../app/config/database.php";

// Debug: Check all ijazah data
$query = "SELECT id, nama, nisn, is_deleted, deleted_at, deleted_by, delete_reason FROM ijazah ORDER BY id DESC LIMIT 10";
$result = $conn->query($query);

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode([
    'success' => true,
    'message' => 'Debug data',
    'total_rows' => count($data),
    'data' => $data
], JSON_PRETTY_PRINT);
