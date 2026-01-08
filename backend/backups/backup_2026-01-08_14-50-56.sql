-- Database Backup (PHP Method)
-- Database: ijazah_disdik_cirebon
-- Generated: 2026-01-08 14:50:56

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
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Activity logging for audit trail';

-- Dumping data for table `activity_logs`

INSERT INTO `activity_logs` VALUES ('35', '45', 'kusuma', 'ijazah_upload', 'ijazah', 'Mengupload ijazah untuk siswa: JOKOWI DODO (NISN: 77777788)', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '2026-01-08 21:07:28');
INSERT INTO `activity_logs` VALUES ('36', '45', 'kusuma', 'ijazah_download', 'ijazah', 'Download ijazah siswa: JOKOWI DODO (NISN: 77777788)', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '2026-01-08 21:07:44');
INSERT INTO `activity_logs` VALUES ('37', '45', 'kusuma', 'ijazah_download', 'ijazah', 'Download ijazah siswa: JOKOWI DODO (NISN: 77777788)', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '2026-01-08 21:07:44');
INSERT INTO `activity_logs` VALUES ('38', '45', 'kusuma', 'ijazah_upload', 'ijazah', 'Mengupload ijazah untuk siswa: JOKOWI DODO (NISN: 77777788)', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '2026-01-08 21:08:46');
INSERT INTO `activity_logs` VALUES ('39', '45', 'kusuma', 'ijazah_upload', 'ijazah', 'Mengupload ijazah untuk siswa: JOKOWI DODO (NISN: 77777788)', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '2026-01-08 21:12:14');
INSERT INTO `activity_logs` VALUES ('40', '9', 'super admin', 'ijazah_verify', 'ijazah', 'Admin memverifikasi ijazah siswa: JOKOWI DODO (NISN: 77777788) dari SDN PRUNGGAHAN', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0', '2026-01-08 21:21:50');
INSERT INTO `activity_logs` VALUES ('41', '45', 'kusuma', 'skpi_request', 'skpi', 'Mengajukan SKPI untuk ijazah ID: 52', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '2026-01-08 21:48:07');
INSERT INTO `activity_logs` VALUES ('42', '52', 'admin ijazah', 'skpi_approve', 'skpi', 'Menyetujui pengajuan SKPI untuk ijazah ID: 52', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0', '2026-01-08 21:48:44');

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
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table `ijazah`

INSERT INTO `ijazah` VALUES ('52', 'JOKOWI DODO', '77777788', '2026-01-09', 'Asbak', 'DC-XNXX-XHAMSTER', 'SDN PRUNGGAHAN', '2024', '1', '695fbb3e794ec_proposalku.pdf', 'JTwqADhfMp4JlYAk6WOK6yDEliz8bvV6EMbb6vZPa00=', 'approved', 'uploads/skpi/SKPI_52_1767883687.pdf', '2026-01-08 21:12:14', '0', NULL, NULL, NULL);

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
INSERT INTO `school` VALUES ('81', 'SDN WODI', 'SD', '99991111', '', '2026-01-03 10:52:14', '2100');

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
INSERT INTO `users` VALUES ('52', 'admin ijazah', '$2y$10$v9xwyNZl7x1krC17dsjOnuY6aMp1sbzukCixK2bpbOBWS1TPFdJSS', 'admin_ijazah', NULL, NULL, '2026-01-03 13:41:02');

SET FOREIGN_KEY_CHECKS=1;
