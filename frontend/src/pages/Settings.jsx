import React, { useState } from "react";
import {
  User,
  Lock,
  Palette,
  Bell,
  Settings as SettingsIcon,
} from "lucide-react";
import ProfileSection from "../components/settings/ProfileSection";
import SecuritySection from "../components/settings/SecuritySection";
import AppearanceSection from "../components/settings/AppearanceSection";
import NotificationSection from "../components/settings/NotificationSection";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profil", icon: User },
    { id: "security", label: "Keamanan", icon: Lock },
    { id: "appearance", label: "Tampilan", icon: Palette },
    { id: "notifications", label: "Notifikasi", icon: Bell },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileSection />;
      case "security":
        return <SecuritySection />;
      case "appearance":
        return <AppearanceSection />;
      case "notifications":
        return <NotificationSection />;
      default:
        return <ProfileSection />;
    }
  };

  return (
    <div className="p-6 space-y-6 animate-slide-up">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center text-white shadow-glow-gold">
          <SettingsIcon className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-deep-navy dark:text-white font-serif">
            Pengaturan
          </h1>
          <p className="text-archive-slate dark:text-gray-400">
            Kelola preferensi dan pengaturan akun Anda
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1">
          <div className="glass-strong rounded-2xl p-3 space-y-2 sticky top-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-smooth font-medium text-sm ${
                    isActive
                      ? "bg-gradient-gold text-white shadow-glow-gold"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">{renderContent()}</div>
      </div>
    </div>
  );
}
