import React from "react";
import { TrendingUp } from "lucide-react";

export default function StatsCard({
  title,
  value,
  icon,
  gradient,
  trend,
  trendLabel,
  footerValue,
  isCurrency = false,
  isCount = false,
}) {
  return (
    <div className="group relative overflow-hidden bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-1">
      {/* Dynamic Background Hover Effect */}
      <div
        className={`absolute -right-10 -top-10 w-40 h-40 rounded-full bg-linear-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
      ></div>

      <div className="flex items-center justify-between mb-6 relative z-10">
        <div
          className={`w-14 h-14 rounded-2xl bg-linear-to-br ${gradient} flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
        >
          {icon}
        </div>
        {trend && (
          <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-lg border border-emerald-100 dark:border-emerald-800">
            <TrendingUp className="w-3 h-3" />
            {trend}
          </span>
        )}
      </div>

      <div className="relative z-10">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">
          {title}
        </p>
        <h3 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
          {isCurrency
            ? new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                maximumFractionDigits: 0,
              }).format(value)
            : value}
        </h3>

        <div className="mt-4 pt-4 border-t border-gray-50 dark:border-gray-700 flex items-center gap-2">
          <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${gradient} w-2/3 rounded-full`}
            ></div>
          </div>
          <span className="text-xs text-gray-400 font-medium whitespace-nowrap">
            {footerValue}
          </span>
        </div>
      </div>
    </div>
  );
}
