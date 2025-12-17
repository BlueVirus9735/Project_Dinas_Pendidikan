<?php
require_once __DIR__ . '/../app/config/cors.php';
header("Content-Type: application/json");

require_once __DIR__ . "/../app/controllers/MasterFasilitasController.php";

$controller = new MasterFasilitasController();
$controller->index();
?>
