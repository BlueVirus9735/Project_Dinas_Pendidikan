<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, OPTIONS");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../app/config/database.php';
require_once __DIR__ . '/../app/controllers/IjazahController.php';
require_once __DIR__ . '/../app/helpers/AuthMiddleware.php';

// Handle token from query parameter
if (isset($_GET['token']) && !isset($_SERVER['HTTP_AUTHORIZATION'])) {
    $_SERVER['HTTP_AUTHORIZATION'] = 'Bearer ' . $_GET['token'];
}

AuthMiddleware::check();

$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($id <= 0) {
    die("ID tidak valid.");
}

// Get file data
$ctrl = new IjazahController($conn);
$res = $ctrl->download($id);

if (!$res || !isset($res['filename']) || !isset($res['filedata'])) {
    die("Data tidak ditemukan atau rusak.");
}

$filename = $res['filename'];
$fileData = $res['filedata'];

// Deteksi MIME type berdasarkan extension
$ext = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
$mimeTypes = [
    'pdf' => 'application/pdf',
    'jpg' => 'image/jpeg',
    'jpeg' => 'image/jpeg',
    'png' => 'image/png',
    'gif' => 'image/gif',
    'doc' => 'application/msword',
    'docx' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

$mimeType = isset($mimeTypes[$ext]) ? $mimeTypes[$ext] : 'application/octet-stream';

// Set headers untuk preview inline (bukan download)
header('Content-Type: ' . $mimeType);
header('Content-Disposition: inline; filename="' . $filename . '"');
header('Content-Length: ' . strlen($fileData));
header('Cache-Control: public, max-age=3600');

echo $fileData;
exit;

