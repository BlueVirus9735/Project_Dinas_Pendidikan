import React from "react";
import { GraduationCap, School, Calendar } from "lucide-react";
import FilterCard from "../common/FilterCard";

export default function IjazahFilter({
  filterJenjang,
  setFilterJenjang,
  filterSekolah,
  setFilterSekolah,
  filterTahun,
  setFilterTahun,
  optionJenjang,
  optionSekolah,
  optionTahun,
}) {
  return (
    <div className="mb-6">
      {/* Premium Filter Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-slide-up">
        {/* Jenjang Filter */}
        <FilterCard
          icon={GraduationCap}
          label="Jenjang Pendidikan"
          value={filterJenjang}
          onChange={(e) => setFilterJenjang(e.target.value)}
          options={optionJenjang}
          placeholder="Semua Jenjang"
        />

        {/* Sekolah Filter */}
        <FilterCard
          icon={School}
          label="Sekolah"
          value={filterSekolah}
          onChange={(e) => setFilterSekolah(e.target.value)}
          options={optionSekolah}
          placeholder="Semua Sekolah"
          optionKey="nama_sekolah"
          optionLabel="nama_sekolah"
        />

        {/* Tahun Filter */}
        <FilterCard
          icon={Calendar}
          label="Tahun Lulus"
          value={filterTahun}
          onChange={(e) => setFilterTahun(e.target.value)}
          options={optionTahun}
          placeholder="Semua Tahun"
        />
      </div>

      {/* Active Filters Summary */}
      {(filterJenjang || filterSekolah || filterTahun) && (
        <div className="mt-4 flex items-center gap-2 flex-wrap animate-slide-up">
          <span className="text-sm font-semibold text-archive-slate dark:text-gray-400">
            Filter Aktif:
          </span>
          {filterJenjang && (
            <span className="px-3 py-1.5 bg-gradient-gold text-white text-xs font-bold rounded-lg shadow-glow-gold flex items-center gap-2">
              <GraduationCap className="w-3.5 h-3.5" />
              {filterJenjang}
            </span>
          )}
          {filterSekolah && (
            <span className="px-3 py-1.5 bg-gradient-gold text-white text-xs font-bold rounded-lg shadow-glow-gold flex items-center gap-2">
              <School className="w-3.5 h-3.5" />
              {filterSekolah}
            </span>
          )}
          {filterTahun && (
            <span className="px-3 py-1.5 bg-gradient-gold text-white text-xs font-bold rounded-lg shadow-glow-gold flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" />
              {filterTahun}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
