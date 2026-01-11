<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../app/config/database.php';
require_once __DIR__ . '/../app/models/TempTokenModel.php';
require_once __DIR__ . '/../app/helpers/AuthMiddleware.php';
require_once __DIR__ . '/../app/helpers/response.php';

$user = AuthMiddleware::check();

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['file_id']) || !isset($data['action'])) {
    sendResponse(false, "File ID dan action wajib diisi", null, 400);
}

$fileId = intval($data['file_id']);
$action = in_array($data['action'], ['view', 'download']) ? $data['action'] : 'view';

if ($fileId <= 0) {
    sendResponse(false, "File ID tidak valid", null, 400);
}

$tempTokenModel = new TempTokenModel($conn);
$tempToken = $tempTokenModel->generateToken($user['id'], $fileId, $action, 5);

if ($tempToken) {
    sendResponse(true, "Temporary token berhasil dibuat", [
        'temp_token' => $tempToken,
        'expires_in' => 300
    ]);
} else {
    sendResponse(false, "Gagal membuat temporary token", null, 500);
}
