import React from "react";
import { X, Database, School } from "lucide-react";

export default function DamageViewModal({ isOpen, onClose, data }) {
  if (!isOpen || !data) return null;

  let details = [];
  try {
    details =
      typeof data.detail_kerusakan === "string"
        ? JSON.parse(data.detail_kerusakan)
        : data.detail_kerusakan || [];
  } catch (e) {
    console.error("Failed to parse details", e);
  }

  const totalScore = data.kondisi_fasilitas_rusak || 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-3xl flex flex-col max-h-[85vh] relative z-10 border border-white/20 dark:border-white/10 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 dark:border-white/10 bg-gray-50/80 dark:bg-slate-800/80 flex justify-between items-center backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-2xl">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Rincian Kerusakan Fasilitas
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <School className="w-3 h-3" />
                {data.nama_sekolah}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-700 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-0 overflow-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 dark:bg-slate-800/50 text-gray-500 dark:text-gray-400 uppercase text-xs font-bold tracking-wider sticky top-0 z-10">
              <tr>
                <th className="px-6 py-4">Nama Fasilitas</th>
                <th className="px-6 py-4 text-center">Jumlah Unit</th>
                <th className="px-6 py-4 text-center">Nilai / Unit</th>
                <th className="px-6 py-4 text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
              {details.length > 0 ? (
                details.map((item, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {item.name}
                      {!item.is_master && (
                        <span className="ml-2 text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded border border-blue-200">
                          Custom
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600 dark:text-gray-300">
                      {item.count}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                      {item.score}
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-gray-900 dark:text-white">
                      {item.count * item.score}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-12 text-center text-gray-400"
                  >
                    Tidak ada rincian kerusakan yang tercatat.
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot className="bg-red-50 dark:bg-red-500/10 border-t border-red-100 dark:border-red-500/20">
              <tr>
                <td
                  colSpan="3"
                  className="px-6 py-4 text-right font-bold text-red-700 dark:text-red-400 uppercase text-xs tracking-wider"
                >
                  Total Skor Kerusakan
                </td>
                <td className="px-6 py-4 text-right font-black text-xl text-red-600 dark:text-red-400">
                  {totalScore}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
