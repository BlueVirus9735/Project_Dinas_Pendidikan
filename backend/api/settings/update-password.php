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
    $user = AuthMiddleware::check();
    
    if (!$user) {
        throw new Exception('User tidak terautentikasi');
    }
    
    $userId = $user['id'];
    
    $input = json_decode(file_get_contents('php://input'), true);
    $currentPassword = $input['current_password'] ?? '';
    $newPassword = $input['new_password'] ?? '';
    
    if (empty($currentPassword) || empty($newPassword)) {
        throw new Exception('Password lama dan baru harus diisi');
    }
    
    if (strlen($newPassword) < 6) {
        throw new Exception('Password baru minimal 6 karakter');
    }
    
    $stmt = $conn->prepare("SELECT password FROM users WHERE id = ?");
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();
    $userData = $result->fetch_assoc();
    
    if (!$userData) {
        throw new Exception('User tidak ditemukan');
    }
    
    if (!password_verify($currentPassword, $userData['password'])) {
        throw new Exception('Password lama tidak sesuai');
    }
    
    $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);
    $stmt = $conn->prepare("UPDATE users SET password = ? WHERE id = ?");
    $stmt->bind_param("si", $hashedPassword, $userId);
    
    if ($stmt->execute()) {
        ActivityLogger::log($conn, $user, 'password_change', 'settings', 'Mengubah password akun');
        
        echo json_encode([
            'success' => true,
            'message' => 'Password berhasil diubah'
        ]);
    } else {
        throw new Exception('Gagal mengubah password');
    }
    
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?>
