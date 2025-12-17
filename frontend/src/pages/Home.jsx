import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import LandingNavbar from "../components/landing/LandingNavbar";
import HeroSection from "../components/landing/HeroSection";
import LandingVisual from "../components/landing/LandingVisual";
import LandingFooter from "../components/landing/LandingFooter";

export default function Home() {
  const { isAuthenticated } = useAuth();
  const [stats, setStats] = useState({
    sekolah: 0,
    arsip: 0,
    siswa: 0,
  });

  useEffect(() => {
    fetch("http://localhost:8000/api/dashboard.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setStats({
            sekolah: data.data.counts.total_sekolah,
            arsip: data.data.counts.total_ijazah,
            siswa: data.data.counts.total_siswa,
          });
        }
      })
      .catch((err) => console.error("Failed to fetch stats:", err));
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px]"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] opacity-[0.03] mix-blend-overlay"></div>
      </div>

      <LandingNavbar />

      <main className="relative z-40 max-w-7xl mx-auto px-6 pt-12 lg:pt-24 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <HeroSection isAuthenticated={isAuthenticated} stats={stats} />
          <LandingVisual />
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
