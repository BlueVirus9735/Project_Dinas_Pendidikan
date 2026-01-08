import React from "react";
import {
  Trash2,
  RotateCcw,
  AlertTriangle,
  Clock,
  User,
  Calendar,
} from "lucide-react";

export default function TrashCard({ item, onRestore, onPermanentDelete }) {
  const daysRemaining = item.days_remaining || 0;
  const daysInTrash = item.days_in_trash || 0;
  const progressPercent = (daysInTrash / 90) * 100;

  // Color based on days remaining
  const getProgressColor = () => {
    if (daysRemaining > 60) return "bg-green-500";
    if (daysRemaining > 30) return "bg-yellow-500";
    return "bg-red-500";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="glass-strong rounded-2xl p-6 hover:shadow-glass-lg transition-smooth border-2 border-transparent hover:border-rich-gold/20">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-deep-navy dark:text-white mb-1">
            {item.nama}
          </h3>
          <div className="flex items-center gap-4 text-sm text-archive-slate dark:text-gray-400">
            <span>NISN: {item.nisn}</span>
            <span>•</span>
            <span>{item.sekolah}</span>
            <span>•</span>
            <span>Tahun: {item.tahun}</span>
          </div>
        </div>

        {/* Warning Badge */}
        {daysRemaining < 30 && (
          <div className="px-3 py-1 bg-red-500/10 border-2 border-red-500/30 rounded-lg">
            <span className="text-xs font-bold text-red-600 dark:text-red-400">
              ⚠️ {daysRemaining} hari lagi
            </span>
          </div>
        )}
      </div>

      {/* Delete Info */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-archive-slate dark:text-gray-400" />
            <span className="text-archive-slate dark:text-gray-400">
              Dihapus oleh:
            </span>
            <span className="font-semibold text-deep-navy dark:text-white">
              {item.deleted_by_username || "Unknown"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-archive-slate dark:text-gray-400" />
            <span className="text-archive-slate dark:text-gray-400">Pada:</span>
            <span className="font-semibold text-deep-navy dark:text-white">
              {formatDate(item.deleted_at)}
            </span>
          </div>
        </div>

        {/* Delete Reason */}
        {item.delete_reason && (
          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-archive-slate dark:text-gray-400 mb-1">
              Alasan Penghapusan:
            </p>
            <p className="text-sm text-deep-navy dark:text-white italic">
              "{item.delete_reason}"
            </p>
          </div>
        )}
      </div>

      {/* Retention Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-archive-slate dark:text-gray-400" />
            <span className="text-archive-slate dark:text-gray-400">
              Sisa waktu di trash:
            </span>
          </div>
          <span className="font-bold text-deep-navy dark:text-white">
            {daysRemaining} hari
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
          <div
            className={`h-full ${getProgressColor()} transition-all duration-500`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-xs text-archive-slate dark:text-gray-400 mt-1">
          {daysInTrash} dari 90 hari
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={() => onRestore(item)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-smooth"
        >
          <RotateCcw className="w-4 h-4" />
          Pulihkan
        </button>

        <button
          onClick={() => onPermanentDelete(item)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-smooth"
        >
          <Trash2 className="w-4 h-4" />
          Hapus Permanen
        </button>
      </div>

      {/* Warning */}
      <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
        <div className="flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 dark:text-amber-200">
            Setelah {daysRemaining} hari, data akan{" "}
            <strong>dihapus permanen otomatis</strong> dan tidak dapat
            dipulihkan.
          </p>
        </div>
      </div>
    </div>
  );
}
