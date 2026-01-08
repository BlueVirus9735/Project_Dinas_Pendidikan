<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once __DIR__ . "/../app/controllers/SkpiController.php";
require_once __DIR__ . "/../app/helpers/ActivityLogger.php";
require_once __DIR__ . "/../app/config/database.php";

$controller = new SkpiController();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $controller->print();
}
?>
