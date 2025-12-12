<?php


require_once __DIR__ . '/../app/config/database.php';
require_once __DIR__ . '/../app/controllers/IjazahController.php';

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
