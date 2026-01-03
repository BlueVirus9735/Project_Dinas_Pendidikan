import React from "react";
import { Link } from "react-router-dom";
import { Activity } from "lucide-react";
import LandingStats from "./LandingStats";

export default function HeroSection({ isAuthenticated, stats }) {
  return (
    <div className="space-y-8 animate-in slide-in-from-left-10 duration-1000 fade-in">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-widest">
        <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
        Sistem Informasi Terpadu
      </div>

      <h1 className="text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight">
        Transformasi <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400">
          Pendidikan Digital
        </span>
      </h1>

      <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
        Platform manajemen data pendidikan Kabupaten Cirebon yang terintegrasi.
        Mengelola Arsip Ijazah
      </p>

      <div className="flex flex-wrap gap-4 pt-4">
        <Link
          to={isAuthenticated ? "/dashboard" : "/login"}
          className="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/40 hover:-translate-y-1 transition-all flex items-center gap-3"
        >
          <Activity className="w-5 h-5" />
          {isAuthenticated ? "Buka Dashboard" : "Masuk Aplikasi"}
        </Link>
      </div>

      <LandingStats stats={stats} />
    </div>
  );
}
