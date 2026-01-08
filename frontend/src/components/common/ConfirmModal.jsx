import React from "react";

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Konfirmasi",
  message = "Apakah Anda yakin?",
  confirmText = "Ya, Lanjutkan",
  cancelText = "Batal",
  isLoading = false,
  variant = "danger", // danger, warning, info
}) {
  if (!isOpen) return null;

  const variantStyles = {
    danger: "from-red-500 to-red-600 hover:from-red-600 hover:to-red-700",
    warning:
      "from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700",
    info: "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-scale-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={!isLoading ? onClose : undefined}
      />

      {/* Modal */}
      <div className="relative glass-strong rounded-2xl p-6 max-w-md w-full shadow-glass-lg border-2 border-white/20 dark:border-white/10 animate-slide-up">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-deep-navy dark:text-white font-serif">
            {title}
          </h3>
        </div>

        {/* Message */}
        <p className="text-gray-600 dark:text-gray-300 mb-6">{message}</p>

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-5 py-2.5 rounded-xl border-2 border-gray-300 dark:border-white/20 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-100 dark:hover:bg-white/10 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`px-5 py-2.5 rounded-xl text-white font-semibold transition-smooth disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r ${variantStyles[variant]}`}
          >
            {isLoading ? "Memproses..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
