<?php

require_once __DIR__ . '/../app/config/cors.php';
require_once __DIR__ . '/../app/models/StudentModel.php';
require_once __DIR__ . '/../app/helpers/response.php';
require_once __DIR__ . '/../app/helpers/AuthMiddleware.php';

// Optional: Require authentication
// $user = AuthMiddleware::check();

if ($_SERVER['REQUEST_METHOD'] !== 'GET' && $_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(false, 'Method not allowed');
}

$nisn = $_REQUEST['nisn'] ?? null;

if (!$nisn) {
    jsonResponse(false, 'NISN is required');
}

$model = new StudentModel();
$student = $model->findByNisn($nisn);

if ($student) {
    // Determine parent name (Priority: Father > Mother > Guardian)
    $parentName = $student['nama_ayah'] ? $student['nama_ayah'] : ($student['nama_ibu'] ? $student['nama_ibu'] : $student['nama_wali']);

    $responseData = [
        'nama' => $student['nama'],
        'nisn' => $student['nisn'],
        'tanggal_lahir' => $student['tanggal_lahir'],
        'nama_orang_tua' => $parentName,
        'sekolah' => $student['sekolah_asal'],
        'jenjang' => $student['jenjang']
    ];

    jsonResponse(true, 'Student found', $responseData);
} else {
    jsonResponse(false, 'Student not found');
}
