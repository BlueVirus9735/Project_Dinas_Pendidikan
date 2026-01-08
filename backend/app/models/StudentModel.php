<?php

require_once __DIR__ . "/../config/database.php";

class StudentModel {

    private $db;
    
    public function __construct() {
        $this->db = Database::connect();
    }

    public function findByNisn($nisn) {
        $stmt = $this->db->prepare("SELECT * FROM students WHERE nisn = :nisn LIMIT 1");
        $stmt->execute([':nisn' => $nisn]);
        return $stmt->fetch();
    }

    public function create($data) {
        $sql = "INSERT INTO students 
        (nisn, nama, tanggal_lahir, nama_ayah, nama_ibu, nama_wali, sekolah_asal, jenjang) 
        VALUES (:nisn, :nama, :tanggal_lahir, :nama_ayah, :nama_ibu, :nama_wali, :sekolah_asal, :jenjang)";

        $stmt = $this->db->prepare($sql);

        return $stmt->execute([
            ":nisn"              => $data["nisn"],
            ":nama"              => $data["nama"],
            ":tanggal_lahir"     => $data["tanggal_lahir"],
            ":nama_ayah"         => $data["nama_ayah"] ?? null,
            ":nama_ibu"          => $data["nama_ibu"] ?? null,
            ":nama_wali"         => $data["nama_wali"] ?? null,
            ":sekolah_asal"      => $data["sekolah_asal"],
            ":jenjang"           => $data["jenjang"] ?? null
        ]);
    }
}
