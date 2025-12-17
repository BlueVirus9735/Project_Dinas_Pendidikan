import React from "react";

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
    <div className="flex gap-3 overflow-x-auto pb-1 md:pb-0">
      <select
        value={filterJenjang}
        onChange={(e) => setFilterJenjang(e.target.value)}
        className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20"
      >
        <option value="">Semua Jenjang</option>
        {optionJenjang.map((j) => (
          <option key={j} value={j}>
            {j}
          </option>
        ))}
      </select>

      <select
        value={filterSekolah}
        onChange={(e) => setFilterSekolah(e.target.value)}
        className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 max-w-[150px]"
      >
        <option value="">Semua Sekolah</option>
        {optionSekolah.map((s) => (
          <option key={s.id} value={s.nama_sekolah}>
            {s.nama_sekolah}
          </option>
        ))}
      </select>

      <select
        value={filterTahun}
        onChange={(e) => setFilterTahun(e.target.value)}
        className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20"
      >
        <option value="">Semua Tahun</option>
        {optionTahun.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
    </div>
  );
}
