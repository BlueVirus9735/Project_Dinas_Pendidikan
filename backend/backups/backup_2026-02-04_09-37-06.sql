-- Database Backup (PHP Method)
-- Database: ijazah_disdik_cirebon
-- Generated: 2026-02-04 09:37:07

SET FOREIGN_KEY_CHECKS=0;

-- --------------------------------------------------------
-- Table structure for table `activity_logs`
-- --------------------------------------------------------

DROP TABLE IF EXISTS `activity_logs`;
CREATE TABLE `activity_logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `username` varchar(100) NOT NULL,
  `action` varchar(50) NOT NULL COMMENT 'login, logout, create, update, delete, download, view, restore',
  `module` varchar(50) NOT NULL COMMENT 'auth, ijazah, user, backup, settings',
  `description` text COMMENT 'Detailed description of the action',
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_action` (`action`),
  KEY `idx_module` (`module`),
  KEY `idx_created_at` (`created_at`)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Activity logging for audit trail';

-- Dumping data for table `activity_logs`

INSERT INTO `activity_logs` VALUES ('45', '45', 'kusuma', 'ijazah_upload', 'ijazah', 'Mengupload ijazah untuk siswa: Aninda Puspita (NISN: 14622703)', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0', '2026-01-09 01:46:56');
INSERT INTO `activity_logs` VALUES ('46', '9', 'super admin', 'ijazah_verify', 'ijazah', 'Admin memverifikasi ijazah siswa: Aninda Puspita (NISN: 14622703) dari SDN PRUNGGAHAN', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0', '2026-01-09 02:22:17');
INSERT INTO `activity_logs` VALUES ('47', '51', 'pasidi', 'ijazah_upload', 'ijazah', 'Mengupload ijazah untuk siswa: Adji Dwi Cipta Teja Kusuma (NISN: 14622717)', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '2026-01-09 03:27:12');
INSERT INTO `activity_logs` VALUES ('48', '9', 'super admin', 'ijazah_verify', 'ijazah', 'Admin memverifikasi ijazah siswa: Adji Dwi Cipta Teja Kusuma (NISN: 14622717) dari SDN WODI', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0', '2026-01-09 03:27:23');
INSERT INTO `activity_logs` VALUES ('49', '51', 'pasidi', 'skpi_request', 'skpi', 'Mengajukan SKPI untuk ijazah ID: 54', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '2026-01-09 04:02:06');
INSERT INTO `activity_logs` VALUES ('50', '52', 'admin ijazah', 'skpi_approve', 'skpi', 'Menyetujui pengajuan SKPI untuk ijazah ID: 54', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0', '2026-01-09 04:02:34');
INSERT INTO `activity_logs` VALUES ('51', '9', 'super admin', 'ijazah_unverify', 'ijazah', 'Admin membatalkan verifikasi ijazah siswa: Aninda Puspita (NISN: 14622703) dari SDN PRUNGGAHAN', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0', '2026-01-09 09:21:11');
INSERT INTO `activity_logs` VALUES ('52', '9', 'super admin', 'ijazah_verify', 'ijazah', 'Admin memverifikasi ijazah siswa: Aninda Puspita (NISN: 14622703) dari SDN PRUNGGAHAN', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0', '2026-01-09 09:21:15');
INSERT INTO `activity_logs` VALUES ('53', '51', 'pasidi', 'ijazah_delete', 'ijazah', 'Menghapus ijazah siswa: Adji Dwi Cipta Teja Kusuma (NISN: 14622717) - Alasan: SAYA TIDAK SUKA DIATUR', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '2026-01-09 09:22:07');
INSERT INTO `activity_logs` VALUES ('54', '9', 'super admin', 'ijazah_permanent_delete', 'ijazah', '[CRITICAL] PERMANENT DELETE ijazah siswa: Adji Dwi Cipta Teja Kusuma (NISN: 14622717) - File: 696013204603d_jurnalxor.pdf', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0', '2026-01-09 09:22:46');
INSERT INTO `activity_logs` VALUES ('55', '9', 'super admin', 'ijazah_unverify', 'ijazah', 'Admin membatalkan verifikasi ijazah siswa: Aninda Puspita (NISN: 14622703) dari SDN PRUNGGAHAN', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0', '2026-01-11 18:33:04');
INSERT INTO `activity_logs` VALUES ('56', '9', 'super admin', 'ijazah_verify', 'ijazah', 'Admin memverifikasi ijazah siswa: Aninda Puspita (NISN: 14622703) dari SDN PRUNGGAHAN', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0', '2026-01-11 18:33:15');
INSERT INTO `activity_logs` VALUES ('57', '9', 'super admin', 'ijazah_download', 'ijazah', 'Download ijazah siswa: Aninda Puspita (NISN: 14622703)', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0', '2026-01-11 18:35:57');
INSERT INTO `activity_logs` VALUES ('58', '9', 'super admin', 'ijazah_download', 'ijazah', 'Download ijazah siswa: Aninda Puspita (NISN: 14622703)', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0', '2026-01-11 18:35:58');
INSERT INTO `activity_logs` VALUES ('59', '45', 'kusuma', 'skpi_request', 'skpi', 'Mengajukan SKPI untuk ijazah ID: 53', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '2026-01-11 18:42:47');
INSERT INTO `activity_logs` VALUES ('60', '9', 'super admin', 'skpi_approve', 'skpi', 'Menyetujui pengajuan SKPI untuk ijazah ID: 53', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0', '2026-01-11 18:43:05');
INSERT INTO `activity_logs` VALUES ('61', '45', 'kusuma', 'ijazah_delete', 'ijazah', 'Menghapus ijazah siswa: Aninda Puspita (NISN: 14622703) - Alasan: scbksdcbkdsbcks', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '2026-01-11 19:11:52');
INSERT INTO `activity_logs` VALUES ('62', '9', 'super admin', 'ijazah_permanent_delete', 'ijazah', '[CRITICAL] PERMANENT DELETE ijazah siswa: Aninda Puspita (NISN: 14622703) - File: 695ffba02cd01_proposalku.pdf', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0', '2026-01-11 19:12:04');
INSERT INTO `activity_logs` VALUES ('63', '51', 'pasidi', 'ijazah_upload', 'ijazah', 'Mengupload ijazah untuk siswa: Adji Dwi Cipta Teja Kusuma (NISN: 14622717)', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '2026-01-11 19:28:11');
INSERT INTO `activity_logs` VALUES ('64', '51', 'pasidi', 'ijazah_upload', 'ijazah', 'Mengupload ijazah untuk siswa: Adji Dwi Cipta Teja Kusuma (NISN: 14622717)', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '2026-01-11 19:28:38');
INSERT INTO `activity_logs` VALUES ('65', '51', 'pasidi', 'ijazah_delete', 'ijazah', 'Menghapus ijazah siswa: Adji Dwi Cipta Teja Kusuma (NISN: 14622717) - Alasan: kontol bapak kau pecah', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '2026-01-11 19:32:07');
INSERT INTO `activity_logs` VALUES ('66', '9', 'super admin', 'ijazah_permanent_delete', 'ijazah', '[CRITICAL] PERMANENT DELETE ijazah siswa: Adji Dwi Cipta Teja Kusuma (NISN: 14622717) - File: 69639775be85e_ID6558.pdf', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0', '2026-01-11 19:32:18');
INSERT INTO `activity_logs` VALUES ('67', '9', 'super admin', 'ijazah_verify', 'ijazah', 'Admin memverifikasi ijazah siswa: Adji Dwi Cipta Teja Kusuma (NISN: 14622717) dari SDN WODI', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0', '2026-01-12 00:02:09');
INSERT INTO `activity_logs` VALUES ('68', '9', 'super admin', 'ijazah_download', 'ijazah', 'Download ijazah siswa: Adji Dwi Cipta Teja Kusuma (NISN: 14622717)', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0', '2026-01-12 00:06:17');
INSERT INTO `activity_logs` VALUES ('69', '9', 'super admin', 'ijazah_download', 'ijazah', 'Download ijazah siswa: Adji Dwi Cipta Teja Kusuma (NISN: 14622717)', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0', '2026-01-12 00:06:17');
INSERT INTO `activity_logs` VALUES ('70', '9', 'super admin', 'ijazah_download', 'ijazah', 'Download ijazah siswa: Adji Dwi Cipta Teja Kusuma (NISN: 14622717)', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0', '2026-01-12 00:06:54');
INSERT INTO `activity_logs` VALUES ('71', '9', 'super admin', 'ijazah_download', 'ijazah', 'Download ijazah siswa: Adji Dwi Cipta Teja Kusuma (NISN: 14622717)', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0', '2026-01-12 00:06:54');
INSERT INTO `activity_logs` VALUES ('72', '9', 'super admin', 'ijazah_download', 'ijazah', 'Download ijazah siswa: Adji Dwi Cipta Teja Kusuma (NISN: 14622717)', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0', '2026-01-12 00:07:16');
INSERT INTO `activity_logs` VALUES ('73', '9', 'super admin', 'ijazah_download', 'ijazah', 'Download ijazah siswa: Adji Dwi Cipta Teja Kusuma (NISN: 14622717)', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0', '2026-01-12 00:07:16');
INSERT INTO `activity_logs` VALUES ('74', '51', 'pasidi', 'skpi_request', 'skpi', 'Mengajukan SKPI untuk ijazah ID: 55', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '2026-01-12 00:18:35');
INSERT INTO `activity_logs` VALUES ('75', '9', 'super admin', 'skpi_approve', 'skpi', 'Menyetujui pengajuan SKPI untuk ijazah ID: 55', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0', '2026-01-12 00:18:52');
INSERT INTO `activity_logs` VALUES ('76', '9', 'super admin', 'ijazah_download', 'ijazah', 'Download ijazah siswa: Adji Dwi Cipta Teja Kusuma (NISN: 14622717)', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0', '2026-01-12 00:23:25');
INSERT INTO `activity_logs` VALUES ('77', '9', 'super admin', 'ijazah_download', 'ijazah', 'Download ijazah siswa: Adji Dwi Cipta Teja Kusuma (NISN: 14622717)', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0', '2026-01-12 00:23:25');
INSERT INTO `activity_logs` VALUES ('78', '9', 'super admin', 'backup_delete', 'backup', 'Menghapus backup: backup_2026-01-08_14-50-56.sql', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0', '2026-01-12 00:27:09');
INSERT INTO `activity_logs` VALUES ('79', '9', 'super admin', 'backup_delete', 'backup', 'Menghapus backup: backup_2026-01-08_04-36-03.sql', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0', '2026-01-12 00:27:12');
INSERT INTO `activity_logs` VALUES ('80', '51', 'pasidi', 'ijazah_upload', 'ijazah', 'Mengupload ijazah untuk siswa: Supriyadi (NISN: 14622704)', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '2026-01-12 00:36:35');
INSERT INTO `activity_logs` VALUES ('81', '9', 'super admin', 'ijazah_verify', 'ijazah', 'Admin memverifikasi ijazah siswa: Supriyadi (NISN: 14622704) dari SDN WODI', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0', '2026-01-12 00:36:48');
INSERT INTO `activity_logs` VALUES ('82', '9', 'super admin', 'ijazah_download', 'ijazah', 'Download ijazah siswa: Supriyadi (NISN: 14622704)', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0', '2026-01-12 00:36:56');
INSERT INTO `activity_logs` VALUES ('83', '9', 'super admin', 'ijazah_download', 'ijazah', 'Download ijazah siswa: Supriyadi (NISN: 14622704)', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0', '2026-01-12 00:36:56');
INSERT INTO `activity_logs` VALUES ('84', '9', 'super admin', 'ijazah_download', 'ijazah', 'Download ijazah siswa: Supriyadi (NISN: 14622704)', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0', '2026-01-12 00:37:11');
INSERT INTO `activity_logs` VALUES ('85', '9', 'super admin', 'ijazah_download', 'ijazah', 'Download ijazah siswa: Supriyadi (NISN: 14622704)', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0', '2026-01-12 00:37:11');
INSERT INTO `activity_logs` VALUES ('86', '9', 'super admin', 'ijazah_upload', 'ijazah', 'Mengupload ijazah untuk siswa: Anam Sahwat (NISN: 12345678)', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0', '2026-01-12 00:47:12');
INSERT INTO `activity_logs` VALUES ('87', '9', 'super admin', 'ijazah_verify', 'ijazah', 'Admin memverifikasi ijazah siswa: Anam Sahwat (NISN: 12345678) dari SDN WODI', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0', '2026-01-12 00:47:20');
INSERT INTO `activity_logs` VALUES ('88', '45', 'kusuma', 'ijazah_upload', 'ijazah', 'Mengupload ijazah untuk siswa: kiu (NISN: 9999999)', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '2026-01-12 01:06:37');
INSERT INTO `activity_logs` VALUES ('89', '9', 'super admin', 'ijazah_verify', 'ijazah', 'Admin memverifikasi ijazah siswa: kiu (NISN: 9999999) dari SDN PRUNGGAHAN', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0', '2026-01-12 01:06:57');
INSERT INTO `activity_logs` VALUES ('90', '9', 'super admin', 'ijazah_download', 'ijazah', 'Download ijazah siswa: Anam Sahwat (NISN: 12345678)', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0', '2026-01-12 01:07:19');
INSERT INTO `activity_logs` VALUES ('91', '9', 'super admin', 'ijazah_download', 'ijazah', 'Download ijazah siswa: Anam Sahwat (NISN: 12345678)', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0', '2026-01-12 01:07:19');
INSERT INTO `activity_logs` VALUES ('92', '51', 'pasidi', 'ijazah_upload', 'ijazah', 'Mengupload ijazah untuk siswa: Aswi (NISN: 1234567)', '125.164.22.79', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36', '2026-01-28 19:39:34');
INSERT INTO `activity_logs` VALUES ('93', '51', 'pasidi', 'ijazah_upload', 'ijazah', 'Mengupload ijazah untuk siswa: Gaguk (NISN: 5151515)', '125.164.21.86', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-01-28 19:57:53');
INSERT INTO `activity_logs` VALUES ('94', '51', 'pasidi', 'ijazah_upload', 'ijazah', 'Mengupload ijazah untuk siswa: Guntur (NISN: 666)', '125.164.21.86', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-01-28 19:59:33');
INSERT INTO `activity_logs` VALUES ('95', '9', 'super admin', 'ijazah_verify', 'ijazah', 'Admin memverifikasi ijazah siswa: Guntur (NISN: 666) dari SDN WODI', '125.164.23.251', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 Edg/144.0.0.0', '2026-01-28 20:07:32');
INSERT INTO `activity_logs` VALUES ('96', '9', 'super admin', 'ijazah_verify', 'ijazah', 'Admin memverifikasi ijazah siswa: Gaguk (NISN: 5151515) dari SDN WODI', '125.164.23.251', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 Edg/144.0.0.0', '2026-01-28 20:07:46');
INSERT INTO `activity_logs` VALUES ('97', '9', 'super admin', 'ijazah_verify', 'ijazah', 'Admin memverifikasi ijazah siswa: Aswi (NISN: 1234567) dari SDN WODI', '125.164.23.251', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 Edg/144.0.0.0', '2026-01-28 20:07:53');
INSERT INTO `activity_logs` VALUES ('98', '51', 'pasidi', 'ijazah_upload', 'ijazah', 'Mengupload ijazah untuk siswa: asep (NISN: 3333)', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36', '2026-02-04 15:52:00');
INSERT INTO `activity_logs` VALUES ('99', '9', 'super admin', 'ijazah_verify', 'ijazah', 'Admin memverifikasi ijazah siswa: asep (NISN: 3333) dari SDN WODI', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 Edg/144.0.0.0', '2026-02-04 15:52:56');

-- --------------------------------------------------------
-- Table structure for table `ijazah`
-- --------------------------------------------------------

DROP TABLE IF EXISTS `ijazah`;
CREATE TABLE `ijazah` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama` varchar(255) NOT NULL,
  `nisn` varchar(20) NOT NULL,
  `tanggal_lahir` date NOT NULL,
  `nama_orang_tua` varchar(255) NOT NULL,
  `nomor_ijazah` varchar(100) NOT NULL,
  `sekolah` varchar(255) NOT NULL,
  `tahun` int NOT NULL,
  `status_verifikasi` tinyint(1) DEFAULT '0',
  `file_path` text NOT NULL,
  `file_hash` varchar(255) DEFAULT NULL,
  `skpi_status` enum('none','pending','approved','rejected') DEFAULT 'none',
  `file_surat_polisi` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `is_deleted` tinyint(1) DEFAULT '0' COMMENT 'Flag untuk soft delete',
  `deleted_at` timestamp NULL DEFAULT NULL COMMENT 'Timestamp kapan dihapus',
  `deleted_by` int DEFAULT NULL COMMENT 'User ID yang menghapus',
  `delete_reason` text COMMENT 'Alasan penghapusan (mandatory)',
  PRIMARY KEY (`id`),
  KEY `idx_is_deleted` (`is_deleted`),
  KEY `idx_deleted_at` (`deleted_at`),
  KEY `idx_file_hash` (`file_hash`),
  KEY `idx_nomor_ijazah` (`nomor_ijazah`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table `ijazah`

INSERT INTO `ijazah` VALUES ('55', 'Adji Dwi Cipta Teja Kusuma', '14622717', '2002-10-31', 'Ciptono', 'DC-XNXX-XHAMSTER', 'SDN WODI', '2024', '1', '6963975b5d324_Diagramalur.png', 'xGJllfIkSkEdviTz235/LRdOve79nq8I/eHHAhQ3i60=', 'approved', 'uploads/skpi/SKPI_55_000799e851e5cc43.pdf', '2026-01-11 19:28:11', '0', NULL, NULL, NULL);
INSERT INTO `ijazah` VALUES ('57', 'Supriyadi', '14622704', '2002-01-31', 'Honda', '89478478', 'SDN WODI', '2024', '1', '6963dfa32300a_Aplikasi_Mobile_Untuk_Enkripsi_Data_Gamb.pdf', 'fL1lCjyIxCNQMWu6G9tlnK5O3KbImqKmfHR3UfEDZt8=', 'none', NULL, '2026-01-12 00:36:35', '0', NULL, NULL, NULL);
INSERT INTO `ijazah` VALUES ('58', 'Anam Sahwat', '12345678', '2026-01-01', 'Honda', 'cncncncn', 'SDN WODI', '2019', '1', '6963e21fcc300_6_new_RancangBangunLibraryWebTokenuntukEnkripsiHTTPDataMenggunakanEksklusif-ORXOR.pdf', 'V68KEJnfvjokvlMvsnLCxQ3FyiwyUEj1yeUtC6Oha9k=', 'none', NULL, '2026-01-12 00:47:12', '0', NULL, NULL, NULL);
INSERT INTO `ijazah` VALUES ('59', 'kiu', '9999999', '2000-12-13', 'ayah', 'mmmm', 'SDN PRUNGGAHAN', '2024', '1', '6963e6ad483a4_jurnalxor.pdf', 'at+YJ4mYkJ6DaK/yVm3uqKafrKRVhnfRNv4JCBjB8G4=', 'none', NULL, '2026-01-12 01:06:37', '0', NULL, NULL, NULL);
INSERT INTO `ijazah` VALUES ('60', 'Aswi', '1234567', '2026-01-27', 'brawi', 'xnxnxnxn', 'SDN WODI', '2002', '1', '697a038677ab9_SK_Penetapan_Semua_Kategori_2026_Lengkap.pdf', 'OMJR8OmUGyNJaofzPuVdAFfnnjBIIlMVBN8QttnFdhM=', 'none', NULL, '2026-01-28 19:39:34', '0', NULL, NULL, NULL);
INSERT INTO `ijazah` VALUES ('61', 'Gaguk', '5151515', '2026-01-27', 'Haji', 'Xvcvvvb', 'SDN WODI', '2025', '1', '697a07d1d1880_JADWALUASPRAKTIKUMGANJIL2025_2026.pdf', 'nrHHrgTZRKooweG1ePBCBuifJXCaCm3nKYErC71lxm0=', 'none', NULL, '2026-01-28 19:57:53', '0', NULL, NULL, NULL);
INSERT INTO `ijazah` VALUES ('62', 'Guntur', '666', '2026-01-26', 'Haji', 'Cok', 'SDN WODI', '2025', '1', '697a0835b0382_SuratNilaiObservasiTugasAkhirANINDAPUSPITASARI1.pdf', 'Vq1gOmeHiP+yJNn39IAfBl+HUv9OdHrEEkG9KxxAot4=', 'none', NULL, '2026-01-28 19:59:33', '0', NULL, NULL, NULL);
INSERT INTO `ijazah` VALUES ('63', 'asep', '3333', '2026-02-03', 'kontol', 'kontol', 'SDN WODI', '2020', '1', '698308b02a748_losssss.pdf', 'Hv14chYA8uG91FVzrKvwspKQDHpusku+ar8E3UQ8uQE=', 'none', NULL, '2026-02-04 15:52:00', '0', NULL, NULL, NULL);

-- --------------------------------------------------------
-- Table structure for table `school`
-- --------------------------------------------------------

DROP TABLE IF EXISTS `school`;
CREATE TABLE `school` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama_sekolah` varchar(255) NOT NULL,
  `jenjang` enum('SD','SMP','SMA') NOT NULL DEFAULT 'SD',
  `npsn` varchar(50) NOT NULL,
  `alamat` text,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `jumlah_siswa` int DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `npsn` (`npsn`)
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table `school`

INSERT INTO `school` VALUES ('72', 'SDN PASAWAHAN', 'SD', '123456789', '', '2026-01-03 10:44:04', '981');
INSERT INTO `school` VALUES ('73', 'SDN KUNINGAN', 'SD', '87654321', '', '2026-01-03 10:44:54', '1000');
INSERT INTO `school` VALUES ('74', 'SDN ECES', 'SD', '11223344', '', '2026-01-03 10:46:07', '1001');
INSERT INTO `school` VALUES ('75', 'SDN PRUNGGAHAN', 'SD', '11122233', '', '2026-01-03 10:46:45', '1000');
INSERT INTO `school` VALUES ('76', 'SDN WALID', 'SD', '12131415', '', '2026-01-03 10:47:19', '2000');
INSERT INTO `school` VALUES ('77', 'SDN GAGUK', 'SD', '22334455', '', '2026-01-03 10:48:12', '1500');
INSERT INTO `school` VALUES ('78', 'SDN SITI', 'SD', '33445566', '', '2026-01-03 10:49:43', '1206');
INSERT INTO `school` VALUES ('79', 'SDN DANGDUT', 'SD', '44556677', '', '2026-01-03 10:50:53', '2010');
INSERT INTO `school` VALUES ('80', 'SDN KOWANG', 'SD', '55667788', '', '2026-01-03 10:51:39', '1600');
INSERT INTO `school` VALUES ('81', 'SDN WODI', 'SD', '99991111', 'Desa Wonogurit', '2026-01-03 10:52:14', '1000');

-- --------------------------------------------------------
-- Table structure for table `students`
-- --------------------------------------------------------

DROP TABLE IF EXISTS `students`;
CREATE TABLE `students` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nisn` varchar(20) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `tanggal_lahir` date NOT NULL,
  `nama_ayah` varchar(255) DEFAULT NULL,
  `nama_ibu` varchar(255) DEFAULT NULL,
  `nama_wali` varchar(255) DEFAULT NULL,
  `sekolah_asal` varchar(255) NOT NULL,
  `jenjang` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nisn` (`nisn`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table `students`

INSERT INTO `students` VALUES ('5', '14622703', 'Aninda Puspita Sari', '2004-05-14', 'Hari', 'Siti', '', 'SDN PRUNGGAHAN', 'SD', '2026-01-11 19:16:07', '2026-01-11 19:16:07');
INSERT INTO `students` VALUES ('6', '14622717', 'Adji Dwi Cipta Teja Kusuma', '2002-10-31', 'Ciptono', 'Siti', '', 'SDN WODI', 'SD', '2026-01-11 19:26:57', '2026-01-11 19:26:57');
INSERT INTO `students` VALUES ('7', '14622704', 'Supriyadi', '2002-01-31', 'Honda', 'Supra', '', 'SDN WODI', 'SD', '2026-01-12 00:35:59', '2026-01-12 00:35:59');
INSERT INTO `students` VALUES ('8', '12345678', 'Anam Sahwat', '2026-01-01', 'Honda', 'Supra', '', 'SDN WODI', 'SD', '2026-01-12 00:45:35', '2026-01-12 00:45:35');
INSERT INTO `students` VALUES ('9', '9999999', 'kiu', '2000-12-13', 'ayah', 'ibu', '', 'SDN PRUNGGAHAN', 'SD', '2026-01-12 01:05:24', '2026-01-12 01:05:24');
INSERT INTO `students` VALUES ('10', '1234567', 'Aswi', '2026-01-27', 'brawi', 'war', '', 'SDN WODI', 'SD', '2026-01-28 19:38:56', '2026-01-28 19:38:56');
INSERT INTO `students` VALUES ('11', '32421', 'Dyva', '2009-01-08', 'Heri', 'Siti', '', 'Sdn pasawahan', 'SD', '2026-01-28 19:43:41', '2026-01-28 19:43:41');
INSERT INTO `students` VALUES ('12', '111222', 'Shopi', '2026-01-28', 'Nasuha', 'Jannah', '', 'SDN WODI', 'SD', '2026-01-28 19:54:55', '2026-01-28 19:54:55');
INSERT INTO `students` VALUES ('13', '5151515', 'Gaguk', '2026-01-27', 'Haji', 'Mahbud', '', 'SDN WODI', 'SD', '2026-01-28 19:57:03', '2026-01-28 19:57:03');
INSERT INTO `students` VALUES ('14', '666', 'Guntur', '2026-01-26', 'Haji', 'Mahbud', '', 'SDN WODI', 'SD', '2026-01-28 19:58:43', '2026-01-28 19:58:43');
INSERT INTO `students` VALUES ('15', '3333', 'asep', '2026-02-03', 'kontol', 'kontol2', '', 'SDN WODI', 'SD', '2026-02-04 15:51:11', '2026-02-04 15:51:11');

-- --------------------------------------------------------
-- Table structure for table `temp_tokens`
-- --------------------------------------------------------

DROP TABLE IF EXISTS `temp_tokens`;
CREATE TABLE `temp_tokens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `temp_token` varchar(64) NOT NULL,
  `user_id` int NOT NULL,
  `file_id` int NOT NULL,
  `action` varchar(20) NOT NULL DEFAULT 'view',
  `expires_at` datetime NOT NULL,
  `used` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `temp_token` (`temp_token`),
  KEY `idx_temp_token` (`temp_token`),
  KEY `idx_expires` (`expires_at`),
  KEY `idx_user_file` (`user_id`,`file_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------
-- Table structure for table `users`
-- --------------------------------------------------------

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(20) DEFAULT 'user',
  `sekolah_id` int DEFAULT NULL,
  `nama_lengkap` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  KEY `fk_user_sekolah` (`sekolah_id`),
  CONSTRAINT `fk_user_sekolah` FOREIGN KEY (`sekolah_id`) REFERENCES `school` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table `users`

INSERT INTO `users` VALUES ('9', 'super admin', '$2y$10$X6nROPe7q6EjD3IhEOcozeJfQ0ZIz85c/2IcnGL1wm4iUaxc8H3i6', 'super_admin', NULL, NULL, '2025-12-08 12:50:49');
INSERT INTO `users` VALUES ('42', 'aninda', '$2y$10$iJRYXmfhLgE5ATh2ndbS/uLFe5UY1VB2ktBeAn6D4tM.UX1A9gPsO', 'operator_sekolah', '72', NULL, '2026-01-03 10:44:04');
INSERT INTO `users` VALUES ('43', 'algo', '$2y$10$zsB4BoeGSAU4d6ZTra0Dp.vDvYZJK1eW5vXiC.Kp9d/hpoyOkRihW', 'operator_sekolah', '73', NULL, '2026-01-03 10:44:54');
INSERT INTO `users` VALUES ('44', 'ejran', '$2y$10$7ZQcw0.poSOmJKQAkEDFjuQk.z51jzTVmJ0wZC2CEh4s//bZvmuCy', 'operator_sekolah', '74', NULL, '2026-01-03 10:46:07');
INSERT INTO `users` VALUES ('45', 'kusuma', '$2y$10$R5tR.2rcjUaBM2G3ERrNieqy8myNU7h8troSrjbBIDFEnpZEgZBLS', 'operator_sekolah', '75', NULL, '2026-01-03 10:46:45');
INSERT INTO `users` VALUES ('46', 'walid', '$2y$10$iO2F2Cj8Qe7qDxnXqSDJau0BPBTCMr9hNoz.2bCUBLA.zgsT.VG76', 'operator_sekolah', '76', NULL, '2026-01-03 10:47:19');
INSERT INTO `users` VALUES ('47', 'angga', '$2y$10$HOrW.3e6kZehbMyUfKKE6OUQVaF5i7qjjvPrGTTSHi5fd5qCopwLG', 'operator_sekolah', '77', NULL, '2026-01-03 10:48:12');
INSERT INTO `users` VALUES ('48', 'siti', '$2y$10$V3SjZXswtqsoz3M1ivZRRuR2vGK/VP/Y6AIqoNsvIpyXXxWxyUFOa', 'operator_sekolah', '78', NULL, '2026-01-03 10:49:43');
INSERT INTO `users` VALUES ('49', 'dadang', '$2y$10$O.iX6BD932tfmjaqhF.e8.rPZEfTqWze6aOwzWchxnvs6k0jHhr6m', 'operator_sekolah', '79', NULL, '2026-01-03 10:50:53');
INSERT INTO `users` VALUES ('50', 'wahyu', '$2y$10$g0YGAlx4kvKVJQk7edJiuug2OjcnJeml4QHm9KfvCvwABtD8iPTF.', 'operator_sekolah', '80', NULL, '2026-01-03 10:51:40');
INSERT INTO `users` VALUES ('51', 'pasidi', '$2y$10$xq/BjR/Sl9yUnIoA6c7mBeP8VcMPAuzW6ihdCuScrUc6Sh5i5klc.', 'operator_sekolah', '81', NULL, '2026-01-03 10:52:14');
INSERT INTO `users` VALUES ('52', 'admin ijazah', '$2y$10$NwMziiZAdJXvLm1spczgZO2SVqCb6PypOtXhi0e.a3YWUBBYN6gtm', 'admin_ijazah', NULL, NULL, '2026-01-03 13:41:02');

SET FOREIGN_KEY_CHECKS=1;
