<?php
header("Access-Control-Allow-Origin: *");
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once __DIR__ . "/../app/controllers/DashboardController.php";
require_once __DIR__ . '/../app/helpers/AuthMiddleware.php';

AuthMiddleware::check();

$controller = new DashboardController();
$controller->getStats();
// echo json_encode(["status" => "success", "data" => []]);
?>
