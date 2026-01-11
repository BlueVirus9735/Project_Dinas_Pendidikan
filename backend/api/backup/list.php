<?php
require_once __DIR__ . '/../../app/config/cors.php';

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../../app/helpers/AuthMiddleware.php';

header('Content-Type: application/json');

try {
    $user = AuthMiddleware::check();
    
    if (!$user) {
        throw new Exception('User tidak terautentikasi');
    }
    
    if (!in_array($user['role'], ['super_admin', 'admin_ijazah'])) {
        throw new Exception('Anda tidak memiliki akses untuk melihat backup');
    }
    
    $backupDir = __DIR__ . '/../../backups';
    
    if (!file_exists($backupDir)) {
        echo json_encode([
            'success' => true,
            'backups' => [],
            'totalSize' => 0
        ]);
        exit();
    }
    
    $files = glob($backupDir . '/backup_*.sql');
    $backups = [];
    $totalSize = 0;
    
    foreach ($files as $file) {
        $fileSize = filesize($file);
        $totalSize += $fileSize;
        
        $filename = basename($file);
        preg_match('/backup_(\d{4}-\d{2}-\d{2})_(\d{2}-\d{2}-\d{2})\.sql/', $filename, $matches);
        
        if (count($matches) >= 3) {
            $datePart = $matches[1];
            $timePart = str_replace('-', ':', $matches[2]);
            $dateStr = $datePart . ' ' . $timePart;
        } else {
            $dateStr = date('Y-m-d H:i:s', filemtime($file));
        }
        
        $backups[] = [
            'filename' => $filename,
            'size' => $fileSize,
            'date' => $dateStr,
            'path' => $file
        ];
    }
    
    usort($backups, function($a, $b) {
        return strcmp($b['date'], $a['date']);
    });
    
    echo json_encode([
        'success' => true,
        'backups' => $backups,
        'totalSize' => $totalSize
    ]);
    
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?>
