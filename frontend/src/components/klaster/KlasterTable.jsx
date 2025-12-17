import React from "react";
import { Download } from "lucide-react";
import { utils, write } from "xlsx";

export default function KlasterTable({ data }) {
  if (!data || !data.details) return null;

  const handleExport = () => {
    const header = [
      "Nama Sekolah",
      "NPSN",
      "Cluster Label",
      "Kategori",
      "Jarak ke Centroid",
    ];
    const rows = data.details.map((item) => [
      item.nama_sekolah,
      item.npsn,
      item.cluster_label,
      item.kategori_cluster,
      item.distance_to_centroid,
    ]);

    const worksheet = utils.aoa_to_sheet([header, ...rows]);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Hasil Clustering");

    const wbout = write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], { type: "application/octet-stream" });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Hasil_Clustering_${new Date().getFullYear()}.xlsx`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors">
      <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/50">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          Detail Pembagian Cluster
        </h2>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-green-600 hover:bg-green-700 rounded-xl transition-all shadow-lg shadow-green-500/20 font-bold"
        >
          <Download className="w-4 h-4" />
          Export Excel
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
          <thead className="bg-gray-50 dark:bg-gray-700/50 uppercase tracking-wider text-xs font-bold text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700">
            <tr>
              <th className="px-6 py-4">Nama Sekolah</th>
              <th className="px-6 py-4">NPSN</th>
              <th className="px-6 py-4 text-center">Cluster Label</th>
              <th className="px-6 py-4 text-center">Kategori (Saran)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {data.details.map((row, idx) => (
              <tr
                key={idx}
                className="hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors"
              >
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {row.nama_sekolah}
                </td>
                <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                  {row.npsn}
                </td>
                <td className="px-6 py-4 text-center">
                  <span
                    className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-white shadow-sm
                                      ${
                                        row.cluster_label == 0
                                          ? "bg-blue-500 ring-4 ring-blue-100 dark:ring-blue-900/30"
                                          : row.cluster_label == 1
                                          ? "bg-purple-500 ring-4 ring-purple-100 dark:ring-purple-900/30"
                                          : "bg-orange-500 ring-4 ring-orange-100 dark:ring-orange-900/30"
                                      }`}
                  >
                    {row.cluster_label}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase
                    ${
                      row.cluster_label == 0
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                        : row.cluster_label == 1
                        ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                        : "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300"
                    }
                  `}
                  >
                    {row.kategori_cluster ||
                      (row.cluster_label == 0
                        ? "Prioritas Rendah"
                        : row.cluster_label == 1
                        ? "Prioritas Sedang"
                        : "Prioritas Tinggi")}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
