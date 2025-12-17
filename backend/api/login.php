<?php
require_once __DIR__ . '/../app/config/cors.php';

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../app/controllers/AuthController.php';

$controller = new AuthController();
$controller->login();
