<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once __DIR__ . "/../app/controllers/SkpiController.php";
require_once __DIR__ . "/../app/helpers/AuthMiddleware.php";
require_once __DIR__ . "/../app/helpers/ActivityLogger.php";
require_once __DIR__ . "/../app/config/database.php";

$user = AuthMiddleware::check();

$controller = new SkpiController();
$action = $_GET['action'] ?? '';

switch ($action) {
    case 'request':
        $controller->request();
        // Log SKPI request
        if ($user && isset($conn)) {
            $id = $_POST['id'] ?? 'unknown';
            ActivityLogger::log($conn, $user, 'skpi_request', 'skpi', "Mengajukan SKPI untuk ijazah ID: {$id}");
        }
        break;
    case 'approve':
        $controller->approve();
        // Log SKPI approval
        if ($user && isset($conn)) {
            $input = json_decode(file_get_contents('php://input'), true);
            $id = $input['id'] ?? 'unknown';
            ActivityLogger::log($conn, $user, 'skpi_approve', 'skpi', "Menyetujui pengajuan SKPI untuk ijazah ID: {$id}");
        }
        break;
    case 'reject':
        $controller->reject();
        // Log SKPI rejection
        if ($user && isset($conn)) {
            $input = json_decode(file_get_contents('php://input'), true);
            $id = $input['id'] ?? 'unknown';
            ActivityLogger::log($conn, $user, 'skpi_reject', 'skpi', "Menolak pengajuan SKPI untuk ijazah ID: {$id}");
        }
        break;
    default:
        http_response_code(400);
        echo json_encode(['error' => 'Invalid Action']);
        break;
}
?>
