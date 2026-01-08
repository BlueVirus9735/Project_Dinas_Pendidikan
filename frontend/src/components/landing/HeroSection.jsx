import React from "react";
import { Link } from "react-router-dom";
import { LogIn, Search, ArrowRight } from "lucide-react";
import AnimatedStats from "./AnimatedStats";

export default function HeroSection({ isAuthenticated, stats }) {
  return (
    <div className="space-y-8">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rich-gold/10 to-gold-light/10 border-2 border-rich-gold/30 rounded-full">
        <div className="w-2 h-2 bg-rich-gold rounded-full"></div>
        <span className="text-sm font-semibold text-rich-gold">
          Sistem Resmi Dinas Pendidikan
        </span>
      </div>

      {/* Main Heading */}
      <div className="space-y-4">
        <h1 className="text-5xl lg:text-6xl font-bold text-deep-navy dark:text-white leading-tight font-serif">
          Sistem Arsip Digital{" "}
          <span className="text-transparent bg-clip-text bg-gradient-gold">
            Ijazah
          </span>
        </h1>
        <p className="text-xl text-archive-slate dark:text-gray-400 font-medium">
          Dinas Pendidikan Kabupaten Cirebon
        </p>
      </div>

      {/* Description */}
      <p className="text-lg text-archive-slate dark:text-gray-400 leading-relaxed max-w-xl">
        Kelola, simpan, dan verifikasi data ijazah siswa secara digital dengan
        aman, cepat, dan mudah. Akses kapan saja, dimana saja.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-wrap gap-4">
        {isAuthenticated ? (
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-gold text-white rounded-xl font-semibold hover:shadow-glow-gold"
          >
            <span>Buka Dashboard</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        ) : (
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-gold text-white rounded-xl font-semibold hover:shadow-glow-gold"
          >
            <LogIn className="w-5 h-5" />
            <span>Masuk Sistem</span>
          </Link>
        )}

        <a
          href="#verifikasi"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-white/10 text-deep-navy dark:text-white rounded-xl font-semibold hover:border-rich-gold hover:text-rich-gold"
        >
          <Search className="w-5 h-5" />
          <span>Verifikasi Ijazah</span>
        </a>
      </div>

      {/* Stats */}
      <AnimatedStats stats={stats} />
    </div>
  );
}
