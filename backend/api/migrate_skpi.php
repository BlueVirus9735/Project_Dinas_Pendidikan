<?php
require_once __DIR__ . '/../app/config/database.php';

try {
    $db = Database::connect();
    
    // Check if columns exist
    $stmt = $db->query("DESCRIBE ijazah");
    $columns = $stmt->fetchAll(PDO::FETCH_COLUMN);

    if (!in_array('skpi_status', $columns)) {
        echo "Adding skpi_status column...\n";
        $db->exec("ALTER TABLE ijazah ADD COLUMN skpi_status ENUM('none', 'pending', 'approved', 'rejected') DEFAULT 'none' AFTER file_path");
    } else {
        echo "skpi_status column already exists.\n";
    }

    if (!in_array('file_surat_polisi', $columns)) {
        echo "Adding file_surat_polisi column...\n";
        $db->exec("ALTER TABLE ijazah ADD COLUMN file_surat_polisi VARCHAR(255) NULL AFTER skpi_status");
    } else {
        echo "file_surat_polisi column already exists.\n";
    }
    
    echo "Migration completed successfully.\n";

} catch (PDOException $e) {
    die("Migration failed: " . $e->getMessage() . "\n");
}
?>
