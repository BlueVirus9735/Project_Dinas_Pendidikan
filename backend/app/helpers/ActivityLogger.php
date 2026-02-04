<?php
/**
 * Activity Logger Helper
 * Comprehensive logging system for all user actions
 */

class ActivityLogger {
    
    /**
     * Log an activity
     * 
     * @param PDO $db Database connection
     * @param array $user User data (id, username)
     * @param string $action Action type (login, create, update, delete, etc.)
     * @param string $module Module name (auth, ijazah, user, backup, settings)
     * @param string|null $description Detailed description
     * @return bool Success status
     */
    public static function log($db, $user, $action, $module, $description = null) {
        try {
            $ipAddress = self::getIpAddress();
            $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? null;
            
            $stmt = $db->prepare(
                "INSERT INTO activity_logs (user_id, username, action, module, description, ip_address, user_agent) 
                 VALUES (:user_id, :username, :action, :module, :description, :ip_address, :user_agent)"
            );
            
            return $stmt->execute([
                ':user_id' => $user['id'],
                ':username' => $user['username'],
                ':action' => $action,
                ':module' => $module,
                ':description' => $description,
                ':ip_address' => $ipAddress,
                ':user_agent' => $userAgent
            ]);
            
        } catch (Exception $e) {
            error_log("ActivityLogger: Exception - " . $e->getMessage());
            return false;
        }
    }
    
    /**
     * Get recent activity logs with filters
     * 
     * @param PDO $db Database connection
     * @param int $limit Number of records
     * @param array $filters Filter options (user_id, module, action, date_from, date_to)
     * @return array Activity logs
     */
    public static function getRecentLogs($db, $limit = 100, $filters = []) {
        $where = [];
        $params = [];
        
        if (!empty($filters['user_id'])) {
            $where[] = "user_id = :user_id";
            $params[':user_id'] = $filters['user_id'];
        }
        
        if (!empty($filters['module'])) {
            $where[] = "module LIKE :module";
            $params[':module'] = "%" . $filters['module'] . "%";
        }
        
        if (!empty($filters['action'])) {
            if ($filters['action'] === 'create') {
                $where[] = "(action LIKE :action OR action LIKE :action_alt)";
                $params[':action'] = "%create%";
                $params[':action_alt'] = "%upload%";
            } else {
                $where[] = "action LIKE :action";
                $params[':action'] = "%" . $filters['action'] . "%";
            }
        }
        
        if (!empty($filters['date_from'])) {
            // Menggunakan DATE() untuk memastikan filter tanggal tepat
            $where[] = "DATE(created_at) >= :date_from";
            $params[':date_from'] = $filters['date_from'];
        }
        
        if (!empty($filters['date_to'])) {
            $where[] = "DATE(created_at) <= :date_to";
            $params[':date_to'] = $filters['date_to'];
        }
        
        $sql = "SELECT * FROM activity_logs";
        if (!empty($where)) {
            $sql .= " WHERE " . implode(" AND ", $where);
        }
        $sql .= " ORDER BY created_at DESC LIMIT :limit";
        
        $stmt = $db->prepare($sql);
        
        // Bind limit secara khusus karena PDO butuh integer untuk LIMIT
        foreach ($params as $key => $val) {
            $stmt->bindValue($key, $val);
        }
        $stmt->bindValue(':limit', intval($limit), PDO::PARAM_INT);
        
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    /**
     * Get activity statistics
     * 
     * @param PDO $db Database connection
     * @return array Statistics
     */
    public static function getStats($db) {
        $stats = [];
        
        // Today's total
        $stmt = $db->query("SELECT COUNT(*) as count FROM activity_logs WHERE DATE(created_at) = CURDATE()");
        $stats['today_count'] = $stmt->fetch(PDO::FETCH_ASSOC)['count'] ?? 0;
        
        // Per module
        $stmt = $db->query("SELECT module, COUNT(*) as count FROM activity_logs GROUP BY module ORDER BY count DESC");
        $stats['by_module'] = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $stats['by_module'][$row['module']] = $row['count'];
        }
        
        // Active users (last 7 days)
        $stmt = $db->query("SELECT username, COUNT(*) as count FROM activity_logs 
                            WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY) 
                            GROUP BY username ORDER BY count DESC LIMIT 5");
        $stats['active_users'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        return $stats;
    }
    
    /**
     * Get client IP address
     */
    private static function getIpAddress() {
        $ipKeys = ['HTTP_CLIENT_IP', 'HTTP_X_FORWARDED_FOR', 'HTTP_X_FORWARDED', 'REMOTE_ADDR'];
        foreach ($ipKeys as $key) {
            if (!empty($_SERVER[$key])) {
                foreach (explode(',', $_SERVER[$key]) as $ip) {
                    $ip = trim($ip);
                    if (filter_var($ip, FILTER_VALIDATE_IP)) return $ip;
                }
            }
        }
        return $_SERVER['REMOTE_ADDR'] ?? null;
    }
}
?>
