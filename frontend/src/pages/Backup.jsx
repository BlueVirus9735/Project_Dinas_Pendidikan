import React, { useState, useEffect } from "react";
import {
  Database,
  Download,
  Upload,
  Trash2,
  RefreshCw,
  HardDrive,
  Clock,
} from "lucide-react";
import toast from "react-hot-toast";
import ConfirmModal from "../components/common/ConfirmModal";
import BackupStats from "../components/backup/BackupStats";
import BackupCard from "../components/backup/BackupCard";
import API_BASE_URL from "../config";

export default function Backup() {
  const [backups, setBackups] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    totalSize: 0,
    lastBackup: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    type: "",
    backup: null,
  });

  useEffect(() => {
    fetchBackups();
  }, []);

  const fetchBackups = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/backup/list.php`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();

      if (data.success) {
        setBackups(data.backups || []);
        setStats({
          total: data.backups?.length || 0,
          totalSize: data.totalSize || 0,
          lastBackup: data.backups?.[0]?.date || null,
        });
      }
    } catch (error) {
      console.error("Error fetching backups:", error);
    }
  };

  const handleCreateBackup = async () => {
    setIsLoading(true);
    toast.loading("Membuat backup...", { id: "backup" });

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/backup/create.php`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();

      if (data.success) {
        toast.success("Backup berhasil dibuat!", { id: "backup" });
        fetchBackups();
      } else {
        toast.error(data.message || "Gagal membuat backup", { id: "backup" });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Terjadi kesalahan", { id: "backup" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = (backup) => {
    const token = localStorage.getItem("token");
    window.open(
      `${API_BASE_URL}/backup/download.php?file=${backup.filename}&token=${token}`,
      "_blank"
    );
    toast.success("Download dimulai");
  };

  const handleRestore = async () => {
    const backup = confirmModal.backup;
    setIsLoading(true);
    toast.loading("Memulihkan backup...", { id: "restore" });

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/backup/restore.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ filename: backup.filename }),
      });
      const data = await response.json();

      if (data.success) {
        toast.success("Backup berhasil dipulihkan!", { id: "restore" });
      } else {
        toast.error(data.message || "Gagal memulihkan backup", {
          id: "restore",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Terjadi kesalahan", { id: "restore" });
    } finally {
      setIsLoading(false);
      setConfirmModal({ isOpen: false, type: "", backup: null });
    }
  };

  const handleDelete = async () => {
    const backup = confirmModal.backup;
    setIsLoading(true);
    toast.loading("Menghapus backup...", { id: "delete" });

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/backup/delete.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ filename: backup.filename }),
      });
      const data = await response.json();

      if (data.success) {
        toast.success("Backup berhasil dihapus!", { id: "delete" });
        fetchBackups();
      } else {
        toast.error(data.message || "Gagal menghapus backup", { id: "delete" });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Terjadi kesalahan", { id: "delete" });
    } finally {
      setIsLoading(false);
      setConfirmModal({ isOpen: false, type: "", backup: null });
    }
  };

  return (
    <div className="p-6 space-y-6 animate-slide-up">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center text-white shadow-glow-gold">
          <Database className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-deep-navy dark:text-white font-serif">
            Backup & Restore
          </h1>
          <p className="text-archive-slate dark:text-gray-400">
            Kelola backup database aplikasi
          </p>
        </div>
      </div>

      {/* Stats */}
      <BackupStats stats={stats} />

      {/* Actions */}
      <div className="flex gap-3 flex-wrap">
        <button
          onClick={handleCreateBackup}
          disabled={isLoading}
          className="btn-premium flex items-center gap-2 disabled:opacity-50"
        >
          <Database className="w-5 h-5" />
          Backup Sekarang
        </button>
      </div>

      {/* Backup List */}
      <div className="glass-strong rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-deep-navy dark:text-white font-serif">
            Riwayat Backup
          </h2>
          <button
            onClick={fetchBackups}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-smooth"
          >
            <RefreshCw className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {backups.length === 0 ? (
          <div className="text-center py-12">
            <Database className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">Belum ada backup</p>
          </div>
        ) : (
          <div className="space-y-3">
            {backups.map((backup, index) => (
              <BackupCard
                key={index}
                backup={backup}
                onDownload={() => handleDownload(backup)}
                onRestore={() =>
                  setConfirmModal({ isOpen: true, type: "restore", backup })
                }
                onDelete={() =>
                  setConfirmModal({ isOpen: true, type: "delete", backup })
                }
              />
            ))}
          </div>
        )}
      </div>

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() =>
          setConfirmModal({ isOpen: false, type: "", backup: null })
        }
        onConfirm={
          confirmModal.type === "restore" ? handleRestore : handleDelete
        }
        title={
          confirmModal.type === "restore" ? "Pulihkan Backup" : "Hapus Backup"
        }
        message={
          confirmModal.type === "restore"
            ? "Apakah Anda yakin ingin memulihkan backup ini? Data saat ini akan diganti."
            : "Apakah Anda yakin ingin menghapus backup ini? Tindakan ini tidak dapat dibatalkan."
        }
        confirmText={
          confirmModal.type === "restore" ? "Ya, Pulihkan" : "Ya, Hapus"
        }
        variant={confirmModal.type === "restore" ? "warning" : "danger"}
        isLoading={isLoading}
      />
    </div>
  );
}
