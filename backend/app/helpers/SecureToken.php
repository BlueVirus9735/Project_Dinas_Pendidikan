<?php
class SecureToken {
    private static $secretKey = "SI_StikomCirebon_Adji_PengenCepetWisuda:)";

    public static function decode($token) {
        try {
            $decoded = base64_decode($token);
            if ($decoded === false) return null;

            $result = "";
            for ($i = 0; $i < strlen($decoded); $i++) {
                $result .= chr(ord($decoded[$i]) ^ ord(self::$secretKey[$i % strlen(self::$secretKey)]));
            }

            if (!is_numeric($result)) return null;

            return (int)$result;
        } catch (Exception $e) {
            return null;
        }
    }
}
?>
