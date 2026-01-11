<?php

require_once __DIR__ . "/../models/IjazahModel.php";
require_once __DIR__ . "/../helpers/response.php";
require_once __DIR__ . "/../helpers/ActivityLogger.php";

class IjazahController {

    public function upload($user = null) {
        if (!isset($_FILES["file"])) {
            jsonResponse(false, "File belum dipilih");
        }

        $nama             = $_POST["nama"];
        $nisn             = $_POST["nisn"];
        $tanggal_lahir    = $_POST["tanggal_lahir"];
        $nama_orang_tua   = $_POST["nama_orang_tua"];
        $tahun            = $_POST["tahun"];
        $nomor_ijazah     = $_POST["nomor_ijazah"] ?? "IJZ-" . rand(100000, 999999);
        $sekolah          = $_POST["sekolah"];
        $file_hash        = $_POST["file_hash"] ?? null;

        if(!$nama || !$nisn || !$tanggal_lahir || !$nama_orang_tua || !$tahun) {
            jsonResponse(false, "Semua field wajib diisi.");
        }

        require_once __DIR__ . "/../models/StudentModel.php";
        $studentModel = new StudentModel();

        $globalStudent = $studentModel->findByNisn($nisn);
        if (!$globalStudent) {
            jsonResponse(false, "Data siswa dengan NISN $nisn tidak ditemukan di database. Pastikan data siswa sudah diinput oleh Operator.");
        }

        if ($user && isset($user['role']) && $user['role'] === 'operator_sekolah' && !empty($user['nama_sekolah'])) {
            $sekolah = $user['nama_sekolah'];
            
            $validStudent = $studentModel->findByNisnAndSchool($nisn, $sekolah);
            
            if (!$validStudent) {
                jsonResponse(false, "Siswa dengan NISN $nisn tidak ditemukan di sekolah Anda ($sekolah).");
            }
        }
    
        $existingIjazah = (new IjazahModel())->findByNisn($nisn);
        if ($existingIjazah) {
            jsonResponse(false, "Ijazah untuk siswa dengan NISN $nisn sudah pernah diterbitkan (Nomor Ijazah: " . $existingIjazah['nomor_ijazah'] . ").");
        }

        $file = $_FILES["file"];
        $ext = strtolower(pathinfo($file["name"], PATHINFO_EXTENSION));

        if (!in_array($ext, ["pdf", "jpg", "jpeg", "png"])) {
            jsonResponse(false, "Format file tidak didukung (hanya PDF/JPG/PNG).");
        }

        $uploadDir = __DIR__ . "/../../uploads/ijazah/";
        if (!is_dir($uploadDir)) {
             mkdir($uploadDir, 0777, true);
        }

        $originalName = pathinfo($file["name"], PATHINFO_FILENAME);
        $safeName = preg_replace('/[^a-zA-Z0-9\-_]/', '', $originalName);
        $filename = uniqid() . "_" . $safeName . "." . $ext;
        $targetFile = $uploadDir . $filename;
        
        $KEY = $nomor_ijazah;
        $fileContent = file_get_contents($file["tmp_name"]);
        
        if (!$file_hash) {
            $file_hash = base64_encode(hash('sha256', $fileContent, true));
        }
        
        $encrypted = "";
        $keyLength = strlen($KEY);
        for ($i = 0; $i < strlen($fileContent); $i++) {
            $encrypted .= $fileContent[$i] ^ $KEY[$i % $keyLength]; // XOR Operation
        }
        $finalData = base64_encode($encrypted); // Base64 Encode

        if (file_put_contents($targetFile, $finalData) === false) {
             jsonResponse(false, "Gagal menyimpan file enkripsi.");
        }

        $model = new IjazahModel();
        try {
            $save = $model->save([
                "nama"              => $nama,
                "nisn"              => $nisn,
                "tanggal_lahir"     => $tanggal_lahir,
                "nama_orang_tua"    => $nama_orang_tua,
                "nomor_ijazah"      => $nomor_ijazah,
                "sekolah"           => $sekolah,
                "tahun"             => $tahun,
                "file_path"         => $filename,
                "file_hash"         => $file_hash
            ]);
            
            if ($save) {
                if ($user) {
                    require_once __DIR__ . '/../config/database.php';
                    global $conn;
                    
                    if (isset($conn)) {
                        ActivityLogger::log(
                            $conn,
                            $user,
                            'ijazah_upload',
                            'ijazah',
                            "Mengupload ijazah untuk siswa: {$nama} (NISN: {$nisn})"
                        );
                    }
                }
                
                jsonResponse(true, "Ijazah berhasil diupload!", ["file" => $filename]);
            } else {
                jsonResponse(false, "Gagal menyimpan ke database.");
            }
        } catch (Exception $e) {
            jsonResponse(false, "Error: " . $e->getMessage());
        }
    }

    public function download($id) {
        $model = new IjazahModel();
        $data = $model->findById($id);

        if (!$data) {
            return null;
        }

        $filePath = __DIR__ . "/../../uploads/ijazah/" . $data['file_path'];
        
        if (!file_exists($filePath)) {
            return null;
        }

        $encryptedBase64 = file_get_contents($filePath);
        
        $encryptedData = base64_decode($encryptedBase64);
        
        $KEY = $data['nomor_ijazah'];
        $decrypted = "";
        $keyLength = strlen($KEY);
        
        for ($i = 0; $i < strlen($encryptedData); $i++) {
            $decrypted .= $encryptedData[$i] ^ $KEY[$i % $keyLength];
        }
        
        return [
            'filename' => $data['file_path'],
            'filedata' => $decrypted
        ];
    }
    
    public function getDetail($id) {
        $model = new IjazahModel();
        $data = $model->findById($id);
        if ($data) {
            jsonResponse(true, "Detail Ijazah", $data);
        } else {
            jsonResponse(false, "Data tidak ditemukan");
        }
    }
}
