import React from "react";
import { HardDrive, Database, Clock } from "lucide-react";

export default function BackupStats({ stats }) {
  const formatSize = (bytes) => {
    if (!bytes) return "0 MB";
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(2)} MB`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Belum ada backup";
    const date = new Date(dateString);
    return date.toLocaleString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const statCards = [
    {
      label: "Total Backup",
      value: stats.total,
      icon: Database,
      color: "from-blue-500 to-blue-600",
    },
    {
      label: "Total Ukuran",
      value: formatSize(stats.totalSize),
      icon: HardDrive,
      color: "from-emerald-500 to-emerald-600",
    },
    {
      label: "Backup Terakhir",
      value: formatDate(stats.lastBackup),
      icon: Clock,
      color: "from-amber-500 to-amber-600",
      small: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="glass-strong rounded-2xl p-6 hover:shadow-glass-lg transition-smooth"
          >
            <div className="flex items-start gap-4">
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shrink-0`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-archive-slate dark:text-gray-400 mb-1">
                  {stat.label}
                </p>
                <p
                  className={`font-bold text-deep-navy dark:text-white ${
                    stat.small ? "text-base" : "text-2xl"
                  }`}
                >
                  {stat.value}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
