<?php
class SecureToken {
    private static $secretKey = "DINAS_RAHASIA_2024";

    public static function decode($token) {
        try {
            // Base64 Decode
            $decoded = base64_decode($token);
            if ($decoded === false) return null;

            // XOR Operation
            $result = "";
            for ($i = 0; $i < strlen($decoded); $i++) {
                $result .= chr(ord($decoded[$i]) ^ ord(self::$secretKey[$i % strlen(self::$secretKey)]));
            }

            // Validate if result is numeric ID
            if (!is_numeric($result)) return null;

            return (int)$result;
        } catch (Exception $e) {
            return null;
        }
    }
}
?>
