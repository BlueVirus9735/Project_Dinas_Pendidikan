<?php
require_once __DIR__ . '/../app/config/cors.php';
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once __DIR__ . "/../app/helpers/AuthMiddleware.php";
require_once __DIR__ . "/../app/helpers/response.php";

try {
    // AuthMiddleware::check() akan otomatis return 401 jika token tidak valid atau user tidak ditemukan
    $user = AuthMiddleware::check();
    
    // Jika valid, return data user terbaru
    jsonResponse(true, "Session valid", [
        'user' => $user
    ]);
} catch (Exception $e) {
    // Sebenarnya AuthMiddleware::check() sudah handle exit() jika unauthorized, 
    // tapi catch ini untuk error tak terduga lainnya
    http_response_code(401);
    jsonResponse(false, $e->getMessage());
}
