<?php
require_once __DIR__ . '/../models/UserModel.php';
require_once __DIR__ . '/response.php';

class AuthMiddleware {
    public static function check() {
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            http_response_code(200);
            exit();
        }

        $authHeader = null;
        if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
            $authHeader = $_SERVER['HTTP_AUTHORIZATION'];
        } elseif (isset($_SERVER['REDIRECT_HTTP_AUTHORIZATION'])) {
            $authHeader = $_SERVER['REDIRECT_HTTP_AUTHORIZATION'];
        } elseif (function_exists('apache_request_headers')) {
            $headers = apache_request_headers();
            if (isset($headers['Authorization'])) {
                $authHeader = $headers['Authorization'];
            }
        }

        if (!$authHeader && isset($_GET['token'])) {
            $authHeader = 'Bearer ' . $_GET['token'];
        }

        if (!$authHeader) {
            http_response_code(401);
            echo json_encode(['status' => false, 'message' => 'Unauthorized: No token provided']);
            exit();
        }

        if (preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
            $token = $matches[1];
        } else {
            http_response_code(401);
            echo json_encode(['status' => false, 'message' => 'Unauthorized: Invalid token format']);
            exit();
        }

        $decoded = base64_decode($token);
        if (!$decoded || strpos($decoded, ':') === false) {
             http_response_code(401);
             echo json_encode(['status' => false, 'message' => 'Unauthorized: Invalid token']);
             exit();
        }

        $parts = explode(':', $decoded);
        if (count($parts) < 2) {
             http_response_code(401);
             echo json_encode(['status' => false, 'message' => 'Unauthorized: Invalid token structure']);
             exit();
        }
        
        $username = $parts[0];
        $timestamp = $parts[1];

        $userModel = new UserModel();
        $user = $userModel->findByUsername($username);

        if (!$user) {
            http_response_code(401);
            echo json_encode(['status' => false, 'message' => 'Unauthorized: User not found or deleted']);
            exit();
        }

        return $user;
    }
}
