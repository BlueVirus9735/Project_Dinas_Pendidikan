<?php
require_once __DIR__ . '/../../app/config/cors.php';

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../../app/config/database.php';
require_once __DIR__ . '/../../app/helpers/AuthMiddleware.php';
require_once __DIR__ . '/../../app/helpers/ActivityLogger.php';

try {
    // Get token from query parameter
    $token = $_GET['token'] ?? '';
    $filename = $_GET['file'] ?? '';
    
    if (empty($token) || empty($filename)) {
        throw new Exception('Token dan filename harus diisi');
    }
    
    // Authenticate user from query token
    $_SERVER['HTTP_AUTHORIZATION'] = 'Bearer ' . $token;
    $user = AuthMiddleware::check();
    
    if (!$user) {
        throw new Exception('User tidak terautentikasi');
    }
    
    // Check if user is super_admin or admin_ijazah
    if (!in_array($user['role'], ['super_admin', 'admin_ijazah'])) {
        throw new Exception('Anda tidak memiliki akses untuk download backup');
    }
    
    // Validate filename (prevent directory traversal)
    if (!preg_match('/^backup_\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2}\.sql$/', $filename)) {
        throw new Exception('Nama file tidak valid');
    }
    
    $backupDir = __DIR__ . '/../../backups';
    $filePath = $backupDir . '/' . $filename;
    
    if (!file_exists($filePath)) {
        throw new Exception('File backup tidak ditemukan');
    }
    
    // Log download action
    ActivityLogger::log($conn, $user, 'backup_download', 'backup', "Download backup: {$filename}");
    
    // Set headers for download
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename="' . $filename . '"');
    header('Content-Length: ' . filesize($filePath));
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    
    // Output file
    readfile($filePath);
    exit();
    
} catch (Exception $e) {
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?>
