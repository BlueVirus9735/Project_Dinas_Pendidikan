<?php
require_once __DIR__ . '/../app/config/cors.php';
require_once __DIR__ . '/../app/helpers/response.php';

// Menghapus cookie dengan mengatur waktu kadaluarsa ke masa lalu
setcookie('token', '', [
    'expires' => time() - 3600,
    'path' => '/',
    'domain' => '',
    'secure' => true,
    'httponly' => true,
    'samesite' => 'Lax'
]);

jsonResponse(true, "Logout berhasil");
