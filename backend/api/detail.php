<?php
require_once __DIR__ . "/../../app/config/cors.php";

require_once __DIR__ . '/../app/controllers/IjazahController.php';
require_once __DIR__ . '/../app/helpers/AuthMiddleware.php';

AuthMiddleware::check();

$id = $_GET['id'] ?? 0;

$controller = new IjazahController();
$controller->getDetail($id);
