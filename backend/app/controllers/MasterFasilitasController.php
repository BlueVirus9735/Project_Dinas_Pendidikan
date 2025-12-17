<?php
require_once __DIR__ . "/../config/database.php";

class MasterFasilitasController {
    
    public function index() {
        $db = Database::connect();
        $stmt = $db->query("SELECT * FROM master_fasilitas ORDER BY nama_fasilitas ASC");
        $data = $stmt->fetchAll();
        
        echo json_encode([
            "status" => "success",
            "data" => $data
        ]);
    }
}
?>
