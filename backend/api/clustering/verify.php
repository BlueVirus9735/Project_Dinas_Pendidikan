<?php
require_once __DIR__ . '/../../app/config/cors.php';

require_once __DIR__ . '/../../app/controllers/ClusteringController.php';
require_once __DIR__ . '/../../app/helpers/AuthMiddleware.php';

AuthMiddleware::check();

$controller = new ClusteringController();
$controller->verify();
?>
