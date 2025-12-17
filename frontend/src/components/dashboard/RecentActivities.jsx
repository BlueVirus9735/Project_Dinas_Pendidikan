import React from "react";
import { Clock, ArrowUpRight, School, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function RecentActivities({ activities, userRole }) {
  const navigate = useNavigate();
  const isVisible = ["super_admin", "admin_ijazah"].includes(userRole);

  if (!isVisible) return null;

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-xl">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Aktivitas Arsip Terbaru
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Update terakhir data ijazah masuk.
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate("/data-ijazah")}
          className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 hover:gap-2 transition-all px-4 py-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"
        >
          Lihat Semua
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {activities.length > 0 ? (
          activities.map((item, idx) => (
            <div
              key={idx}
              className="group flex items-start gap-4 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/20">
                {item.nama ? item.nama.charAt(0) : "?"}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-gray-900 dark:text-white truncate text-base mb-1 group-hover:text-blue-600 transition-colors">
                  {item.nama}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate mb-2">
                  {item.sekolah}
                </p>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-2.5 py-1 bg-blue-100/80 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-[10px] font-bold uppercase tracking-wide">
                    <School className="w-3 h-3 mr-1" />
                    Lulusan {item.tahun}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center py-12 flex flex-col items-center opacity-60">
            <FileText className="w-12 h-12 text-gray-300 mb-3" />
            <p className="text-gray-500">
              Belum ada arsip ijazah yang tersimpan.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
