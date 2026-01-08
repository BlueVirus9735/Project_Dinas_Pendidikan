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
require_once __DIR__ . '/../app/helpers/ActivityLogger.php';

// Handle token from query parameter
if (isset($_GET['token']) && !isset($_SERVER['HTTP_AUTHORIZATION'])) {
    $_SERVER['HTTP_AUTHORIZATION'] = 'Bearer ' . $_GET['token'];
}

$user = AuthMiddleware::check();

$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($id <= 0) {
    die("ID tidak valid.");
}

$ctrl = new IjazahController($conn);
$res = $ctrl->download($id);

if (!$res || !isset($res['filename']) || !isset($res['filedata'])) {
    die("Data tidak ditemukan atau rusak.");
}

$filename = $res['filename'];
$encryptedData = $res['filedata'];

// Dekripsi file data
$xorData = base64_decode($encryptedData);
$KEY = "ijazah_dinas_pendidikan";
$decrypted = "";
$keyLength = strlen($KEY);

for ($i = 0; $i < strlen($xorData); $i++) {
    $decrypted .= $xorData[$i] ^ $KEY[$i % $keyLength];
}

// Log download activity
if ($user) {
    // Get ijazah data for logging
    $stmt = $conn->prepare("SELECT nama, nisn FROM ijazah WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($ijazahData = $result->fetch_assoc()) {
        ActivityLogger::log(
            $conn,
            $user,
            'ijazah_download',
            'ijazah',
            "Download ijazah siswa: {$ijazahData['nama']} (NISN: {$ijazahData['nisn']})"
        );
    }
    $stmt->close();
}

// Set headers untuk download
header('Content-Type: application/octet-stream');
header('Content-Disposition: attachment; filename="' . $filename . '"');
header('Content-Length: ' . strlen($decrypted));

echo $decrypted;
exit;

