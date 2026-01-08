import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import { Activity, Sparkles } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardStats from "../components/dashboard/DashboardStats";
import GraduationTrendChart from "../components/dashboard/GraduationTrendChart";

import RecentActivities from "../components/dashboard/RecentActivities";

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const res = await api.get("/dashboard.php");
      if (res.data.status === "success") {
        setStats(res.data.data);
      } else {
        setError(res.data.message || "Gagal mengambil data");
      }
    } catch (err) {
      console.error("Dashboard Fetch Error:", err);
      setError("Terjadi kesalahan koneksi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-12 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 dark:from-slate-950 dark:via-blue-950/50 dark:to-purple-950/30 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]"></div>
      </div>

      {/* Animated Gradient Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-20 -left-40 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div
          className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-gradient-to-r from-purple-400/15 to-pink-400/15 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/4 w-80 h-80 bg-gradient-to-r from-amber-400/10 to-orange-400/10 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 dark:bg-blue-300/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${8 + Math.random() * 12}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Grid Pattern Overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)] -z-10"></div>

      <DashboardHeader user={user} />

      <div className="max-w-7xl mx-auto space-y-6 p-6 md:p-8 relative z-10">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="relative">
              {/* Outer Glow Ring */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 rounded-full blur-xl animate-pulse"></div>

              {/* Spinning Border */}
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 p-1 animate-spin-slow">
                <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center">
                  <Activity className="w-8 h-8 text-blue-500 animate-pulse" />
                </div>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 font-semibold mt-6 animate-pulse flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Memuat data dashboard...
            </p>
          </div>
        ) : error ? (
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition"></div>
            <div className="relative backdrop-blur-xl bg-red-50/80 dark:bg-red-900/20 p-8 rounded-2xl border border-red-200/50 dark:border-red-500/30 shadow-xl">
              <div className="flex items-start gap-4">
                <div className="p-4 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl shadow-lg">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-xl text-red-700 dark:text-red-300 mb-2">
                    Akses Ditolak / Gagal
                  </h3>
                  <p className="text-red-600 dark:text-red-400 font-medium">
                    {error}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : !stats ? (
          <div className="text-center py-32">
            <div className="inline-flex items-center gap-3 px-8 py-4 backdrop-blur-xl bg-white/50 dark:bg-slate-800/50 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl">
              <Activity className="w-5 h-5 text-gray-400" />
              <span className="text-gray-600 dark:text-gray-300 font-medium">
                Tidak ada data arsip ditemukan
              </span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Stats Cards */}
            <div className="md:col-span-12">
              <DashboardStats user={user} stats={stats} />
            </div>

            {/* Chart Section */}
            <div className="md:col-span-8 relative group">
              {/* Card Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border border-gray-200/50 dark:border-white/10 rounded-2xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl min-h-[450px]">
                {/* Sparkle Decoration */}
                <div className="absolute top-4 right-4 text-blue-400/40 animate-pulse">
                  <Sparkles className="w-4 h-4" />
                </div>

                <h3 className="font-bold text-xl mb-6 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg shadow-lg">
                    <Activity className="w-5 h-5 text-white" />
                  </div>
                  Tren Digitalisasi Ijazah
                </h3>
                <GraduationTrendChart
                  data={stats.charts.ijazah_per_year}
                  userRole={user?.role}
                />
              </div>
            </div>

            {/* Recent Activity Section */}
            <div className="md:col-span-4 relative group h-full">
              {/* Card Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border border-gray-200/50 dark:border-white/10 rounded-2xl shadow-xl p-6 h-full flex flex-col transition-all duration-300 hover:shadow-2xl">
                {/* Sparkle Decoration */}
                <div
                  className="absolute top-4 right-4 text-amber-400/40 animate-pulse"
                  style={{ animationDelay: "1s" }}
                >
                  <Sparkles className="w-4 h-4" />
                </div>

                <h3 className="font-bold text-xl mb-6 bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg shadow-lg">
                    <Activity className="w-5 h-5 text-white" />
                  </div>
                  Log Aktivitas
                </h3>
                <div className="flex-1 overflow-y-auto custom-scrollbar -mr-2 pr-2">
                  <RecentActivities
                    activities={stats.recent_docs}
                    userRole={user?.role}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(30px);
            opacity: 0;
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-float {
          animation: float linear infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
}
