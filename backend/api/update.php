<?php
require_once __DIR__ . '/../app/config/cors.php';

require_once "../app/config/database.php";
require_once "../app/helpers/response.php";
require_once "../app/helpers/AuthMiddleware.php";

AuthMiddleware::check();

$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input['id'])) {
    jsonResponse(false, "ID diperlukan untuk update");
}

$id = $input['id'];
$nama = $input['nama'];
$nisn = $input['nisn'];
$nomor_ijazah = $input['nomor_ijazah'];
$sekolah = $input['sekolah'];
$tahun = $input['tahun'];
$ortu = $input['nama_orang_tua'];

$sql = "
UPDATE ijazah SET
    nama='$nama',
    nisn='$nisn',
    nama_orang_tua='$ortu',
    nomor_ijazah='$nomor_ijazah',
    sekolah='$sekolah',
    tahun='$tahun'
WHERE id='$id'
";

if ($conn->query($sql)) {
    jsonResponse(true, "Data berhasil diperbarui");
} else {
    jsonResponse(false, "Gagal update data");
}
