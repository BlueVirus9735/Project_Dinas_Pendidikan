import React, { useState } from "react";
import Swal from "sweetalert2";
import { Upload, X, ShieldAlert } from "lucide-react";
import { api } from "../../services/api";

export default function SKPIRequestModal({
  isOpen,
  onClose,
  studentId,
  studentName,
  onSuccess,
}) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      Swal.fire(
        "Error",
        "Mohon upload surat keterangan kehilangan dari kepolisian",
        "error"
      );
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("id", studentId);
    formData.append("file_polisi", file);

    // Debug FormData
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      // Need to adjust api service or use raw axios if api wrapper doesn't support generic post to other endpoints easily
      // Assuming api.post works with FormData
      const res = await api.post("/skpi_action.php?action=request", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.status) {
        Swal.fire(
          "Berhasil",
          "Pengajuan SKPI berhasil dikirim. Menunggu verifikasi Dinas.",
          "success"
        );
        onSuccess();
        onClose();
      } else {
        Swal.fire(
          "Gagal",
          res.data.message || "Terjadi kesalahan sistem",
          "error"
        );
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Gagal", "Gagal mengirim pengajuan", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-3xl w-full max-w-md p-6 shadow-2xl border border-gray-100 dark:border-gray-700 animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-orange-500" />
            Pengajuan SKPI
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl text-xs text-blue-800 dark:text-blue-300">
            Anda akan mengajukan Surat Keterangan Pengganti Ijazah untuk{" "}
            <b>{studentName}</b>. <br />
            Wajib melampirkan Scan Surat Kehilangan dari Kepolisian.
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Upload Surat Keterangan Kepolisian (PDF/JPG)
            </label>
            <div className="relative border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl p-6 hover:border-blue-500 transition-colors text-center cursor-pointer bg-gray-50 dark:bg-gray-800/50">
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept=".pdf,.jpg,.jpeg,.png"
              />
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {file ? file.name : "Klik untuk pilih file"}
              </p>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 shadow-lg shadow-orange-500/20 disabled:opacity-70 flex justify-center items-center"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                "Ajukan Sekarang"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
