<?php
require_once __DIR__ . "/../config/database.php";

class SekolahModel {
    private $db;

    public function __construct() {
        $this->db = Database::connect();
    }

    public function getAll() {
        $stmt = $this->db->query("SELECT * FROM sekolah_bos ORDER BY nama_sekolah ASC");
        return $stmt->fetchAll();
    }

    public function create($data) {
        $sql = "INSERT INTO sekolah_bos (nama_sekolah, npsn, alamat, jenjang, jumlah_siswa) VALUES (:nama_sekolah, :npsn, :alamat, :jenjang, :jumlah_siswa)";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([
            ':nama_sekolah' => $data['nama_sekolah'],
            ':npsn'         => $data['npsn'],
            ':alamat'       => $data['alamat'] ?? '',
            ':jenjang'      => $data['jenjang'] ?? 'SD',
            ':jumlah_siswa' => $data['jumlah_siswa'] ?? 0
        ]);
    }

    public function findByNPSN($npsn) {
        $stmt = $this->db->prepare("SELECT * FROM sekolah_bos WHERE npsn = :npsn LIMIT 1");
        $stmt->execute([':npsn' => $npsn]);
        return $stmt->fetch();
    }

    public function find($id) {
        $stmt = $this->db->prepare("SELECT * FROM sekolah_bos WHERE id = :id LIMIT 1");
        $stmt->execute([':id' => $id]);
        return $stmt->fetch();
    }

    public function update($id, $data) {
        $sql = "UPDATE sekolah_bos SET nama_sekolah = :nama_sekolah, alamat = :alamat, jenjang = :jenjang, jumlah_siswa = :jumlah_siswa WHERE id = :id";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([
            ':id'           => $id,
            ':nama_sekolah' => $data['nama_sekolah'],
            ':alamat'       => $data['alamat'] ?? '',
            ':jenjang'      => $data['jenjang'] ?? 'SD',
            ':jumlah_siswa' => $data['jumlah_siswa'] ?? 0
        ]);
    }
}
?>
