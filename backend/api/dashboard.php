<?php
require_once __DIR__ . '/../app/config/cors.php';
header("Content-Type: application/json; charset=UTF-8");

require_once __DIR__ . "/../app/controllers/DashboardController.php";
require_once __DIR__ . '/../app/helpers/AuthMiddleware.php';

AuthMiddleware::check();

$controller = new DashboardController();
$controller->getStats();
?>
