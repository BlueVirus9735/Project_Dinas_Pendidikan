<?php
require_once __DIR__ . '/../../app/config/cors.php';

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../../app/helpers/AuthMiddleware.php';
require_once __DIR__ . '/../../app/helpers/ActivityLogger.php';

header('Content-Type: application/json');

try {
    // Authenticate user
    $user = AuthMiddleware::check();
    
    if (!$user) {
        throw new Exception('User tidak terautentikasi');
    }
    
    // Check if user is super_admin or admin_ijazah
    if (!in_array($user['role'], ['super_admin', 'admin_ijazah'])) {
        throw new Exception('Anda tidak memiliki akses untuk menghapus backup');
    }
    
    // Get POST data
    $input = json_decode(file_get_contents('php://input'), true);
    $filename = $input['filename'] ?? '';
    
    if (empty($filename)) {
        throw new Exception('Filename harus diisi');
    }
    
    // Validate filename
    if (!preg_match('/^backup_\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2}\.sql$/', $filename)) {
        throw new Exception('Nama file tidak valid');
    }
    
    $backupDir = __DIR__ . '/../../backups';
    $filePath = $backupDir . '/' . $filename;
    
    if (!file_exists($filePath)) {
        throw new Exception('File backup tidak ditemukan');
    }
    
    // Delete file
    if (unlink($filePath)) {
        // Log successful deletion
        ActivityLogger::log($conn, $user, 'backup_delete', 'backup', "Menghapus backup: {$filename}");
        
        echo json_encode([
            'success' => true,
            'message' => 'Backup berhasil dihapus'
        ]);
    } else {
        throw new Exception('Gagal menghapus backup');
    }
    
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?>
