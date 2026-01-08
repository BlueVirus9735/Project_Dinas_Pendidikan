import React from "react";
import { Calendar, Sparkles } from "lucide-react";

export default function DashboardHeader({ user }) {
  return (
    <div className="relative backdrop-blur-xl bg-white/50 dark:bg-slate-900/50 border-b border-gray-200/50 dark:border-white/10 pb-12 pt-8 mb-[-2rem]">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-transparent pointer-events-none"></div>

      {/* Sparkle Decorations */}
      <div className="absolute top-8 right-12 text-blue-400/20 animate-pulse hidden md:block">
        <Sparkles className="w-6 h-6" />
      </div>
      <div
        className="absolute bottom-8 left-12 text-purple-400/20 animate-pulse hidden md:block"
        style={{ animationDelay: "1.5s" }}
      >
        <Sparkles className="w-5 h-5" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
        <div className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            <span className="text-gray-800 dark:text-white">
              Selamat Datang{" "}
            </span>
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 dark:from-blue-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
              {user?.username || "Admin"}
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-base font-medium flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
            Sistem Arsip Digital Dinas Pendidikan Kabupaten Cirebon
          </p>
        </div>

        <div className="relative group">
          {/* Card Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <div className="relative flex items-center gap-4 backdrop-blur-xl bg-white/70 dark:bg-slate-800/70 px-6 py-4 rounded-2xl border border-gray-200/50 dark:border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl shadow-lg">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div className="text-right">
              <p className="text-gray-800 dark:text-gray-100 font-bold text-sm leading-none mb-2">
                {new Date().toLocaleDateString("id-ID", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-xs font-medium flex items-center gap-1.5">
                <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></span>
                Update Terakhir: Hari ini
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
