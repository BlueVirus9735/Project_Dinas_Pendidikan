<?php
/**
 * Activity Logger Helper
 * Comprehensive logging system for all user actions
 */

class ActivityLogger {
    
    /**
     * Log an activity
     * 
     * @param mysqli $conn Database connection
     * @param array $user User data (id, username)
     * @param string $action Action type (login, create, update, delete, etc.)
     * @param string $module Module name (auth, ijazah, user, backup, settings)
     * @param string|null $description Detailed description
     * @return bool Success status
     */
    public static function log($conn, $user, $action, $module, $description = null) {
        try {
            $ipAddress = self::getIpAddress();
            
            $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? null;
            
            $stmt = $conn->prepare(
                "INSERT INTO activity_logs (user_id, username, action, module, description, ip_address, user_agent) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)"
            );
            
            if (!$stmt) {
                error_log("ActivityLogger: Failed to prepare statement - " . $conn->error);
                return false;
            }
            
            $userId = $user['id'];
            $username = $user['username'];
            
            $stmt->bind_param(
                "issssss",
                $userId,
                $username,
                $action,
                $module,
                $description,
                $ipAddress,
                $userAgent
            );
            
            $result = $stmt->execute();
            $stmt->close();
            
            return $result;
            
        } catch (Exception $e) {
            error_log("ActivityLogger: Exception - " . $e->getMessage());
            return false;
        }
    }
    
    /**
     * Get recent activity logs with filters
     * 
     * @param mysqli $conn Database connection
     * @param int $limit Number of records
     * @param array $filters Filter options (user_id, module, action, date_from, date_to)
     * @return array Activity logs
     */
    public static function getRecentLogs($conn, $limit = 100, $filters = []) {
        $where = [];
        $params = [];
        $types = "";
        
        if (!empty($filters['user_id'])) {
            $where[] = "user_id = ?";
            $params[] = $filters['user_id'];
            $types .= "i";
        }
        
        if (!empty($filters['module'])) {
            $where[] = "module = ?";
            $params[] = $filters['module'];
            $types .= "s";
        }
        
        if (!empty($filters['action'])) {
            $where[] = "action = ?";
            $params[] = $filters['action'];
            $types .= "s";
        }
        
        if (!empty($filters['date_from'])) {
            $where[] = "created_at >= ?";
            $params[] = $filters['date_from'];
            $types .= "s";
        }
        
        if (!empty($filters['date_to'])) {
            $where[] = "created_at <= ?";
            $params[] = $filters['date_to'];
            $types .= "s";
        }
        
        $sql = "SELECT * FROM activity_logs";
        
        if (!empty($where)) {
            $sql .= " WHERE " . implode(" AND ", $where);
        }
        
        $sql .= " ORDER BY created_at DESC LIMIT ?";
        $params[] = $limit;
        $types .= "i";
        
        $stmt = $conn->prepare($sql);
        
        if (!$stmt) {
            return [];
        }
        
        if (!empty($params)) {
            $stmt->bind_param($types, ...$params);
        }
        
        $stmt->execute();
        $result = $stmt->get_result();
        
        $logs = [];
        while ($row = $result->fetch_assoc()) {
            $logs[] = $row;
        }
        
        $stmt->close();
        
        return $logs;
    }
    
    /**
     * Get activity statistics
     * 
     * @param mysqli $conn Database connection
     * @return array Statistics
     */
    public static function getStats($conn) {
        $stats = [];
        
        $sql = "SELECT COUNT(*) as count FROM activity_logs WHERE DATE(created_at) = CURDATE()";
        $result = $conn->query($sql);
        $stats['today_count'] = $result->fetch_assoc()['count'] ?? 0;
        
        $sql = "SELECT module, COUNT(*) as count FROM activity_logs GROUP BY module ORDER BY count DESC";
        $result = $conn->query($sql);
        $stats['by_module'] = [];
        while ($row = $result->fetch_assoc()) {
            $stats['by_module'][$row['module']] = $row['count'];
        }
        
        $sql = "SELECT username, COUNT(*) as count FROM activity_logs 
                WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY) 
                GROUP BY username ORDER BY count DESC LIMIT 5";
        $result = $conn->query($sql);
        $stats['active_users'] = [];
        while ($row = $result->fetch_assoc()) {
            $stats['active_users'][] = $row;
        }
        
        return $stats;
    }
    
    /**
     * Get client IP address
     * 
     * @return string|null IP address
     */
    private static function getIpAddress() {
        $ipKeys = [
            'HTTP_CLIENT_IP',
            'HTTP_X_FORWARDED_FOR',
            'HTTP_X_FORWARDED',
            'HTTP_X_CLUSTER_CLIENT_IP',
            'HTTP_FORWARDED_FOR',
            'HTTP_FORWARDED',
            'REMOTE_ADDR'
        ];
        
        foreach ($ipKeys as $key) {
            if (array_key_exists($key, $_SERVER) === true) {
                foreach (explode(',', $_SERVER[$key]) as $ip) {
                    $ip = trim($ip);
                    
                    if (filter_var($ip, FILTER_VALIDATE_IP) !== false) {
                        return $ip;
                    }
                }
            }
        }
        
        return $_SERVER['REMOTE_ADDR'] ?? null;
    }
}
?>
