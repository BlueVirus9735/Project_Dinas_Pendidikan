import React, { useState } from "react";
import { AlertTriangle, X } from "lucide-react";

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  ijazahName,
}) {
  const [deleteReason, setDeleteReason] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleConfirm = () => {
    // Validate reason
    if (!deleteReason.trim()) {
      setError("Alasan penghapusan wajib diisi");
      return;
    }

    if (deleteReason.trim().length < 10) {
      setError("Alasan minimal 10 karakter");
      return;
    }

    // Call confirm callback
    onConfirm(deleteReason);

    // Reset
    setDeleteReason("");
    setError("");
  };

  const handleClose = () => {
    setDeleteReason("");
    setError("");
    onClose();
  };

  const charCount = deleteReason.length;
  const isValid = charCount >= 10;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="glass-strong rounded-2xl max-w-lg w-full p-6 animate-slide-up">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-500/10 rounded-xl">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-deep-navy dark:text-white">
                Konfirmasi Hapus Ijazah
              </h3>
              <p className="text-sm text-archive-slate dark:text-gray-400">
                Data akan dihapus
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-smooth"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="mb-6">
          <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-800 rounded-xl mb-4">
            <p className="text-sm text-amber-800 dark:text-amber-200">
              <strong>Anda akan menghapus ijazah:</strong>
            </p>
            <p className="text-base font-bold text-amber-900 dark:text-amber-100 mt-1">
              {ijazahName}
            </p>
          </div>

          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl mb-4">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              ℹ️ Data akan dihapus
            </p>
          </div>

          {/* Delete Reason Input */}
          <div>
            <label className="block text-sm font-bold text-deep-navy dark:text-white mb-2">
              Alasan Penghapusan <span className="text-red-500">*</span>
            </label>
            <textarea
              value={deleteReason}
              onChange={(e) => {
                setDeleteReason(e.target.value);
                setError("");
              }}
              placeholder="Jelaskan alasan penghapusan ijazah ini (minimal 10 karakter)..."
              className="w-full px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-white/10 rounded-xl text-deep-navy dark:text-white resize-none focus:ring-2 focus:ring-rich-gold/50 focus:border-rich-gold/50 transition-smooth outline-none"
              rows="4"
            />

            {/* Character Counter */}
            <div className="flex items-center justify-between mt-2">
              <span
                className={`text-sm ${
                  isValid
                    ? "text-green-600 dark:text-green-400"
                    : "text-gray-500"
                }`}
              >
                {charCount}/10 karakter {isValid && "✓"}
              </span>
              {error && <span className="text-sm text-red-500">{error}</span>}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleClose}
            className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-deep-navy dark:text-white rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-smooth"
          >
            Batal
          </button>
          <button
            onClick={handleConfirm}
            disabled={!isValid}
            className="flex-1 px-6 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-smooth"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}
