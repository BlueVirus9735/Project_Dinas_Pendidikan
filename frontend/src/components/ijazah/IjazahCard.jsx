import React from "react";
import { Eye, Download, Trash2, CheckCircle } from "lucide-react";

export default function IjazahCard({ item, user, onDelete, onRefresh }) {
  const isVerified = item.status_verifikasi === "terverifikasi";

  const handlePreview = () => {
    const token = localStorage.getItem("token");
    window.open(
      `http://localhost:8000/api/view.php?id=${item.id}&token=${token}`,
      "_blank"
    );
  };

  const handleDownload = () => {
    const token = localStorage.getItem("token");
    window.open(
      `http://localhost:8000/api/download.php?id=${item.id}&token=${token}`,
      "_blank"
    );
  };

  return (
    <div
      className={`backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border rounded-2xl shadow-xl group relative overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl ${
        isVerified
          ? "border-emerald-400/40 shadow-emerald-500/20"
          : "border-gray-200/50 dark:border-white/10"
      }`}
    >
      {isVerified && (
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-400 to-green-500"></div>
      )}

      <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden group-hover:scale-[1.02] transition-all duration-300">
        {item.file_path ? (
          <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-200 dark:bg-gray-800">
            <span className="text-xs font-bold uppercase tracking-widest">
              Preview Dokumen
            </span>
            <div className="absolute inset-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg"></div>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Preview
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3">
          <button
            onClick={handlePreview}
            className="relative p-3.5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-300 hover:scale-110 shadow-xl hover:shadow-blue-500/50 group/btn"
            title="Lihat Dokumen"
          >
            <Eye className="w-5 h-5" />
            <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
          </button>
          <button
            onClick={handleDownload}
            className="relative p-3.5 bg-gradient-to-br from-green-500 to-green-600 rounded-xl text-white hover:from-green-600 hover:to-green-700 transition-all duration-300 hover:scale-110 shadow-xl hover:shadow-green-500/50 group/btn"
            title="Download"
          >
            <Download className="w-5 h-5" />
            <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
          </button>
          {user?.role === "super_admin" && (
            <button
              onClick={() => onDelete(item.id)}
              className="relative p-3.5 bg-gradient-to-br from-red-500 to-red-600 rounded-xl text-white hover:from-red-600 hover:to-red-700 transition-all duration-300 hover:scale-110 shadow-xl hover:shadow-red-500/50 group/btn"
              title="Hapus"
            >
              <Trash2 className="w-5 h-5" />
              <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
            </button>
          )}
        </div>

        <div className="absolute top-3 right-3">
          {isVerified ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider bg-emerald-500 text-white shadow-lg border border-emerald-400">
              <CheckCircle className="w-3.5 h-3.5" /> Valid
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 shadow-lg border border-gray-300 dark:border-gray-600">
              Draft
            </span>
          )}
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="mb-4">
          <p className="text-xs font-bold text-blue-600 dark:text-blue-400 border-b-2 border-blue-600/20 pb-2 mb-3 uppercase tracking-widest">
            {item.tahun_lulus} • {item.sekolah}
          </p>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight line-clamp-2 mb-2">
            {item.nama}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-mono font-medium">
            NISN: {item.nisn}
          </p>
        </div>

        <div className="mt-auto pt-3 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 font-medium">
          <span>Uploaded by: {item.uploaded_by_name || "System"}</span>
          <span>{new Date(item.created_at).toLocaleDateString("id-ID")}</span>
        </div>
      </div>
    </div>
  );
}
