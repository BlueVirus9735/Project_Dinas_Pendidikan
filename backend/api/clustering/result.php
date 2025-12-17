<?php
require_once __DIR__ . "/../../app/config/cors.php";

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}


require_once __DIR__ . "/../../app/controllers/ClusteringController.php";
require_once __DIR__ . '/../../app/helpers/AuthMiddleware.php';

AuthMiddleware::check();

$controller = new ClusteringController();
$controller->results();
?>
