import React, { useState, useEffect } from "react";
import {
  X,
  Plus,
  Edit,
  School,
  TrendingUp,
  Database,
  CheckCircle,
  FileSpreadsheet,
  ChevronRight,
} from "lucide-react";
import DamageDetailModal from "./DamageDetailModal";

export default function BOSFormModal({
  isOpen,
  onClose,
  onSubmit,
  isEditing,
  initialData,
  user,
}) {
  // Internal state for the form so we don't pollute the parent component
  const defaultForm = {
    nama_sekolah: "",
    npsn: "",
    alamat: "",
    tahun: new Date().getFullYear(),
    jumlah_siswa: 0,
    jumlah_guru: 0,
    jumlah_rombel: 0,
    dana_bos: 0,
    kondisi_fasilitas_rusak: 0,
    akreditasi: "Belum",
    status: "DRAFT",
    file_bukti: null,
    detail_kerusakan_list: [],
    detail_kerusakan: "[]",
  };

  const [formData, setFormData] = useState(defaultForm);
  const [submitting, setSubmitting] = useState(false);
  const [isDamageModalOpen, setIsDamageModalOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (isEditing && initialData) {
        let details = [];
        try {
          if (initialData.detail_kerusakan) {
            details =
              typeof initialData.detail_kerusakan === "string"
                ? JSON.parse(initialData.detail_kerusakan)
                : initialData.detail_kerusakan;
          }
        } catch (e) {
          console.error("Failed to parse detail_kerusakan", e);
        }

        setFormData({
          ...defaultForm,
          ...initialData,
          detail_kerusakan_list: Array.isArray(details) ? details : [],
        });
      } else if (user?.role === "operator_sekolah") {
        setFormData((prev) => ({
          ...defaultForm, // Reset first
          nama_sekolah: user.nama_sekolah || "",
          npsn: user.npsn || "",
          sekolah_id: user.sekolah_id,
          jumlah_siswa: user.jumlah_siswa || 0,
        }));
      } else {
        setFormData(defaultForm);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, isEditing, initialData, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEvidenceFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      file_bukti: e.target.files[0],
    }));
  };

  const handleSubmit = async (e, targetStatus = "DRAFT") => {
    e.preventDefault();
    setSubmitting(true);
    await onSubmit(formData, targetStatus);
    setSubmitting(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      ></div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden relative z-10 animate-in zoom-in-95 duration-300 border border-white/20 dark:border-white/10">
        <div className="px-8 py-6 flex justify-between items-center shrink-0 border-b border-gray-100 dark:border-white/10 bg-gray-50/50 dark:bg-white/5">
          <div className="flex items-center gap-4">
            <div
              className={`p-3 rounded-xl ${
                isEditing
                  ? "bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-500"
                  : "bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-500"
              }`}
            >
              {isEditing ? (
                <Edit className="w-6 h-6" />
              ) : (
                <Plus className="w-6 h-6" />
              )}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                {isEditing ? "Perbarui Data Sekolah" : "Tambah Data Sekolah"}
              </h3>
              <p className="text-sm text-gray-500 dark:text-slate-400 font-medium">
                {isEditing
                  ? "Silakan edit informasi di bawah ini."
                  : "Masukkan informasi sekolah baru."}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-white/5 text-gray-400 dark:text-slate-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/20 dark:hover:text-red-400 transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <form className="p-8 overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-7 space-y-6">
              <div className="bg-gray-50 dark:bg-slate-800/50 p-6 rounded-2xl space-y-5 border border-gray-100 dark:border-white/5">
                <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 text-sm uppercase tracking-wider">
                  <School className="w-4 h-4 text-blue-500" /> Identitas Sekolah
                </h4>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide ml-1">
                      Nama Sekolah
                    </label>
                    <input
                      required
                      name="nama_sekolah"
                      value={formData.nama_sekolah}
                      onChange={handleInputChange}
                      disabled={isEditing || user?.role === "operator_sekolah"}
                      className={`w-full px-5 py-3.5 border rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium ${
                        isEditing || user?.role === "operator_sekolah"
                          ? "bg-gray-100 dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-500 dark:text-slate-500 cursor-not-allowed"
                          : "bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500"
                      }`}
                      placeholder="Masukan nama sekolah"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide ml-1">
                        NPSN
                      </label>
                      <input
                        required
                        name="npsn"
                        value={formData.npsn}
                        onChange={handleInputChange}
                        disabled={
                          isEditing || user?.role === "operator_sekolah"
                        }
                        className={`w-full px-5 py-3.5 border rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-mono font-medium ${
                          isEditing || user?.role === "operator_sekolah"
                            ? "bg-gray-100 dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-500 dark:text-slate-500 cursor-not-allowed"
                            : "bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500"
                        }`}
                        placeholder="8 Digit NPSN"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide ml-1">
                        Tahun Data
                      </label>
                      <input
                        type="number"
                        name="tahun"
                        value={formData.tahun}
                        onChange={handleInputChange}
                        disabled={isEditing}
                        className="w-full px-5 py-3.5 border border-gray-200 dark:border-slate-700 rounded-xl bg-gray-50 dark:bg-slate-800 text-center font-bold text-gray-700 dark:text-white outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide ml-1">
                      Alamat Lengkap
                    </label>
                    <textarea
                      required
                      name="alamat"
                      rows="2"
                      value={formData.alamat}
                      onChange={handleInputChange}
                      className="w-full px-5 py-3.5 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all resize-none font-medium bg-white dark:bg-slate-800 text-gray-700 dark:text-white leading-relaxed placeholder-gray-400 dark:placeholder-slate-500"
                      placeholder="Jalan, Desa/Kelurahan, Kecamatan..."
                    />
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-slate-800/50 p-6 rounded-2xl space-y-5 border border-blue-100 dark:border-white/5">
                <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 text-sm uppercase tracking-wider">
                  <TrendingUp className="w-4 h-4 text-blue-500" /> Informasi
                  Anggaran
                </h4>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wide ml-1">
                    Dana BOS Diterima
                  </label>
                  <div className="relative group">
                    <div className="absolute left-0 top-0 bottom-0 w-12 bg-blue-100 dark:bg-slate-700 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center rounded-l-xl border-y border-l border-blue-200 dark:border-slate-600 group-focus-within:border-blue-500 group-focus-within:bg-blue-600 group-focus-within:text-white transition-all">
                      Rp
                    </div>
                    <input
                      type="number"
                      name="dana_bos"
                      value={formData.dana_bos}
                      onChange={handleInputChange}
                      className="w-full pl-16 pr-5 py-4 border border-blue-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-mono text-lg font-bold text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-slate-500"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-5 space-y-6">
              <div className="bg-gray-50 dark:bg-slate-800/50 p-6 border border-gray-100 dark:border-white/5 rounded-2xl space-y-5 shadow-sm">
                <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 text-sm uppercase tracking-wider">
                  <Database className="w-4 h-4 text-emerald-500" /> Data
                  Statistik
                </h4>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wide">
                      Jml Siswa
                    </label>
                    <input
                      type="number"
                      name="jumlah_siswa"
                      value={formData.jumlah_siswa}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-bold text-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-slate-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wide">
                      Jml Guru
                    </label>
                    <input
                      type="number"
                      name="jumlah_guru"
                      value={formData.jumlah_guru}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-bold text-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-slate-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wide">
                      Rombel
                    </label>
                    <input
                      type="number"
                      name="jumlah_rombel"
                      value={formData.jumlah_rombel}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-bold text-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-slate-500"
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <label className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wide">
                        Rusak
                      </label>
                      <div className="text-right">
                        <div className="text-[10px] font-bold text-red-500 uppercase tracking-wider mb-1">
                          Total Skor
                        </div>
                        <div className="text-3xl font-black text-red-600 dark:text-red-400 leading-none">
                          {formData.kondisi_fasilitas_rusak}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsDamageModalOpen(true)}
                      className="group relative w-full p-4 flex items-center gap-4 bg-white dark:bg-slate-800 border-2 border-dashed border-red-200 dark:border-red-500/30 hover:border-red-500 dark:hover:border-red-400 text-left rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10 active:scale-[0.98]"
                    >
                      <div className="w-12 h-12 bg-red-50 dark:bg-red-500/10 rounded-2xl flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                        <Database className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h5 className="font-bold text-gray-800 dark:text-white text-base group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                          {!user || user.role === "operator_sekolah"
                            ? "Pilih"
                            : "Pilih"}
                        </h5>
                        <p className="text-xs font-medium text-gray-400 dark:text-slate-500 mt-0.5">
                          {formData.detail_kerusakan_list &&
                          formData.detail_kerusakan_list.length > 0 ? (
                            <span>
                              {formData.detail_kerusakan_list.length} item
                              tercatat
                            </span>
                          ) : (
                            <span>Klik Input</span>
                          )}
                        </p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-slate-700/50 text-gray-400 flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-all duration-300">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </button>

                    <DamageDetailModal
                      isOpen={isDamageModalOpen}
                      onClose={() => setIsDamageModalOpen(false)}
                      initialList={formData.detail_kerusakan_list}
                      userRole={user?.role}
                      onSave={(newItems) => {
                        const totalScore = newItems.reduce(
                          (acc, curr) =>
                            acc + Number(curr.count) * Number(curr.score),
                          0
                        );
                        setFormData((prev) => ({
                          ...prev,
                          detail_kerusakan_list: newItems,
                          kondisi_fasilitas_rusak: totalScore,
                          detail_kerusakan: JSON.stringify(newItems),
                        }));
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-slate-800/50 p-6 border border-gray-100 dark:border-white/5 rounded-2xl space-y-4 shadow-sm">
                <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 text-sm uppercase tracking-wider mb-2">
                  <CheckCircle className="w-4 h-4 text-purple-500" /> Status
                  Akreditasi
                </h4>
                <div className="space-y-3">
                  {["A", "B", "C", "Tidak Terakreditasi"].map((opt) => (
                    <div
                      key={opt}
                      onClick={() =>
                        setFormData({ ...formData, akreditasi: opt })
                      }
                      className={`relative cursor-pointer group flex items-center gap-4 p-3 rounded-xl border transition-all duration-200 ${
                        formData.akreditasi === opt
                          ? "bg-purple-50 dark:bg-purple-500/20 border-purple-500 shadow-sm"
                          : "hover:bg-gray-100 dark:hover:bg-white/5 border-gray-200 dark:border-slate-700"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          formData.akreditasi === opt
                            ? "border-purple-600 dark:border-purple-500"
                            : "border-gray-300 dark:border-slate-600"
                        }`}
                      >
                        {formData.akreditasi === opt && (
                          <div className="w-2.5 h-2.5 rounded-full bg-purple-600 dark:bg-purple-500" />
                        )}
                      </div>
                      <span
                        className={`font-medium ${
                          formData.akreditasi === opt
                            ? "text-purple-700 dark:text-purple-400"
                            : "text-gray-600 dark:text-slate-400"
                        }`}
                      >
                        {opt === "Tidak Terakreditasi"
                          ? "Belum / Tidak Terakreditasi"
                          : `Terakreditasi ${opt}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-slate-800/50 p-6 border border-gray-100 dark:border-white/5 rounded-2xl space-y-4 shadow-sm">
                <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 text-sm uppercase tracking-wider mb-2">
                  <FileSpreadsheet className="w-4 h-4 text-orange-500" />{" "}
                  Dokumen Pendukung (BKU)
                </h4>
                <input
                  type="file"
                  accept=".pdf,.xls,.xlsx,.csv,image/*"
                  onChange={handleEvidenceFileChange}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all"
                />
                <p className="text-xs text-gray-400">
                  Upload bukti BKU atau laporan keuangan. Format: PDF, Excel,
                  atau Gambar.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-100 dark:border-white/10 flex justify-end gap-3 sticky bottom-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 -mx-8 -mb-8 rounded-b-2xl">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 font-bold transition-all"
            >
              Batal
            </button>
            {!isEditing ||
            (user?.role === "operator_sekolah" &&
              (formData.status === "DRAFT" ||
                formData.status === "REJECTED")) ? (
              <>
                <button
                  type="submit"
                  onClick={(e) => handleSubmit(e, "DRAFT")}
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-xl bg-gray-600 text-white hover:bg-gray-700 font-bold shadow-lg shadow-gray-500/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {submitting ? "Menyimpan..." : "Simpan Draft"}
                </button>
                <button
                  type="submit"
                  onClick={(e) => handleSubmit(e, "PENDING_VERIF")}
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 font-bold shadow-lg shadow-indigo-500/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {submitting ? "Mengirim..." : "Kirim & Verifikasi"}
                </button>
              </>
            ) : (
              <button
                type="submit"
                onClick={(e) => handleSubmit(e, formData.status)} // Keep current status on edit, or handle logic
                disabled={submitting}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 font-bold shadow-lg shadow-indigo-500/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {submitting
                  ? "Menyimpan..."
                  : isEditing
                  ? "Perbarui Data"
                  : "Simpan Data"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
