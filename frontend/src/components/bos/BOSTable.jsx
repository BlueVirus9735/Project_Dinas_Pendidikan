import React from "react";
import {
  FileSpreadsheet,
  AlertCircle,
  CheckCircle,
  Database,
  Edit,
  X,
} from "lucide-react";

export default function BOSTable({
  data,
  loading,
  user,
  onEdit,
  onVerify,
  onViewDamage,
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
        <Database className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          Daftar Sekolah & Anggaran
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50/50 dark:bg-gray-700/30 text-gray-500 dark:text-gray-400 uppercase text-xs font-bold tracking-wider">
            <tr>
              <th className="px-6 py-5 first:pl-8">Sekolah / NPSN</th>
              <th className="px-6 py-5">Tahun</th>
              <th className="px-6 py-5 text-right">Statistik</th>
              <th className="px-6 py-5 text-right">Dana BOS</th>
              <th className="px-6 py-5 text-center">Kerusakan</th>
              <th className="px-6 py-5 text-center">Akreditasi</th>
              {user && user.role !== "super_admin" && (
                <th className="px-6 py-5 text-center last:pr-8">Aksi</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-sm">
            {loading ? (
              <tr>
                <td
                  colSpan="9"
                  className="px-6 py-12 text-center text-gray-500"
                >
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                    <p className="font-medium">Memuat data sekolah...</p>
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan="9"
                  className="px-6 py-12 text-center text-gray-500"
                >
                  <div className="flex flex-col items-center justify-center gap-3 opacity-60">
                    <Database className="w-12 h-12 text-gray-300" />
                    <p>Tidak ada data yang ditemukan.</p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((item, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-blue-50/50 dark:hover:bg-gray-700/30 transition-colors group"
                >
                  <td className="px-6 py-4 first:pl-8">
                    <div className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                      {item.nama_sekolah}
                    </div>
                    <div className="text-xs text-gray-400 font-mono mt-0.5">
                      {item.npsn}
                    </div>
                    <div className="mt-1">
                      {item.status === "PENDING_VERIF" && (
                        <span className="text-[10px] bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full border border-yellow-200">
                          Menunggu Verifikasi
                        </span>
                      )}
                      {item.status === "APPROVED" && (
                        <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full border border-green-200">
                          Terverifikasi
                        </span>
                      )}
                      {item.status === "REJECTED" && (
                        <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded-full border border-red-200">
                          Ditolak
                        </span>
                      )}
                      {item.status === "DRAFT" && (
                        <span className="text-[10px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full border border-gray-200">
                          Draft
                        </span>
                      )}
                    </div>
                    {item.file_bukti_path && (
                      <a
                        href={`http://localhost:8000/${item.file_bukti_path}`}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 text-[10px] flex items-center gap-1 text-blue-600 hover:underline"
                      >
                        <FileSpreadsheet className="w-3 h-3" /> Bukti BKU
                      </a>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md text-xs font-medium text-gray-600 dark:text-gray-300">
                      {item.tahun}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="text-xs space-y-1">
                      <div className="flex justify-end gap-2 text-gray-500">
                        <span>Siswa:</span>
                        <span className="font-semibold text-gray-700 dark:text-gray-300">
                          {item.jumlah_siswa}
                        </span>
                      </div>
                      <div className="flex justify-end gap-2 text-gray-500">
                        <span>Guru:</span>
                        <span className="font-semibold text-gray-700 dark:text-gray-300">
                          {item.jumlah_guru}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="font-bold text-emerald-600 dark:text-emerald-400">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        maximumFractionDigits: 0,
                      }).format(item.dana_bos)}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold
                              ${
                                item.kondisi_fasilitas_rusak > 50
                                  ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                                  : item.kondisi_fasilitas_rusak > 20
                                  ? "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400"
                                  : "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                              }`}
                      >
                        {item.kondisi_fasilitas_rusak > 20 ? (
                          <AlertCircle className="w-3 h-3" />
                        ) : (
                          <CheckCircle className="w-3 h-3" />
                        )}
                        Skor: {item.kondisi_fasilitas_rusak}
                      </span>

                      {/* Detail Info */}
                      <div className="text-[10px] text-gray-500 font-medium">
                        {(() => {
                          try {
                            const details =
                              typeof item.detail_kerusakan === "string"
                                ? JSON.parse(item.detail_kerusakan)
                                : item.detail_kerusakan;
                            const count = Array.isArray(details)
                              ? details.length
                              : 0;
                            return `${count} Item Tercatat`;
                          } catch (e) {
                            return "0 Item";
                          }
                        })()}
                      </div>

                      {user &&
                        (user.role === "admin_bos" ||
                          user.role === "super_admin") && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onViewDamage(item);
                            }}
                            className="text-[10px] text-blue-500 hover:underline hover:text-blue-700 font-bold"
                          >
                            Lihat Rincian
                          </button>
                        )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`inline-block w-8 h-8 leading-8 text-center rounded-lg text-xs font-bold ring-2 ring-white dark:ring-gray-800
                          ${
                            item.akreditasi === "A"
                              ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                              : item.akreditasi === "B"
                              ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                              : item.akreditasi === "C"
                              ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                              : "bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
                          }`}
                    >
                      {item.akreditasi === "Tidak Terakreditasi"
                        ? "-"
                        : item.akreditasi}
                    </span>
                  </td>
                  {user && user.role !== "super_admin" && (
                    <td className="px-6 py-4 text-center last:pr-8">
                      {user.role === "operator_sekolah" &&
                        (item.status === "DRAFT" ||
                          item.status === "REJECTED") && (
                          <button
                            onClick={() => onEdit(item)}
                            className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 rounded-xl transition-colors"
                            title="Edit Data"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        )}
                      {(user.role === "admin_bos" ||
                        user.role === "super_admin") &&
                        item.status === "PENDING_VERIF" && (
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => {
                                onVerify(item.id, "APPROVED");
                              }}
                              className="p-2 bg-green-50 text-green-600 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400 rounded-xl transition-colors"
                              title="Setujui"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                onVerify(item.id, "REJECTED");
                              }}
                              className="p-2 bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400 rounded-xl transition-colors"
                              title="Tolak"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      {(user.role === "admin_bos" ||
                        user.role === "super_admin") &&
                        item.status !== "PENDING_VERIF" && (
                          <button
                            onClick={() => onEdit(item)}
                            className="p-2 bg-gray-50 text-gray-500 hover:bg-gray-100 dark:bg-gray-700/30 dark:text-gray-400 rounded-xl transition-colors"
                            title="Edit Admin"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        )}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
