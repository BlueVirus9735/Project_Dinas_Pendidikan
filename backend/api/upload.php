<?php

require_once __DIR__ . '/../app/config/cors.php';

require_once __DIR__ . '/../app/controllers/IjazahController.php';
require_once __DIR__ . '/../app/helpers/AuthMiddleware.php';

$user = AuthMiddleware::check();

$controller = new IjazahController();
$controller->upload($user);
