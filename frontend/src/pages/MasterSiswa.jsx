import React, { useState, useEffect } from "react";
import { api } from "../services/api";
import { Users, Loader, Search, Filter, LayoutGrid, List } from "lucide-react";

export default function MasterSiswa() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterJenjang, setFilterJenjang] = useState("SEMUA");
  const [viewMode, setViewMode] = useState("card"); // "card" or "list"

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await api.get("/get-students.php");
      if (response.data.status) {
        setStudents(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = students.filter((student) => {
    const matchSearch =
      student.nama?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.nisn?.includes(searchTerm) ||
      student.sekolah_asal?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchJenjang =
      filterJenjang === "SEMUA" || student.jenjang === filterJenjang;

    return matchSearch && matchJenjang;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden backdrop-blur-sm bg-white/80 dark:bg-gray-800/90">
        {/* Header */}
        <div className="p-6 bg-gradient-archive dark:from-deep-navy dark:to-blue-900 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          {/* Decorative Pattern */}
          <div className="absolute inset-0 bg-archive-pattern opacity-10 pointer-events-none"></div>

          <div className="flex items-center gap-4 relative z-10">
            <div className="p-3.5 bg-white/10 rounded-xl backdrop-blur-md border border-white/20 shadow-glow-gold">
              <Users className="w-8 h-8 text-official-gold" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-serif text-white tracking-wide">
                Master Data Siswa
              </h1>
              <p className="text-blue-100/80 text-sm font-medium">
                Database induk seluruh siswa terdaftar
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 relative z-10 w-full md:w-auto items-center">
            {/* View Toggle */}
            <div className="flex bg-white/10 rounded-lg p-1 border border-white/20 mr-2">
              <button
                onClick={() => setViewMode("card")}
                className={`p-2 rounded-md transition-all ${
                  viewMode === "card"
                    ? "bg-white/20 text-official-gold shadow-sm"
                    : "text-white/60 hover:text-white"
                }`}
                title="Tampilan Grid"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md transition-all ${
                  viewMode === "list"
                    ? "bg-white/20 text-official-gold shadow-sm"
                    : "text-white/60 hover:text-white"
                }`}
                title="Tampilan Tabel"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Filter Dropdown */}
            <div className="relative group w-full sm:w-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-4 w-4 text-white/70 group-hover:text-official-gold transition-colors" />
              </div>
              <select
                value={filterJenjang}
                onChange={(e) => setFilterJenjang(e.target.value)}
                className="w-full sm:w-40 pl-10 pr-8 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-official-gold/50 focus:border-official-gold/50 transition-all appearance-none cursor-pointer hover:bg-white/20 text-sm font-medium"
              >
                <option value="SEMUA" className="text-gray-800">
                  Semua Jenjang
                </option>
                <option value="SD" className="text-gray-800">
                  SD / MI
                </option>
                <option value="SMP" className="text-gray-800">
                  SMP / MTs
                </option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg
                  className="w-4 h-4 text-white/70"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-64 group">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-white/50 group-hover:text-official-gold transition-colors" />
              <input
                type="text"
                placeholder="Cari Nama / NISN..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-official-gold/50 focus:border-official-gold/50 transition-all text-sm font-medium hover:bg-white/20"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 bg-gray-50/50 dark:bg-gray-900/50 min-h-[500px]">
          {loading ? (
            <div className="flex flex-col justify-center items-center h-96 gap-4">
              <div className="p-4 bg-white dark:bg-gray-800 rounded-full shadow-xl animate-bounce">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <div className="flex items-center gap-2">
                <Loader className="w-5 h-5 animate-spin text-blue-600" />
                <span className="text-gray-500 font-medium">
                  Memuat data siswa...
                </span>
              </div>
            </div>
          ) : (
            <>
              {filteredStudents.length > 0 ? (
                viewMode === "card" ? (
                  // CARD VIEW
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredStudents.map((student, index) => (
                      <div
                        key={student.id}
                        className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-soft hover:shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-300 relative overflow-hidden"
                      >
                        {/* Decorative Background */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-bl-full -mr-10 -mt-10 group-hover:scale-110 transition-transform duration-500"></div>

                        {/* Header Card */}
                        <div className="flex justify-between items-start mb-4 relative z-10">
                          <div>
                            <h3
                              className="text-lg font-bold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1"
                              title={student.nama}
                            >
                              {student.nama}
                            </h3>
                            <span className="inline-block mt-1 px-2.5 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-mono font-semibold border border-gray-200 dark:border-gray-600 group-hover:border-blue-200 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-all">
                              {student.nisn}
                            </span>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wide uppercase border shadow-sm ${
                              student.jenjang === "SD"
                                ? "bg-red-50 text-red-600 border-red-100"
                                : student.jenjang === "SMP"
                                ? "bg-blue-50 text-blue-600 border-blue-100"
                                : "bg-gray-50 text-gray-600 border-gray-100"
                            }`}
                          >
                            {student.jenjang}
                          </span>
                        </div>

                        {/* Body Info */}
                        <div className="space-y-3 mb-5 relative z-10">
                          {/* Tgl Lahir */}
                          <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                            <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                              <svg
                                className="w-4 h-4 text-blue-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                            </div>
                            <span className="truncate">
                              {student.tanggal_lahir}
                            </span>
                          </div>

                          {/* Sekolah Asal */}
                          <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                            <div className="w-8 h-8 rounded-full bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center shrink-0">
                              <svg
                                className="w-4 h-4 text-purple-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                />
                              </svg>
                            </div>
                            <span
                              className="truncate"
                              title={student.sekolah_asal}
                            >
                              {student.sekolah_asal}
                            </span>
                          </div>
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-gray-100 dark:bg-gray-700 my-3"></div>

                        {/* Parent Info Section */}
                        <div className="space-y-2 relative z-10">
                          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                            Data Orang Tua
                          </h4>
                          <div className="grid grid-cols-2 gap-2">
                            {/* Ayah */}
                            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2.5 border border-gray-100 dark:border-gray-700">
                              <p className="text-[10px] text-gray-400 mb-0.5">
                                Ayah
                              </p>
                              <p
                                className="text-xs font-semibold text-gray-700 dark:text-gray-200 truncate"
                                title={student.nama_ayah}
                              >
                                {student.nama_ayah || "-"}
                              </p>
                            </div>

                            {/* Ibu */}
                            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2.5 border border-gray-100 dark:border-gray-700">
                              <p className="text-[10px] text-gray-400 mb-0.5">
                                Ibu
                              </p>
                              <p
                                className="text-xs font-semibold text-gray-700 dark:text-gray-200 truncate"
                                title={student.nama_ibu}
                              >
                                {student.nama_ibu || "-"}
                              </p>
                            </div>
                          </div>
                          {/* Wali (If exists) */}
                          {student.nama_wali && (
                            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2.5 border border-gray-100 dark:border-gray-700 mt-2">
                              <p className="text-[10px] text-gray-400 mb-0.5">
                                Wali
                              </p>
                              <p
                                className="text-xs font-semibold text-gray-700 dark:text-gray-200 truncate"
                                title={student.nama_wali}
                              >
                                {student.nama_wali}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  // TABLE VIEW (Restored)
                  <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 shadow-soft bg-white dark:bg-gray-800">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-gray-50/80 dark:bg-gray-700/50 text-gray-900 dark:text-white font-bold uppercase tracking-wider text-xs backdrop-blur-sm sticky top-0">
                        <tr>
                          <th className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                            No
                          </th>
                          <th className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                            NISN
                          </th>
                          <th className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                            Nama Lengkap
                          </th>
                          <th className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                            Tgl Lahir
                          </th>
                          <th className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                            Nama Ayah
                          </th>
                          <th className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                            Nama Ibu
                          </th>
                          <th className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                            Nama Wali
                          </th>
                          <th className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                            Asal Sekolah
                          </th>
                          <th className="px-6 py-4 text-center border-b border-gray-200 dark:border-gray-700">
                            Jenjang
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
                        {filteredStudents.map((student, index) => (
                          <tr
                            key={student.id}
                            className="hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors group"
                          >
                            <td className="px-6 py-4 text-gray-500 font-medium">
                              {index + 1}
                            </td>
                            <td className="px-6 py-4">
                              <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600">
                                {student.nisn}
                              </span>
                            </td>
                            <td className="px-6 py-4 font-bold text-gray-800 dark:text-gray-200">
                              {student.nama}
                            </td>
                            <td className="px-6 py-4 text-gray-600 dark:text-gray-400 text-xs">
                              {student.tanggal_lahir}
                            </td>
                            <td className="px-6 py-4 text-gray-600 dark:text-gray-400 text-xs max-w-[100px] truncate">
                              {student.nama_ayah || "-"}
                            </td>
                            <td className="px-6 py-4 text-gray-600 dark:text-gray-400 text-xs max-w-[100px] truncate">
                              {student.nama_ibu || "-"}
                            </td>
                            <td className="px-6 py-4 text-gray-600 dark:text-gray-400 text-xs max-w-[100px] truncate">
                              {student.nama_wali || "-"}
                            </td>
                            <td className="px-6 py-4 text-gray-600 dark:text-gray-400 text-xs">
                              {student.sekolah_asal}
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span
                                className={`px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wide uppercase border ${
                                  student.jenjang === "SD"
                                    ? "bg-red-50 text-red-600 border-red-200"
                                    : student.jenjang === "SMP"
                                    ? "bg-blue-50 text-blue-600 border-blue-200"
                                    : "bg-gray-50 text-gray-600 border-gray-200"
                                }`}
                              >
                                {student.jenjang}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )
              ) : (
                <div className="flex flex-col items-center justify-center p-16 text-center">
                  <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
                    <Users className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-1">
                    Data tidak ditemukan
                  </h3>
                  <p className="text-gray-500 text-sm max-w-sm">
                    {searchTerm
                      ? `Tidak ada siswa dengan nama atau NISN "${searchTerm}".`
                      : "Belum ada data siswa yang terdaftar."}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
