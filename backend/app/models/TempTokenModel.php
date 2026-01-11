<?php
class TempTokenModel {
    private $conn;
    private $table = 'temp_tokens';

    public function __construct($db = null) {
        global $conn;
        $this->conn = $db ?? $conn;
    }

    /**
     * Generate temporary token
     */
    public function generateToken($userId, $fileId, $action = 'view', $expiryMinutes = 5) {
        $tempToken = bin2hex(random_bytes(32));
        
        $expiresAt = date('Y-m-d H:i:s', strtotime("+{$expiryMinutes} minutes"));
        
        $stmt = $this->conn->prepare("
            INSERT INTO {$this->table} (temp_token, user_id, file_id, action, expires_at)
            VALUES (?, ?, ?, ?, ?)
        ");
        
        $stmt->bind_param("siiss", $tempToken, $userId, $fileId, $action, $expiresAt);
        
        if ($stmt->execute()) {
            return $tempToken;
        }
        
        return false;
    }

    /**
     * Validate and get token data
     */
    public function validateToken($tempToken, $fileId = null) {
        $query = "
            SELECT * FROM {$this->table}
            WHERE temp_token = ?
            AND expires_at > NOW()
            AND used = 0
        ";
        
        if ($fileId !== null) {
            $query .= " AND file_id = ?";
        }
        
        $stmt = $this->conn->prepare($query);
        
        if ($fileId !== null) {
            $stmt->bind_param("si", $tempToken, $fileId);
        } else {
            $stmt->bind_param("s", $tempToken);
        }
        
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows > 0) {
            return $result->fetch_assoc();
        }
        
        return false;
    }

    /**
     * Mark token as used
     */
    public function markAsUsed($tempToken) {
        $stmt = $this->conn->prepare("
            UPDATE {$this->table}
            SET used = 1
            WHERE temp_token = ?
        ");
        
        $stmt->bind_param("s", $tempToken);
        return $stmt->execute();
    }

    /**
     * Clean up expired tokens
     */
    public function cleanupExpired() {
        $stmt = $this->conn->prepare("
            DELETE FROM {$this->table}
            WHERE expires_at < NOW() OR used = 1
        ");
        
        return $stmt->execute();
    }

    /**
     * Delete token
     */
    public function deleteToken($tempToken) {
        $stmt = $this->conn->prepare("
            DELETE FROM {$this->table}
            WHERE temp_token = ?
        ");
        
        $stmt->bind_param("s", $tempToken);
        return $stmt->execute();
    }
}
