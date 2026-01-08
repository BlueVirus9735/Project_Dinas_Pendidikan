import React from "react";
import {
  User,
  FileText,
  Shield,
  HardDrive,
  Settings,
  LogIn,
  LogOut,
  Upload,
  Download,
  Trash2,
  Edit,
  Eye,
  Database,
} from "lucide-react";

const ACTION_ICONS = {
  login: LogIn,
  logout: LogOut,
  create: Upload,
  update: Edit,
  delete: Trash2,
  download: Download,
  view: Eye,
  backup_create: Database,
  backup_restore: Database,
  backup_delete: Trash2,
  backup_download: Download,
  password_change: Shield,
};

const MODULE_ICONS = {
  auth: LogIn,
  ijazah: FileText,
  user: User,
  backup: HardDrive,
  settings: Settings,
};

const ACTION_COLORS = {
  login: "text-emerald-500 bg-emerald-500/10",
  logout: "text-gray-500 bg-gray-500/10",
  create: "text-blue-500 bg-blue-500/10",
  update: "text-amber-500 bg-amber-500/10",
  delete: "text-red-500 bg-red-500/10",
  download: "text-purple-500 bg-purple-500/10",
  view: "text-cyan-500 bg-cyan-500/10",
  backup_create: "text-indigo-500 bg-indigo-500/10",
  backup_restore: "text-orange-500 bg-orange-500/10",
  backup_delete: "text-red-600 bg-red-600/10",
  backup_download: "text-purple-600 bg-purple-600/10",
  password_change: "text-yellow-500 bg-yellow-500/10",
};

export default function ActivityLogCard({ log }) {
  const ActionIcon = ACTION_ICONS[log.action] || FileText;
  const ModuleIcon = MODULE_ICONS[log.module] || FileText;
  const actionColor =
    ACTION_COLORS[log.action] || "text-gray-500 bg-gray-500/10";

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Baru saja";
    if (diffMins < 60) return `${diffMins} menit yang lalu`;
    if (diffHours < 24) return `${diffHours} jam yang lalu`;
    if (diffDays < 7) return `${diffDays} hari yang lalu`;

    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getActionLabel = (action) => {
    const labels = {
      login: "Login",
      logout: "Logout",
      create: "Create",
      update: "Update",
      delete: "Delete",
      download: "Download",
      view: "View",
      backup_create: "Backup Created",
      backup_restore: "Backup Restored",
      backup_delete: "Backup Deleted",
      backup_download: "Backup Downloaded",
      password_change: "Password Changed",
    };
    return labels[action] || action;
  };

  return (
    <div className="glass-strong rounded-xl p-4 hover:shadow-glass-lg transition-smooth border-2 border-transparent hover:border-rich-gold/20">
      <div className="flex items-start gap-4">
        {/* Action Icon */}
        <div className={`p-3 rounded-xl ${actionColor} flex-shrink-0`}>
          <ActionIcon className="w-5 h-5" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-deep-navy dark:text-white">
                  {log.username}
                </span>
                <span className="text-sm text-archive-slate dark:text-gray-400">
                  •
                </span>
                <span
                  className={`text-sm font-semibold px-2 py-1 rounded-lg ${actionColor}`}
                >
                  {getActionLabel(log.action)}
                </span>
                <span className="text-sm text-archive-slate dark:text-gray-400">
                  •
                </span>
                <div className="flex items-center gap-1">
                  <ModuleIcon className="w-4 h-4 text-archive-slate dark:text-gray-400" />
                  <span className="text-sm text-archive-slate dark:text-gray-400 capitalize">
                    {log.module}
                  </span>
                </div>
              </div>
              {log.description && (
                <p className="text-sm text-archive-slate dark:text-gray-300">
                  {log.description}
                </p>
              )}
            </div>

            {/* Timestamp */}
            <div className="text-right flex-shrink-0">
              <p className="text-xs text-archive-slate dark:text-gray-400">
                {formatDate(log.created_at)}
              </p>
              {log.ip_address && (
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  {log.ip_address}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
