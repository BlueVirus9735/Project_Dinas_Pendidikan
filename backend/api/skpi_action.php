<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once __DIR__ . "/../app/controllers/SkpiController.php";

$controller = new SkpiController();
$action = $_GET['action'] ?? '';

switch ($action) {
    case 'request':
        $controller->request();
        break;
    case 'approve':
        $controller->approve();
        break;
    case 'reject':
        $controller->reject();
        break;
    default:
        http_response_code(400);
        echo json_encode(['error' => 'Invalid Action']);
        break;
}
?>
