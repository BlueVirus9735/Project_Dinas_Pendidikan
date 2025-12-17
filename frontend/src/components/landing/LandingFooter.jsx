import React from "react";
import { Link } from "react-router-dom";
import { School, Activity } from "lucide-react";

export default function LandingFooter() {
  return (
    <footer className="relative z-50 border-t border-white/10 bg-slate-900/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-lg font-bold">
                Dinas Pendidikan Kabupaten Cirebon
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              Mewujudkan layanan pendidikan yang prima, merata, dan berkualitas
              melalui transformasi digital yang terintegrasi untuk Kabupaten
              Cirebon.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6">Tautan Cepat</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li>
                <a href="#" className="hover:text-indigo-400 transition-colors">
                  Beranda
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-400 transition-colors">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-400 transition-colors">
                  Layanan
                </a>
              </li>
              <li>
                <Link
                  to="/login"
                  className="hover:text-indigo-400 transition-colors"
                >
                  Portal Login
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6">Hubungi Kami</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center mt-0.5">
                  <School className="w-3 h-3" />
                </div>
                <span>
                  Jl. Sunan Drajat No. 1, Sumber,
                  <br />
                  Kabupaten Cirebon, Jawa Barat
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center">
                  <Activity className="w-3 h-3" />
                </div>
                <span>disdik@cirebonkab.go.id</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} Dinas Pendidikan Kabupaten
            Cirebon. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
