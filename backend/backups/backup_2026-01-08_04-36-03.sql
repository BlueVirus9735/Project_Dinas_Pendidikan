-- Database Backup (PHP Method)
-- Database: ijazah_disdik_cirebon
-- Generated: 2026-01-08 04:36:03

SET FOREIGN_KEY_CHECKS=0;

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
  `skpi_status` enum('none','pending','approved','rejected') DEFAULT 'none',
  `file_surat_polisi` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table `ijazah`

INSERT INTO `ijazah` VALUES ('36', 'Santun', '77777788', '2026-01-02', 'Asbak', 'DN-XNXX-BORWEB123', 'SDN WODI', '2026', '0', '6958b81ee3c26_ko.pdf', 'approved', 'uploads/skpi/SKPI_36_1767422924.pdf', '2026-01-03 13:33:02');
INSERT INTO `ijazah` VALUES ('38', 'Ashadu', '3214231', '2026-01-31', 'Ahmad', 'DC-XNXX-XHAMSTER', 'SDN PRUNGGAHAN', '2000', '0', '695f2dc95cd63_proposalku.pdf', 'none', NULL, '2026-01-08 11:08:41');

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

-- Dumping data for table `temp_tokens`

INSERT INTO `temp_tokens` VALUES ('1', 'b66406c5d391849c3ecbe12c2fc6267f4bcef30c5535665eb8dacf82d734be43', '52', '37', 'download', '2026-01-06 02:31:06', '0', '2026-01-06 09:26:06');
INSERT INTO `temp_tokens` VALUES ('2', 'db78b7ffdb59739694fa24bf1ec14159ffc85a546154b9e81c9d8f272aa8fa40', '52', '37', 'view', '2026-01-06 02:31:09', '0', '2026-01-06 09:26:09');
INSERT INTO `temp_tokens` VALUES ('3', '11b5424537fce17f739e7e4d6ae32aac1e682811ecb369e69589e054bc269f91', '52', '37', 'view', '2026-01-06 02:31:57', '0', '2026-01-06 09:26:57');
INSERT INTO `temp_tokens` VALUES ('4', '942905f225c2c2ec2311496ffc359e91b615aeccd76df5c0e2a9473082656f83', '52', '37', 'download', '2026-01-06 02:32:34', '0', '2026-01-06 09:27:34');
INSERT INTO `temp_tokens` VALUES ('5', '9e2e5ec076bbd0a9963897035073ba77611305841f373def587fbf09b5e1ec9a', '52', '36', 'view', '2026-01-06 02:36:22', '0', '2026-01-06 09:31:22');
INSERT INTO `temp_tokens` VALUES ('6', 'e0ae87781f8364a20a2a68dbb0c973bd9a39d9fea3dfbf2b4090006236c528ee', '52', '36', 'download', '2026-01-06 02:36:39', '0', '2026-01-06 09:31:39');
INSERT INTO `temp_tokens` VALUES ('7', '4fa1409430a2134a675d89d84d1a035925546908af6d0fe5ea01f4934f0f6df2', '52', '36', 'view', '2026-01-06 02:40:35', '0', '2026-01-06 09:35:35');
INSERT INTO `temp_tokens` VALUES ('8', 'e038afc39b532fd160c226f206c457072a03512e44e462f6f40c8d76c5a95e42', '52', '36', 'view', '2026-01-06 02:49:58', '0', '2026-01-06 09:44:58');
INSERT INTO `temp_tokens` VALUES ('9', '59004fbc1e872a7a492258856da5dc9cfb148ecd6d8a4d65e78825d3c92e3ead', '52', '36', 'download', '2026-01-06 02:50:02', '0', '2026-01-06 09:45:02');
INSERT INTO `temp_tokens` VALUES ('10', '2ba76afbc30151df093bb3afa92125a14a752b41a22a52b3b1dcf59e7f2cad5d', '52', '36', 'view', '2026-01-06 02:51:33', '0', '2026-01-06 09:46:33');
INSERT INTO `temp_tokens` VALUES ('11', '615cfc4afdf5dadcd9bef8e77727d796eae23f2bde856b3a36b4c459bbe3b5f0', '52', '36', 'download', '2026-01-06 02:51:54', '0', '2026-01-06 09:46:54');

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
