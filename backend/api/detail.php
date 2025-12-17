<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once __DIR__ . '/../app/controllers/IjazahController.php';
require_once __DIR__ . '/../app/helpers/AuthMiddleware.php';

AuthMiddleware::check();

$id = $_GET['id'] ?? 0;

$controller = new IjazahController();
$controller->getDetail($id);
