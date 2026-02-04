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
    
    if ($user['role'] !== 'super_admin') {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Hanya Super Admin yang dapat melihat statistik aktivitas']);
        exit;
    }
    
    $db = Database::connect();
    $stats = ActivityLogger::getStats($db);
    
    echo json_encode([
        'success' => true,
        'stats' => $stats
    ]);
    
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?>
