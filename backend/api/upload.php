<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../app/controllers/IjazahController.php';
require_once __DIR__ . '/../app/helpers/AuthMiddleware.php';

AuthMiddleware::check();

$controller = new IjazahController();
$controller->upload();
