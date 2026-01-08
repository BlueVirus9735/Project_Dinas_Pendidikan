import React, { useState, useEffect } from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import toast from "react-hot-toast";

export default function AppearanceSection() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    // Apply theme
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Save to localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    toast.success(`Tema diubah ke ${newTheme === "dark" ? "Gelap" : "Terang"}`);
  };

  const themeOptions = [
    {
      id: "light",
      label: "Terang",
      icon: Sun,
      description: "Tampilan terang untuk siang hari",
    },
    {
      id: "dark",
      label: "Gelap",
      icon: Moon,
      description: "Tampilan gelap untuk malam hari",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="glass-strong rounded-2xl p-6">
        <h2 className="text-xl font-bold text-deep-navy dark:text-white font-serif mb-6">
          Tema Aplikasi
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {themeOptions.map((option) => {
            const Icon = option.icon;
            const isActive = theme === option.id;

            return (
              <button
                key={option.id}
                onClick={() => handleThemeChange(option.id)}
                className={`p-6 rounded-xl border-2 transition-smooth text-left ${
                  isActive
                    ? "border-rich-gold bg-gradient-to-br from-rich-gold/10 to-gold-light/10 dark:from-rich-gold/20 dark:to-gold-light/20 shadow-glow-gold"
                    : "border-gray-200 dark:border-white/10 hover:border-rich-gold/50 hover:bg-gray-50 dark:hover:bg-white/5"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      isActive
                        ? "bg-gradient-gold text-white shadow-glow-gold"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`font-bold text-lg mb-1 ${
                        isActive
                          ? "text-rich-gold"
                          : "text-deep-navy dark:text-white"
                      }`}
                    >
                      {option.label}
                    </h3>
                    <p className="text-sm text-archive-slate dark:text-gray-400">
                      {option.description}
                    </p>
                  </div>
                  {isActive && (
                    <div className="w-6 h-6 rounded-full bg-gradient-gold flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Preview */}
        <div className="mt-6 p-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 border-2 border-gray-200 dark:border-white/10 rounded-xl">
          <h3 className="text-sm font-semibold text-archive-slate dark:text-gray-400 mb-3">
            Preview
          </h3>
          <div className="space-y-3">
            <div className="glass-strong p-4 rounded-xl">
              <p className="text-deep-navy dark:text-white font-medium">
                Ini adalah contoh card dengan tema{" "}
                {theme === "dark" ? "gelap" : "terang"}
              </p>
            </div>
            <button className="btn-premium w-full">
              Contoh Tombol Premium
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
