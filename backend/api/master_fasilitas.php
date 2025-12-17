<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

require_once __DIR__ . "/../app/controllers/MasterFasilitasController.php";

$controller = new MasterFasilitasController();
$controller->index();
?>
