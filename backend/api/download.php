<?php


require_once __DIR__ . '/../app/config/database.php';
require_once __DIR__ . '/../app/controllers/IjazahController.php';
require_once __DIR__ . '/../app/helpers/AuthMiddleware.php';

// Download might be via direct link (GET), so we need to handle token being passed in URL often, 
// OR simpler: assume frontend downloads via Blob/AJAX with header.
// But for standard <a> href, we might need ?token=XYZ.
// For now, let's stick to Header check if frontend uses Blob method, OR strict check.
// Optimization: If user clicks "Download", frontend should probably fetch with Header.
AuthMiddleware::check();

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

$xorData = base64_decode($encryptedData);

$KEY = "ijazah_dinas_pendidikan";

$decrypted = "";
$keyLength = strlen($KEY);

for ($i = 0; $i < strlen($xorData); $i++) {
    $decrypted .= $xorData[$i] ^ $KEY[$i % $keyLength];
}
header('Content-Type: application/octet-stream');
header('Content-Disposition: attachment; filename="' . $filename . '"');
header('Content-Length: ' . strlen($decrypted));

echo $decrypted;
exit;
