import React from "react";
import { Search, RefreshCw } from "lucide-react";

export default function IjazahHeader({
  searchTerm,
  setSearchTerm,
  onRefresh,
  loading,
}) {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
      <div className="w-full md:w-96 bg-white dark:bg-gray-800 p-2 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center group focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all">
        <div className="pl-4 pr-3 text-gray-400 group-focus-within:text-emerald-500 transition-colors">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          placeholder="Cari Siswa, NISN, atau Sekolah..."
          className="w-full bg-transparent border-none focus:ring-0 text-gray-700 dark:text-gray-200 placeholder-gray-400 h-10 text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <button
        onClick={onRefresh}
        className="p-3 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-100 dark:border-gray-700 shadow-sm transition-colors flex gap-2 items-center text-sm font-medium"
      >
        <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
        Refresh Data
      </button>
    </div>
  );
}
