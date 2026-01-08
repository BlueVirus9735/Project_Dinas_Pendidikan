import React from "react";
import { Menu } from "lucide-react";

export default function DashboardNavbar({ setIsSidebarOpen }) {
  return (
    <header className="glass-strong border-b border-gray-200/50 dark:border-white/10 h-16 flex items-center justify-between px-6 sticky top-0 z-40 transition-smooth shadow-soft">
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 -ml-2 text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-50 dark:hover:from-white/10 dark:hover:to-white/5 rounded-xl md:hidden transition-smooth hover:scale-105 active:scale-95"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-3 md:hidden ml-3">
          <img src="/logo_dinas.png" alt="Logo" className="w-8 h-8" />
          <span className="font-bold text-gray-900 dark:text-white font-serif">
            Disdik Cirebon
          </span>
        </div>
      </div>
    </header>
  );
}
