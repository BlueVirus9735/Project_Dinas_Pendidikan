import React from "react";
import { Building2, FileText, Users } from "lucide-react";

export default function AnimatedStats({ stats }) {
  const statsData = [
    {
      icon: Building2,
      value: stats.sekolah,
      label: "Sekolah Terdaftar",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: FileText,
      value: stats.arsip,
      label: "Ijazah Terarsip",
      color: "from-rich-gold to-gold-light",
    },
    {
      icon: Users,
      value: stats.siswa,
      label: "Data Siswa",
      color: "from-green-500 to-green-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      {statsData.map((stat, index) => (
        <div
          key={index}
          className="glass-strong rounded-2xl p-6 border-2 border-gray-200/50 dark:border-white/10"
        >
          <div
            className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} mb-4`}
          >
            <stat.icon className="w-6 h-6 text-white" />
          </div>
          <div className="text-4xl font-bold text-deep-navy dark:text-white mb-2 font-serif">
            {stat.value.toLocaleString("id-ID")}
          </div>
          <div className="text-sm text-archive-slate dark:text-gray-400 font-medium">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
