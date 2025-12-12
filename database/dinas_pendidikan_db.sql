-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 12, 2025 at 05:34 PM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dinas_pendidikan_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `data_evaluasi_bos`
--

CREATE TABLE `data_evaluasi_bos` (
  `id` int NOT NULL,
  `sekolah_id` int NOT NULL,
  `tahun` int NOT NULL,
  `jumlah_siswa` int NOT NULL,
  `jumlah_guru` int NOT NULL,
  `jumlah_rombel` int NOT NULL,
  `dana_bos` decimal(20,2) NOT NULL,
  `status` enum('DRAFT','PENDING_VERIF','APPROVED','REJECTED') DEFAULT 'DRAFT',
  `file_bukti_path` varchar(255) DEFAULT NULL,
  `catatan_revisi` text,
  `kondisi_fasilitas_rusak` int DEFAULT '0',
  `akreditasi` varchar(50) DEFAULT 'Tidak Terakreditasi',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `data_evaluasi_bos`
--

INSERT INTO `data_evaluasi_bos` (`id`, `sekolah_id`, `tahun`, `jumlah_siswa`, `jumlah_guru`, `jumlah_rombel`, `dana_bos`, `status`, `file_bukti_path`, `catatan_revisi`, `kondisi_fasilitas_rusak`, `akreditasi`, `created_at`) VALUES
(53, 48, 2025, 200, 200, 12, 9000000.00, 'APPROVED', NULL, '', 89, 'A', '2025-12-12 21:09:29'),
(54, 48, 2026, 100, 100, 12, 9000001.00, 'APPROVED', 'uploads/bukti_bos/1765549841_bkuarkas.pdf', '', 18, 'B', '2025-12-12 21:23:05'),
(55, 48, 2024, 12, 12, 12, 10000000.00, 'APPROVED', 'uploads/bukti_bos/1765549912_bkuarkas.pdf', '', 11, 'B', '2025-12-12 21:31:52'),
(56, 52, 2025, 12, 12, 12, 100000000.00, 'APPROVED', 'uploads/bukti_bos/1765554147_bkuarkas.pdf', '', 12, 'A', '2025-12-12 22:42:27'),
(57, 53, 2025, 10, 9, 12, 120000000.00, 'APPROVED', 'uploads/bukti_bos/1765554684_bkuarkas.pdf', '', 2, 'B', '2025-12-12 22:47:05'),
(58, 54, 2025, 120, 12, 12, 10.00, 'APPROVED', 'uploads/bukti_bos/1765556888_bkuarkas.pdf', '', 100, 'A', '2025-12-12 23:28:08');

-- --------------------------------------------------------

--
-- Table structure for table `detail_clustering`
--

CREATE TABLE `detail_clustering` (
  `id` int NOT NULL,
  `riwayat_id` int NOT NULL,
  `sekolah_id` int NOT NULL,
  `cluster_label` int NOT NULL,
  `kategori_cluster` varchar(50) DEFAULT NULL,
  `jarak_ke_centroid` decimal(10,4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `detail_clustering`
--

INSERT INTO `detail_clustering` (`id`, `riwayat_id`, `sekolah_id`, `cluster_label`, `kategori_cluster`, `jarak_ke_centroid`) VALUES
(324, 59, 48, 1, 'Prioritas Sedang', 0.0000),
(325, 59, 52, 0, 'Prioritas Rendah', 0.0000),
(326, 60, 48, 1, 'Prioritas Sedang', 0.0000),
(327, 60, 52, 0, 'Prioritas Rendah', 0.0000),
(328, 61, 48, 1, 'Prioritas Sedang', 0.0000),
(329, 61, 52, 0, 'Prioritas Rendah', 0.0000),
(330, 62, 48, 1, 'Prioritas Sedang', 0.0000),
(331, 62, 52, 0, 'Prioritas Rendah', 0.0000),
(332, 63, 48, 2, 'Prioritas Tinggi', 0.0000),
(333, 63, 52, 1, 'Prioritas Sedang', 0.0000),
(334, 63, 53, 0, 'Prioritas Rendah', 0.0000),
(335, 64, 48, 1, 'Prioritas Sedang', 0.0000),
(336, 64, 52, 0, 'Prioritas Rendah', 0.0982),
(337, 64, 53, 0, 'Prioritas Rendah', 0.0982),
(338, 64, 54, 2, 'Prioritas Tinggi', 0.0000);

-- --------------------------------------------------------

--
-- Table structure for table `ijazah`
--

CREATE TABLE `ijazah` (
  `id` int NOT NULL,
  `nama` varchar(255) NOT NULL,
  `nisn` varchar(20) NOT NULL,
  `tanggal_lahir` date NOT NULL,
  `nama_orang_tua` varchar(255) NOT NULL,
  `nomor_ijazah` varchar(100) NOT NULL,
  `sekolah` varchar(255) NOT NULL,
  `tahun` int NOT NULL,
  `status_verifikasi` tinyint(1) DEFAULT '0',
  `file_path` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `ijazah`
--

INSERT INTO `ijazah` (`id`, `nama`, `nisn`, `tanggal_lahir`, `nama_orang_tua`, `nomor_ijazah`, `sekolah`, `tahun`, `status_verifikasi`, `file_path`, `created_at`) VALUES
(15, 'Ahmad manda', '87878787', '2000-11-01', 'Siti Fatimah', 'DN9087688X', 'SMP Nusa Bangsa', 2018, 0, '693c2c8049f66.pdf', '2025-12-12 14:53:52'),
(16, 'Aninda', '90324723', '2001-12-31', 'Adji', 'njcdskjfhsdk', 'SD Sukamaju 01', 2005, 0, '693c2e0197777.pdf', '2025-12-12 15:00:17'),
(17, 'Ahmad anim', '87878799', '2000-11-01', 'Siti Fatimah', 'DN90876889', 'SD Pasawahan', 2018, 0, '693c3f1641f42.pdf', '2025-12-12 16:13:10'),
(18, 'Ikang Fauzai', '87878000', '2000-11-01', 'Siti Fatimah', 'DN90876878', 'SD Prunggahan Kulon', 2018, 0, '693c466b5ba0e_ijazahtemplate.pdf', '2025-12-12 16:44:27'),
(19, 'Ikang zalim', '878781222', '2000-11-01', 'Siti Fatimah', 'DN90876212', 'SMA Garuda Indonesia', 2018, 0, '693c4ab3ef5af_ijazahtemplate.pdf', '2025-12-12 17:02:44');

-- --------------------------------------------------------

--
-- Table structure for table `riwayat_clustering`
--

CREATE TABLE `riwayat_clustering` (
  `id` int NOT NULL,
  `tanggal_proses` datetime DEFAULT CURRENT_TIMESTAMP,
  `jumlah_cluster` int NOT NULL,
  `silhouette_score` decimal(5,4) DEFAULT NULL,
  `keterangan` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `riwayat_clustering`
--

INSERT INTO `riwayat_clustering` (`id`, `tanggal_proses`, `jumlah_cluster`, `silhouette_score`, `keterangan`) VALUES
(59, '2025-12-12 22:58:21', 3, 0.0000, 'Proses K-Means Tahun 2025'),
(60, '2025-12-12 23:00:30', 3, 0.0000, 'Proses K-Means Tahun 2025'),
(61, '2025-12-12 23:01:49', 3, 0.0000, 'Proses K-Means Tahun 2025'),
(62, '2025-12-12 23:03:51', 3, 0.0000, 'Proses K-Means Tahun 2025'),
(63, '2025-12-12 23:08:26', 3, 0.0000, 'Proses K-Means Tahun 2025'),
(64, '2025-12-12 23:28:52', 3, 0.4315, 'Proses K-Means Tahun 2025');

-- --------------------------------------------------------

--
-- Table structure for table `sekolah_bos`
--

CREATE TABLE `sekolah_bos` (
  `id` int NOT NULL,
  `nama_sekolah` varchar(255) NOT NULL,
  `jenjang` enum('SD','SMP','SMA') NOT NULL DEFAULT 'SD',
  `npsn` varchar(50) NOT NULL,
  `alamat` text,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `sekolah_bos`
--

INSERT INTO `sekolah_bos` (`id`, `nama_sekolah`, `jenjang`, `npsn`, `alamat`, `created_at`) VALUES
(48, 'SD Sukamaju 01', 'SD', '10101010', 'Jl. Merdeka No. 1', '2025-12-12 20:47:12'),
(49, 'SMP Nusa Bangsa', 'SMP', '20202020', 'Jl. Jendral Sudirman No. 5', '2025-12-12 20:47:12'),
(50, 'SMA Garuda Indonesia', 'SMA', '30303030', 'Jl. Pahlawan No. 10', '2025-12-12 20:47:12'),
(52, 'SD Kedawung', 'SD', '12345678', '', '2025-12-12 22:40:38'),
(53, 'SD Pasawahan', 'SD', '44444489', '', '2025-12-12 22:46:09'),
(54, 'SD Prunggahan Kulon', 'SD', '131552518', '', '2025-12-12 23:26:57');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(20) DEFAULT 'user',
  `sekolah_id` int DEFAULT NULL,
  `nama_lengkap` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `role`, `sekolah_id`, `nama_lengkap`, `created_at`) VALUES
(9, 'super admin', '$2y$10$X6nROPe7q6EjD3IhEOcozeJfQ0ZIz85c/2IcnGL1wm4iUaxc8H3i6', 'super_admin', NULL, NULL, '2025-12-08 05:50:49'),
(10, 'admin ijazah', '$2y$10$M3javnFYTyFggdJ1YRcqv.eAOY0fk48rwpK98AdOi6ZfWumOtdhMm', 'admin_ijazah', NULL, NULL, '2025-12-08 05:50:49'),
(11, 'admin bos', '$2y$10$.C354noM6JGhzhBCLwOFZenjzOPO22iqs0ZA9txuiQ3CUXjdyKS2u', 'admin_bos', NULL, NULL, '2025-12-08 05:50:49'),
(17, 'op_sd', '$2y$10$1eYFaZh8BYLa5wX5MYX1aO0uq1G8zAfnf/agDIYJ437ujIbgbOg/y', 'operator_sekolah', 48, 'Operator SD Sukamaju', '2025-12-12 13:47:13'),
(18, 'op_smp', '$2y$10$UKNYNE6Y1WqjlMWGLHKhwuahMWVTOv3m0rb155P7pFpZf8GpHe6eW', 'operator_sekolah', 49, 'Operator SMP Nusa Bangsa', '2025-12-12 13:47:13'),
(19, 'sma1', '$2y$10$yI8iosjhNtBZgD/RM6aPYOkVhNFvCavTVKIUPGx5BNmisgb/tRjcO', 'operator_sekolah', 50, 'Operator SMA Garuda', '2025-12-12 13:47:13'),
(22, 'aninda', '$2y$10$toCKKQMVKr8I1doYMKvkKucF6jtZtNZgcmDx5vVxl2GbkG0f9ylG2', 'operator_sekolah', 52, NULL, '2025-12-12 15:24:26'),
(23, 'puspita', '$2y$10$bH0.QsxByIm32AuZOijyoeGWxiz5Xp0f.MEFs8EvbgpuQLPGspiaG', 'operator_sekolah', 53, NULL, '2025-12-12 15:46:09'),
(24, 'adji', '$2y$10$flcKI2eRl7H2BkVwe5EnXOythT4y1W8hzumbreiS3KWhTJyerHsuK', 'operator_sekolah', 54, NULL, '2025-12-12 16:26:57');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `data_evaluasi_bos`
--
ALTER TABLE `data_evaluasi_bos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sekolah_id` (`sekolah_id`);

--
-- Indexes for table `detail_clustering`
--
ALTER TABLE `detail_clustering`
  ADD PRIMARY KEY (`id`),
  ADD KEY `riwayat_id` (`riwayat_id`),
  ADD KEY `sekolah_id` (`sekolah_id`);

--
-- Indexes for table `ijazah`
--
ALTER TABLE `ijazah`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `riwayat_clustering`
--
ALTER TABLE `riwayat_clustering`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sekolah_bos`
--
ALTER TABLE `sekolah_bos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `npsn` (`npsn`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `fk_user_sekolah` (`sekolah_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `data_evaluasi_bos`
--
ALTER TABLE `data_evaluasi_bos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT for table `detail_clustering`
--
ALTER TABLE `detail_clustering`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=339;

--
-- AUTO_INCREMENT for table `ijazah`
--
ALTER TABLE `ijazah`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `riwayat_clustering`
--
ALTER TABLE `riwayat_clustering`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT for table `sekolah_bos`
--
ALTER TABLE `sekolah_bos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `data_evaluasi_bos`
--
ALTER TABLE `data_evaluasi_bos`
  ADD CONSTRAINT `data_evaluasi_bos_ibfk_1` FOREIGN KEY (`sekolah_id`) REFERENCES `sekolah_bos` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `detail_clustering`
--
ALTER TABLE `detail_clustering`
  ADD CONSTRAINT `detail_clustering_ibfk_1` FOREIGN KEY (`riwayat_id`) REFERENCES `riwayat_clustering` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `detail_clustering_ibfk_2` FOREIGN KEY (`sekolah_id`) REFERENCES `sekolah_bos` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_user_sekolah` FOREIGN KEY (`sekolah_id`) REFERENCES `sekolah_bos` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
