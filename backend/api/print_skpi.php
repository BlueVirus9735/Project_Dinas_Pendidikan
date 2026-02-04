<?php
require_once __DIR__ . '/../app/config/cors.php';
header("Content-Type: application/json");

require_once __DIR__ . "/../app/controllers/SkpiController.php";
require_once __DIR__ . "/../app/helpers/ActivityLogger.php";
require_once __DIR__ . "/../app/config/database.php";

$controller = new SkpiController();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $controller->print();
}
?>
