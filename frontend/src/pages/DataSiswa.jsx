import React, { useState } from "react";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import {
  UserPlus,
  Save,
  School,
  User,
  Calendar,
  CreditCard,
  Building,
} from "lucide-react";

export default function DataSiswa() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nisn: "",
    nama: "",
    tanggal_lahir: "",
    nama_ayah: "",
    nama_ibu: "",
    nama_wali: "",
    sekolah_asal: "",
    jenjang: "SD",
  });

  // Effect to auto-fill school & jenjang for operators
  React.useEffect(() => {
    if (user?.role === "operator_sekolah") {
      setFormData((prev) => ({
        ...prev,
        sekolah_asal: user.nama_sekolah || prev.sekolah_asal,
        jenjang: user.jenjang || prev.jenjang,
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/create-student.php", formData);
      if (response.data.status) {
        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: response.data.message,
          timer: 2000,
        });
        // Reset form but keep school if operator
        setFormData({
          nisn: "",
          nama: "",
          tanggal_lahir: "",
          nama_ayah: "",
          nama_ibu: "",
          nama_wali: "",
          sekolah_asal:
            user?.role === "operator_sekolah" ? user.nama_sekolah : "",
          jenjang: user?.role === "operator_sekolah" ? user.jenjang : "SD",
        });
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: error.message || "Terjadi kesalahan sistem.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto min-h-screen">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-deep-navy to-blue-900 border-b border-gray-100 dark:border-gray-700 flex items-center gap-4 text-white">
          <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
            <UserPlus className="w-6 h-6 text-official-gold" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-serif">Tambah Data Siswa</h1>
            <p className="text-blue-100 text-sm">
              Input data induk siswa baru ke dalam sistem
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* NISN */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                NISN
              </label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="nisn"
                  value={formData.nisn}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-deep-navy font-mono"
                  placeholder="Nomor Induk Siswa Nasional"
                  required
                />
              </div>
            </div>

            {/* Nama Lengkap */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                Nama Lengkap
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-deep-navy"
                  placeholder="Nama Siswa Sesuai Ijazah"
                  required
                />
              </div>
            </div>

            {/* Tanggal Lahir */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                Tanggal Lahir
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  name="tanggal_lahir"
                  value={formData.tanggal_lahir}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-deep-navy"
                  required
                />
              </div>
            </div>

            {/* Nama Orang Tua */}
            {/* Data Orang Tua */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                  Nama Ayah
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="nama_ayah"
                    value={formData.nama_ayah}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-deep-navy"
                    placeholder="Nama Ayah Kandung"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                  Nama Ibu
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="nama_ibu"
                    value={formData.nama_ibu}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-deep-navy"
                    placeholder="Nama Ibu Kandung"
                  />
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                  Nama Wali (Opsional)
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="nama_wali"
                    value={formData.nama_wali}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-deep-navy"
                    placeholder="Nama Wali (Jika ada)"
                  />
                </div>
              </div>
            </div>

            {/* Asal Sekolah */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                Asal Sekolah
              </label>
              <div className="relative">
                <School className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="sekolah_asal"
                  value={formData.sekolah_asal}
                  onChange={handleChange}
                  readOnly={user?.role === "operator_sekolah"}
                  className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-deep-navy ${
                    user?.role === "operator_sekolah"
                      ? "opacity-70 cursor-not-allowed bg-gray-200"
                      : ""
                  }`}
                  placeholder="Nama Sekolah"
                  required
                />
              </div>
              {user?.role === "operator_sekolah" && (
                <p className="text-xs text-blue-600 dark:text-blue-400 italic">
                  * Otomatis terisi sesuai sekolah anda
                </p>
              )}
            </div>

            {/* Jenjang */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                Jenjang Pendidikan
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <select
                  name="jenjang"
                  value={formData.jenjang}
                  onChange={handleChange}
                  disabled={user?.role === "operator_sekolah"}
                  className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-deep-navy ${
                    user?.role === "operator_sekolah"
                      ? "opacity-70 cursor-not-allowed bg-gray-200"
                      : ""
                  }`}
                >
                  <option value="SD">SD / MI</option>
                  <option value="SMP">SMP / MTs</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-deep-navy hover:bg-blue-900 text-white rounded-lg font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Menyimpan...</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5 text-official-gold" />
                  <span>Simpan Data Siswa</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
