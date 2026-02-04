import React, { useState } from "react";
import { Bell, Mail, BellRing } from "lucide-react";
import toast from "react-hot-toast";

export default function NotificationSection() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    browserNotifications: false,
    ijazahUpload: true,
    ijazahApproval: true,
    systemUpdates: false,
  });

  const handleToggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    toast.success("Pengaturan notifikasi disimpan");
  };

  const notificationOptions = [
    {
      id: "emailNotifications",
      label: "Email Notifications",
      description: "Terima notifikasi melalui email",
      icon: Mail,
    },
    {
      id: "browserNotifications",
      label: "Browser Notifications",
      description: "Terima notifikasi di browser",
      icon: BellRing,
    },
    {
      id: "ijazahUpload",
      label: "Upload Ijazah",
      description: "Notifikasi saat ada ijazah baru diupload",
      icon: Bell,
    },
    {
      id: "ijazahApproval",
      label: "Persetujuan Ijazah",
      description: "Notifikasi saat ijazah disetujui/ditolak",
      icon: Bell,
    },
    {
      id: "systemUpdates",
      label: "Update Sistem",
      description: "Notifikasi tentang update dan maintenance",
      icon: Bell,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="glass-strong rounded-2xl p-6">
        <h2 className="text-xl font-bold text-deep-navy dark:text-white font-serif mb-6">
          Preferensi Notifikasi
        </h2>

        <div className="space-y-4">
          {notificationOptions.map((option) => {
            const Icon = option.icon;
            const isEnabled = settings[option.id];

            return (
              <div
                key={option.id}
                className="flex items-center justify-between p-4 bg-white/50 dark:bg-gray-900/50 border-2 border-gray-200 dark:border-white/10 rounded-xl hover:border-rich-gold/30 transition-smooth"
              >
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-deep-navy dark:text-white">
                      {option.label}
                    </h3>
                    <p className="text-sm text-archive-slate dark:text-gray-400">
                      {option.description}
                    </p>
                  </div>
                </div>

                {/* Toggle Switch */}
                <button
                  onClick={() => handleToggle(option.id)}
                  className={`relative w-14 h-7 rounded-full transition-smooth ${
                    isEnabled
                      ? "bg-gradient-gold"
                      : "bg-gray-300 dark:bg-gray-700"
                  }`}
                >
                  <div
                    className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-smooth ${
                      isEnabled ? "right-1" : "left-1"
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </div>

        {/* Info */}
        <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-800 rounded-xl">
          <p className="text-sm text-amber-800 dark:text-amber-300">
            <strong>Catatan:</strong> Pengaturan notifikasi akan diterapkan
            secara otomatis.
          </p>
        </div>
      </div>
    </div>
  );
}
