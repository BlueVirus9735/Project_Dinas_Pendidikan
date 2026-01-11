<?php
require_once __DIR__ . '/../../app/config/cors.php';

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../../app/config/database.php';
require_once __DIR__ . '/../../app/helpers/AuthMiddleware.php';
require_once __DIR__ . '/../../app/helpers/ActivityLogger.php';

header('Content-Type: application/json');

try {
    $user = AuthMiddleware::check();
    
    if (!$user) {
        throw new Exception('User tidak terautentikasi');
    }
    
    if (!in_array($user['role'], ['super_admin', 'admin_ijazah'])) {
        throw new Exception('Anda tidak memiliki akses untuk restore backup');
    }
    
    $input = json_decode(file_get_contents('php://input'), true);
    $filename = $input['filename'] ?? '';
    
    if (empty($filename)) {
        throw new Exception('Filename harus diisi');
    }
    
    if (!preg_match('/^backup_\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2}\.sql$/', $filename)) {
        throw new Exception('Nama file tidak valid');
    }
    
    $backupDir = __DIR__ . '/../../backups';
    $filePath = $backupDir . '/' . $filename;
    
    if (!file_exists($filePath)) {
        throw new Exception('File backup tidak ditemukan');
    }
    
    global $DB_CONFIG;
    
    $command = sprintf(
        'mysql --user=%s --password=%s --host=%s %s < %s 2>&1',
        escapeshellarg($DB_CONFIG['username']),
        escapeshellarg($DB_CONFIG['password']),
        escapeshellarg($DB_CONFIG['host']),
        escapeshellarg($DB_CONFIG['database']),
        escapeshellarg($filePath)
    );
    
    exec($command, $output, $returnVar);
    
    if ($returnVar !== 0) {
        throw new Exception('Gagal restore backup: ' . implode("\n", $output));
    }
    
    ActivityLogger::log($conn, $user, 'backup_restore', 'backup', "RESTORE database dari backup: {$filename} [CRITICAL]");
    
    echo json_encode([
        'success' => true,
        'message' => 'Backup berhasil dipulihkan'
    ]);
    
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?>
