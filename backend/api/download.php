<?php
require_once __DIR__ . '/../app/config/cors.php';
header("Content-Type: application/json");

require_once __DIR__ . '/../app/config/database.php';
require_once __DIR__ . '/../app/controllers/IjazahController.php';
require_once __DIR__ . '/../app/helpers/AuthMiddleware.php';
require_once __DIR__ . '/../app/helpers/ActivityLogger.php';

// No manual token assignment needed, AuthMiddleware handles cookies and tokens correctly.

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

if ($user) {
    $stmt = $conn->prepare("SELECT nama, nisn FROM ijazah WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($ijazahData = $result->fetch_assoc()) {
        ActivityLogger::log(
            Database::connect(),
            $user,
            'ijazah_download',
            'ijazah',
            "Download ijazah siswa: {$ijazahData['nama']} (NISN: {$ijazahData['nisn']})"
        );
    }
    $stmt->close();
}

header('Content-Type: application/octet-stream');
header('Content-Disposition: attachment; filename="' . $filename . '"');
header('Content-Length: ' . strlen($encryptedData));

echo $encryptedData;
exit;

