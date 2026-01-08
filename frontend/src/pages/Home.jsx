import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import LandingNavbar from "../components/landing/LandingNavbar";
import HeroSection from "../components/landing/HeroSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import PublicVerification from "../components/landing/PublicVerification";
import HowItWorks from "../components/landing/HowItWorks";
import FAQSection from "../components/landing/FAQSection";
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
    fetch("http://localhost:8000/api/public/stats.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setStats({
            sekolah: data.data.sekolah || 0,
            arsip: data.data.arsip || 0,
            siswa: data.data.siswa || 0,
          });
        }
      })
      .catch((err) => console.error("Failed to fetch stats:", err));
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-deep-navy dark:text-white font-sans selection:bg-rich-gold selection:text-white overflow-x-hidden">
      {/* Subtle Background Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <div className="absolute inset-0 archive-pattern"></div>
      </div>

      <LandingNavbar />

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-12 lg:pt-24 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <HeroSection isAuthenticated={isAuthenticated} stats={stats} />
          <LandingVisual />
        </div>
      </main>

      {/* Features Section */}
      <FeaturesSection />

      {/* Public Verification */}
      <div id="verifikasi">
        <PublicVerification />
      </div>

      {/* How It Works */}
      <HowItWorks />

      {/* FAQ Section */}
      <FAQSection />

      <LandingFooter />
    </div>
  );
}
