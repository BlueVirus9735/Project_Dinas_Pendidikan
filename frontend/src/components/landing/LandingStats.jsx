import React from "react";

export default function LandingStats({ stats }) {
  return (
    <div className="pt-12 grid grid-cols-3 gap-8 border-t border-white/10">
      <div>
        <h3 className="text-3xl font-bold text-white">{stats.sekolah || 0}</h3>
        <p className="text-sm text-slate-500 mt-1">Sekolah Terdata</p>
      </div>
      <div>
        <h3 className="text-3xl font-bold text-white">{stats.arsip || 0}</h3>
        <p className="text-sm text-slate-500 mt-1">Arsip Digital</p>
      </div>
      <div>
        <h3 className="text-3xl font-bold text-white">{stats.siswa || 0}</h3>
        <p className="text-sm text-slate-500 mt-1">Siswa Terdata</p>
      </div>
    </div>
  );
}
