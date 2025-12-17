<?php
header("Content-Type: application/json");
require_once __DIR__ . "/../app/config/database.php";

try {
    $db = Database::connect();
    
    // Create Table
    $sql = "CREATE TABLE IF NOT EXISTS master_fasilitas (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nama_fasilitas VARCHAR(100) NOT NULL,
        nilai_standar INT NOT NULL DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";
    $db->exec($sql);

    // Seed Data if empty
    $check = $db->query("SELECT COUNT(*) FROM master_fasilitas")->fetchColumn();
    if ($check == 0) {
        $data = [
            ['Meja Siswa', 2],
            ['Kursi Siswa', 1],
            ['Papan Tulis', 3],
            ['Jendela/Kaca', 5],
            ['Pintu Kelas', 10],
            ['Atap/Plafon (m2)', 15],
            ['Lantai (m2)', 10],
            ['Lemari Kelas', 5]
        ];
        
        $insert = "INSERT INTO master_fasilitas (nama_fasilitas, nilai_standar) VALUES (?, ?)";
        $stmt = $db->prepare($insert);
        
        foreach ($data as $row) {
            $stmt->execute($row);
        }
    }

    echo json_encode(["status" => "success", "message" => "Master Fasilitas table created and seeded."]);

} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Database Error: " . $e->getMessage()]);
}
?>
