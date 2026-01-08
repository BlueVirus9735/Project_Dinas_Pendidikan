import React from "react";
import { TrendingUp, Users, Activity } from "lucide-react";

export default function ActivityStats({ stats }) {
  // Get most active module safely
  const getMostActiveModule = () => {
    if (!stats.by_module || Object.keys(stats.by_module).length === 0) {
      return "-";
    }
    return Object.keys(stats.by_module).reduce((a, b) =>
      stats.by_module[a] > stats.by_module[b] ? a : b
    );
  };

  const statCards = [
    {
      icon: Activity,
      label: "Aktivitas Hari Ini",
      value: stats.today_count || 0,
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: TrendingUp,
      label: "Module Paling Aktif",
      value: getMostActiveModule(),
      color: "from-blue-500 to-cyan-500",
      capitalize: true,
    },
    {
      icon: Users,
      label: "User Paling Aktif",
      value:
        stats.active_users && stats.active_users.length > 0
          ? stats.active_users[0].username
          : "-",
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {statCards.map((stat, index) => (
        <div
          key={index}
          className="glass-strong rounded-2xl p-6 hover:shadow-glass-lg transition-smooth group"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-semibold text-archive-slate dark:text-gray-400 mb-2">
                {stat.label}
              </p>
              <p
                className={`text-3xl font-bold text-deep-navy dark:text-white ${
                  stat.capitalize ? "capitalize" : ""
                }`}
              >
                {stat.value}
              </p>
            </div>
            <div
              className={`p-4 bg-gradient-to-br ${stat.color} rounded-xl group-hover:scale-110 transition-smooth`}
            >
              <stat.icon className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
