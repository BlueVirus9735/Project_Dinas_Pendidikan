import React from "react";
import { LayoutGrid } from "lucide-react";

export default function KlasterHeader({ tahun, setTahun }) {
  return (
    <>
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
          <LayoutGrid className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          Hasil Clustering
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1 ml-11">
          Daftar sekolah berdasarkan kelompok hasil evaluasi
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
          Filter Tahun Hasil
        </label>
        <div className="flex gap-4">
          <input
            type="number"
            value={tahun}
            onChange={(e) => setTahun(e.target.value)}
            placeholder="2024"
            className="w-full md:w-48 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
          />
        </div>
      </div>
    </>
  );
}
