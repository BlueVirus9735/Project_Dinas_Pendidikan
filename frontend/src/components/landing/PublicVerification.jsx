import React, { useState } from "react";
import { Search, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import API_BASE_URL from "../../config";

export default function PublicVerification() {
  const [nomorIjazah, setNomorIjazah] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!nomorIjazah.trim()) {
      setError("Nomor ijazah wajib diisi");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(`${API_BASE_URL}/public/verify-ijazah.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nomor_ijazah: nomorIjazah }),
      });

      const data = await response.json();

      if (data.status) {
        setResult(data.data);
      } else {
        setError(data.message || "Ijazah tidak ditemukan");
      }
    } catch (err) {
      console.error("Verification error:", err);
      setError("Terjadi kesalahan saat verifikasi. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setNomorIjazah("");
    setResult(null);
    setError("");
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-deep-navy dark:text-white mb-4 font-serif">
            Verifikasi Ijazah
          </h2>
          <p className="text-lg text-archive-slate dark:text-gray-400">
            Cek keaslian ijazah secara online dengan memasukkan nomor ijazah
          </p>
        </div>

        {/* Verification Form */}
        <div className="glass-strong rounded-2xl p-8 border-2 border-gray-200/50 dark:border-white/10 shadow-glass-lg">
          <form onSubmit={handleVerify} className="space-y-6">
            {/* Input */}
            <div>
              <label className="block text-sm font-bold text-deep-navy dark:text-white mb-2">
                Nomor Ijazah
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={nomorIjazah}
                  onChange={(e) => setNomorIjazah(e.target.value)}
                  placeholder="Contoh: DC-XNXX-XHAMSTER"
                  className="w-full px-4 py-3 pl-12 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-white/10 rounded-xl text-deep-navy dark:text-white focus:ring-2 focus:ring-rich-gold/50 focus:border-rich-gold/50 outline-none"
                  disabled={loading}
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-gradient-gold text-white rounded-xl font-semibold hover:shadow-glow-gold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Memverifikasi..." : "Verifikasi Sekarang"}
            </button>
          </form>

          {/* Error Message */}
          {error && (
            <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-red-800 dark:text-red-200">
                  {error}
                </p>
              </div>
            </div>
          )}

          {/* Success Result */}
          {result && (
            <div className="mt-6 space-y-4">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-green-800 dark:text-green-200 mb-1">
                    ✓ Ijazah Valid & Terverifikasi
                  </p>
                  <p className="text-xs text-green-700 dark:text-green-300">
                    Data ijazah ditemukan dalam sistem
                  </p>
                </div>
              </div>

              {/* Result Details */}
              <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl space-y-3">
                <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-3">
                  <span className="text-sm text-archive-slate dark:text-gray-400">
                    Nama
                  </span>
                  <span className="text-sm font-bold text-deep-navy dark:text-white">
                    {result.nama}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-3">
                  <span className="text-sm text-archive-slate dark:text-gray-400">
                    Sekolah
                  </span>
                  <span className="text-sm font-bold text-deep-navy dark:text-white">
                    {result.sekolah}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-archive-slate dark:text-gray-400">
                    Tahun Lulus
                  </span>
                  <span className="text-sm font-bold text-deep-navy dark:text-white">
                    {result.tahun}
                  </span>
                </div>
              </div>

              {/* Reset Button */}
              <button
                onClick={handleReset}
                className="w-full px-6 py-3 bg-gray-200 dark:bg-gray-700 text-deep-navy dark:text-white rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Verifikasi Ijazah Lain
              </button>
            </div>
          )}

          {/* Privacy Notice */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-xs text-blue-800 dark:text-blue-200">
                <strong>Privasi Terjaga:</strong> Hanya informasi dasar yang
                ditampilkan. Data sensitif seperti NISN dan dokumen tidak dapat
                diakses publik.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
