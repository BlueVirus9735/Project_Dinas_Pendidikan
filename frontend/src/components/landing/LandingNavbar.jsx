import React from "react";

export default function LandingNavbar() {
  return (
    <nav className="relative z-50 max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl backdrop-blur-xl border border-white/10 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
          <img
            src="/logo_dinas.png"
            alt="Logo"
            className="w-9 h-9 object-contain drop-shadow-md"
          />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white mb-0.5">
            Dinas Pendidikan
          </h1>
          <p className="text-xs text-indigo-200 font-medium tracking-widest uppercase flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Kabupaten Cirebon
          </p>
        </div>
      </div>
    </nav>
  );
}
