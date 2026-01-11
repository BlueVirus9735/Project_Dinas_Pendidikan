<?php
require_once __DIR__ . '/../app/config/cors.php';
require_once __DIR__ . '/../app/config/database.php';
require_once __DIR__ . '/../app/helpers/response.php';
require_once __DIR__ . '/../app/helpers/AuthMiddleware.php';

$user = AuthMiddleware::check();
$allowedRoles = ['super_admin', 'admin_ijazah', 'operator_sekolah'];

if (!in_array($user['role'], $allowedRoles)) {
    jsonResponse(false, 'Unauthorized access. You do not have permission to view this data.');
}

$db = Database::connect();

try {
    if ($user['role'] === 'operator_sekolah') {
        $stmt = $db->prepare("SELECT * FROM students WHERE sekolah_asal = :nama_sekolah ORDER BY created_at DESC");
        $stmt->execute([':nama_sekolah' => $user['nama_sekolah']]);
    } else {
        $stmt = $db->query("SELECT * FROM students ORDER BY created_at DESC");
    }
    
    $students = $stmt->fetchAll();

    jsonResponse(true, 'Data Master Siswa', $students);
} catch (Exception $e) {
    jsonResponse(false, 'Error fetching data: ' . $e->getMessage());
}
