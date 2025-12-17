import React from "react";
import { Menu, Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function DashboardNavbar({ setIsSidebarOpen }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md  h-16 flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 -ml-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl md:hidden transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-3 md:hidden ml-3">
          <img src="/logo_dinas.png" alt="Logo" className="w-8 h-8" />
          <span className="font-bold text-gray-900 dark:text-white">
            Disdik Cirebon
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="h-8 w-[1px] bg-gray-200 dark:bg-gray-700 mx-2"></div>
        <button
          onClick={toggleTheme}
          className="relative p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-all active:scale-95 border border-transparent hover:border-gray-200 dark:hover:border-gray-600"
          title={
            theme === "dark" ? "Ganti ke Mode Terang" : "Ganti ke Mode Gelap"
          }
        >
          {theme === "dark" ? (
            <Sun className="w-5 h-5 text-yellow-400 transition-transform rotate-90" />
          ) : (
            <Moon className="w-5 h-5 text-blue-600 transition-transform -rotate-12" />
          )}
        </button>
      </div>
    </header>
  );
}
