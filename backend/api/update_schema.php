<?php
header("Content-Type: application/json");
require_once __DIR__ . "/../app/config/database.php";

try {
    $db = Database::connect();
    
    // Check if column exists
    $checkSql = "SHOW COLUMNS FROM data_evaluasi_bos LIKE 'detail_kerusakan'";
    $stmt = $db->query($checkSql);
    $exists = $stmt->fetch();

    if (!$exists) {
        $sql = "ALTER TABLE data_evaluasi_bos ADD COLUMN detail_kerusakan TEXT NULL COMMENT 'JSON string of damage details'";
        $db->exec($sql);
        echo json_encode(["status" => "success", "message" => "Column detail_kerusakan added successfully."]);
    } else {
        echo json_encode(["status" => "success", "message" => "Column detail_kerusakan already exists."]);
    }

} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Database Error: " . $e->getMessage()]);
}
?>
