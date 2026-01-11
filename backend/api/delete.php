<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");

require_once "../app/config/database.php";
require_once "../app/helpers/response.php";
require_once "../app/helpers/AuthMiddleware.php";
require_once "../app/helpers/ActivityLogger.php";

$user = AuthMiddleware::check();

$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input['id'])) {
    jsonResponse(false, "ID tidak ditemukan dalam request");
}

$deleteReason = $input['delete_reason'] ?? null;

if (!$deleteReason || strlen(trim($deleteReason)) < 10) {
    jsonResponse(false, "Alasan penghapusan wajib diisi (minimal 10 karakter)");
}

$id = $conn->real_escape_string($input['id']);

$get = $conn->query("SELECT file_path, nama, nisn FROM ijazah WHERE id='$id' AND (is_deleted = FALSE OR is_deleted IS NULL) LIMIT 1");

if ($get->num_rows === 0) {
    jsonResponse(false, "Data tidak ditemukan atau sudah dihapus");
}

$data = $get->fetch_assoc();

$stmt = $conn->prepare("UPDATE ijazah SET is_deleted = 1, deleted_at = NOW(), deleted_by = ?, delete_reason = ? WHERE id = ?");
$stmt->bind_param("isi", $user['id'], $deleteReason, $id);

if ($stmt->execute()) {
    if ($user) {
        ActivityLogger::log(
            $conn,
            $user,
            'ijazah_delete',
            'ijazah',
            "Menghapus ijazah siswa: {$data['nama']} (NISN: {$data['nisn']}) - Alasan: {$deleteReason}"
        );
    }
    
    jsonResponse(true, "Ijazah berhasil di hapus", [
        "id" => $id,
        "moved_to_trash" => true
    ]);
} else {
    jsonResponse(false, "Gagal menghapus ijazah");
}

$stmt->close();
