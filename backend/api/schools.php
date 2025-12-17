<?php
require_once __DIR__ . '/../app/config/cors.php';
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
header("Content-Type: application/json");

require_once __DIR__ . '/../app/models/SekolahModel.php';
require_once __DIR__ . '/../app/helpers/response.php';
require_once __DIR__ . '/../app/helpers/AuthMiddleware.php';

AuthMiddleware::check();
$model = new SekolahModel();
$schools = $model->getAll();

echo json_encode([
    "status" => true,
    "data" => $schools
]);
?>
