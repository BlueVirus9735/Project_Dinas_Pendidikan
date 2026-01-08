import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Mail, Shield, User as UserIcon } from "lucide-react";

export default function ProfileSection() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="glass-strong rounded-2xl p-6">
        <h2 className="text-xl font-bold text-deep-navy dark:text-white font-serif mb-6">
          Informasi Profil
        </h2>

        {/* Avatar */}
        <div className="flex items-center gap-6 mb-8">
          <div className="w-24 h-24 rounded-2xl bg-gradient-gold flex items-center justify-center text-white font-bold text-4xl shadow-glow-gold">
            {user?.username?.charAt(0).toUpperCase() || "U"}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-deep-navy dark:text-white">
              {user?.username || "Guest User"}
            </h3>
            <p className="text-archive-slate dark:text-gray-400 capitalize">
              {user?.role?.replace("_", " ") || "Guest"}
            </p>
          </div>
        </div>

        {/* Profile Info */}
        <div className="space-y-4">
          {/* Username */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white shrink-0">
              <UserIcon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <label className="text-sm font-semibold text-archive-slate dark:text-gray-400 block mb-1">
                Username
              </label>
              <input
                type="text"
                value={user?.username || ""}
                disabled
                className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border-2 border-gray-200 dark:border-white/10 rounded-xl text-deep-navy dark:text-white font-medium cursor-not-allowed"
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <label className="text-sm font-semibold text-archive-slate dark:text-gray-400 block mb-1">
                Email
              </label>
              <input
                type="email"
                value={user?.email || "Tidak tersedia"}
                disabled
                className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border-2 border-gray-200 dark:border-white/10 rounded-xl text-deep-navy dark:text-white font-medium cursor-not-allowed"
              />
            </div>
          </div>

          {/* Role */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-gold flex items-center justify-center text-white shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <label className="text-sm font-semibold text-archive-slate dark:text-gray-400 block mb-1">
                Role
              </label>
              <input
                type="text"
                value={user?.role?.replace("_", " ") || "Guest"}
                disabled
                className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border-2 border-gray-200 dark:border-white/10 rounded-xl text-deep-navy dark:text-white font-medium capitalize cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Info Note */}
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl">
          <p className="text-sm text-blue-800 dark:text-blue-300">
            <strong>Catatan:</strong> Untuk mengubah informasi profil, silakan
            hubungi administrator sistem.
          </p>
        </div>
      </div>
    </div>
  );
}
