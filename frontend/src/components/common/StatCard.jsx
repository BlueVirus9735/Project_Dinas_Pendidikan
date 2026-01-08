import React from "react";
import { Sparkles } from "lucide-react";

export default function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  trendValue,
  color = "blue",
  description,
}) {
  // Color variants for gradient effects
  const colorVariants = {
    blue: {
      gradient: "from-blue-500 to-cyan-500",
      glow: "from-blue-500/20 via-cyan-500/20 to-blue-500/20",
      text: "from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400",
    },
    purple: {
      gradient: "from-purple-500 to-pink-500",
      glow: "from-purple-500/20 via-pink-500/20 to-purple-500/20",
      text: "from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400",
    },
    amber: {
      gradient: "from-amber-500 to-orange-500",
      glow: "from-amber-500/20 via-orange-500/20 to-amber-500/20",
      text: "from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400",
    },
  };

  const colors = colorVariants[color] || colorVariants.blue;

  return (
    <div className="relative group">
      {/* Card Glow Effect */}
      <div
        className={`absolute -inset-1 bg-gradient-to-r ${colors.glow} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      ></div>

      <div className="relative backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border border-gray-200/50 dark:border-white/10 rounded-2xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl overflow-hidden">
        {/* Sparkle Decoration */}
        <div className="absolute top-3 right-3 text-gray-400/30 dark:text-gray-500/30 animate-pulse">
          <Sparkles className="w-3 h-3" />
        </div>

        <div className="flex justify-between items-start relative z-10">
          <div className="flex-1">
            <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3">
              {title}
            </p>
            <h3
              className={`text-4xl font-bold bg-gradient-to-r ${colors.text} bg-clip-text text-transparent mb-3`}
            >
              {value}
            </h3>
            {description && (
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                {description}
              </p>
            )}
          </div>

          <div
            className={`p-4 bg-gradient-to-br ${colors.gradient} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
          >
            <Icon className="w-7 h-7 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}
