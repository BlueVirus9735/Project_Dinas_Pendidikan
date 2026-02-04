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
        echo json_encode(['success' => false, 'message' => 'Hanya Super Admin yang dapat melihat riwayat aktivitas']);
        exit;
    }
    
    $filters = [];
    
    if (isset($_GET['user_id'])) {
        $filters['user_id'] = intval($_GET['user_id']);
    }
    
    if (isset($_GET['module'])) {
        $filters['module'] = $_GET['module'];
    }
    
    if (isset($_GET['action'])) {
        $filters['action'] = $_GET['action'];
    }
    
    if (isset($_GET['date_from'])) {
        $filters['date_from'] = $_GET['date_from'];
    }
    
    if (isset($_GET['date_to'])) {
        $filters['date_to'] = $_GET['date_to'];
    }
    
    $limit = isset($_GET['limit']) ? intval($_GET['limit']) : 100;
    
    $db = Database::connect();
    $logs = ActivityLogger::getRecentLogs($db, $limit, $filters);
    
    echo json_encode([
        'success' => true,
        'logs' => $logs,
        'count' => count($logs)
    ]);
    
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?>
