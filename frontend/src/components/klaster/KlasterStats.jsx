import React from "react";
import { LayoutGrid, Calendar, School } from "lucide-react";

export default function KlasterStats({ data }) {
  if (!data) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4 transition-colors">
        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl">
          <LayoutGrid className="w-6 h-6" />
        </div>
        <div>
          <div className="text-gray-500 dark:text-gray-400 text-sm font-bold">
            Jumlah Cluster
          </div>
          <div className="text-3xl font-extrabold text-gray-900 dark:text-white mt-1">
            {data.riwayat.jumlah_cluster}
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4 transition-colors">
        <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl">
          <Calendar className="w-6 h-6" />
        </div>
        <div>
          <div className="text-gray-500 dark:text-gray-400 text-sm font-bold">
            Tanggal Proses
          </div>
          <div className="text-lg font-bold text-gray-900 dark:text-white mt-1">
            {data.riwayat.tanggal_proses}
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4 transition-colors">
        <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl">
          <School className="w-6 h-6" />
        </div>
        <div>
          <div className="text-gray-500 dark:text-gray-400 text-sm font-bold">
            Total Sekolah
          </div>
          <div className="text-3xl font-extrabold text-gray-900 dark:text-white mt-1">
            {data.details.length}
          </div>
        </div>
      </div>
    </div>
  );
}
