import React from "react";
import { Calendar } from "lucide-react";

export default function DashboardHeader({ user }) {
  return (
    <div className="relative bg-slate-50 pb-32 pt-12 overflow-hidden  shadow-2xl shadow-slate-200 dark:shadow-none mb-[-6rem] z-0">
      <div className="absolute inset-0 select-none pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-slate-900 opacity-90 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay"
        />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[100px] z-20 translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[80px] z-20 -translate-x-1/3 translate-y-1/3"></div>
      </div>

      <div className="relative z-30 max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Selamat Datang, {user?.username || "Admin"}
          </h1>
          <p className="text-slate-300 text-lg max-w-xl">
            Sistem arsip digital Pendidikan Pendidikan
          </p>
        </div>

        <div className="hidden md:flex gap-3">
          <div className="text-right">
            <p className="text-white font-bold text-xl leading-none">
              {new Date().toLocaleDateString("id-ID", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
            <p className="text-slate-400 text-sm">Update Terakhir: Hari ini</p>
          </div>
          <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md border border-white/10">
            <Calendar className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}
