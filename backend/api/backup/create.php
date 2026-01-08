<?php
require_once __DIR__ . '/../../app/config/cors.php';

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../../app/config/database.php';
require_once __DIR__ . '/../../app/helpers/AuthMiddleware.php';
require_once __DIR__ . '/../../app/helpers/ActivityLogger.php';

header('Content-Type: application/json');

try {
    // Authenticate user
    $user = AuthMiddleware::check();
    
    if (!$user) {
        throw new Exception('User tidak terautentikasi');
    }
    
    // Check if user is super_admin or admin_ijazah
    if (!in_array($user['role'], ['super_admin', 'admin_ijazah'])) {
        throw new Exception('Anda tidak memiliki akses untuk membuat backup');
    }
    
    // Database configuration
    global $DB_CONFIG;
    
    // Create backups directory if not exists
    $backupDir = __DIR__ . '/../../backups';
    if (!file_exists($backupDir)) {
        @mkdir($backupDir, 0755, true);
    }
    
    // Generate backup filename
    $timestamp = date('Y-m-d_H-i-s');
    $backupFile = $backupDir . '/backup_' . $timestamp . '.sql';
    
    // Try mysqldump first (will fail on Windows without proper PATH)
    $mysqldumpSuccess = false;
    
    if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
        // Windows: Try to find mysqldump in Laragon
        $possiblePaths = [
            'C:\\laragon\\bin\\mysql\\mysql-8.0.30\\bin\\mysqldump.exe',
            'C:\\laragon\\bin\\mysql\\mysql-5.7.33\\bin\\mysqldump.exe',
            'mysqldump' // Try system PATH
        ];
        
        foreach ($possiblePaths as $mysqldumpPath) {
            if (file_exists($mysqldumpPath) || $mysqldumpPath === 'mysqldump') {
                $command = sprintf(
                    '"%s" --user=%s --password=%s --host=%s %s > "%s" 2>&1',
                    $mysqldumpPath,
                    $DB_CONFIG['username'],
                    $DB_CONFIG['password'],
                    $DB_CONFIG['host'],
                    $DB_CONFIG['database'],
                    $backupFile
                );
                
                @exec($command, $output, $returnVar);
                
                if (file_exists($backupFile) && filesize($backupFile) > 1000) {
                    $mysqldumpSuccess = true;
                    break;
                }
            }
        }
    }
    
    // If mysqldump failed or file is too small, use PHP fallback
    if (!$mysqldumpSuccess || !file_exists($backupFile) || filesize($backupFile) < 1000) {
        // Delete failed backup file if exists
        if (file_exists($backupFile)) {
            @unlink($backupFile);
        }
        
        // Create backup using PHP
        $tables = [];
        $result = $conn->query("SHOW TABLES");
        while ($row = $result->fetch_row()) {
            $tables[] = $row[0];
        }
        
        $sqlDump = "-- Database Backup (PHP Method)\n";
        $sqlDump .= "-- Database: " . $DB_CONFIG['database'] . "\n";
        $sqlDump .= "-- Generated: " . date('Y-m-d H:i:s') . "\n\n";
        $sqlDump .= "SET FOREIGN_KEY_CHECKS=0;\n\n";
        
        foreach ($tables as $table) {
            $sqlDump .= "-- --------------------------------------------------------\n";
            $sqlDump .= "-- Table structure for table `$table`\n";
            $sqlDump .= "-- --------------------------------------------------------\n\n";
            
            $sqlDump .= "DROP TABLE IF EXISTS `$table`;\n";
            
            $createTable = $conn->query("SHOW CREATE TABLE `$table`")->fetch_row();
            $sqlDump .= $createTable[1] . ";\n\n";
            
            $rows = $conn->query("SELECT * FROM `$table`");
            if ($rows && $rows->num_rows > 0) {
                $sqlDump .= "-- Dumping data for table `$table`\n\n";
                
                while ($row = $rows->fetch_assoc()) {
                    $values = array_map(function($val) use ($conn) {
                        if ($val === null) return 'NULL';
                        return "'" . $conn->real_escape_string($val) . "'";
                    }, $row);
                    $sqlDump .= "INSERT INTO `$table` VALUES (" . implode(', ', $values) . ");\n";
                }
                $sqlDump .= "\n";
            }
        }
        
        $sqlDump .= "SET FOREIGN_KEY_CHECKS=1;\n";
        
        file_put_contents($backupFile, $sqlDump);
    }
    
    if (!file_exists($backupFile)) {
        throw new Exception('Gagal membuat backup file');
    }
    
    $fileSize = filesize($backupFile);
    $filename = basename($backupFile);
    
    // Log successful backup creation
    ActivityLogger::log($conn, $user, 'backup_create', 'backup', "Membuat backup database: {$filename}");
    
    echo json_encode([
        'success' => true,
        'message' => 'Backup berhasil dibuat',
        'backup' => [
            'filename' => $filename,
            'size' => $fileSize,
            'date' => date('Y-m-d H:i:s')
        ]
    ]);
    
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?>
