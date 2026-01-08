import React from "react";
import { TrendingUp, BarChart3 } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function GraduationTrendChart({ data, userRole }) {
  const isVisible = ["super_admin", "admin_ijazah"].includes(userRole);

  if (!isVisible) return null;

  // Validate data
  const hasData = data && Array.isArray(data) && data.length > 0;

  // Empty state
  if (!hasData) {
    return (
      <div className="w-full h-[320px] flex flex-col items-center justify-center text-gray-400 dark:text-gray-500">
        <BarChart3 className="w-12 h-12 mb-3 opacity-30" />
        <p className="text-sm font-medium">Belum ada data untuk ditampilkan</p>
      </div>
    );
  }

  return (
    <div className="w-full" style={{ height: "320px" }}>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
        >
          <defs>
            {/* Premium Gradient for Bars */}
            <linearGradient id="barGradientPremium" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9} />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity={0.7} />
              <stop offset="100%" stopColor="#6366f1" stopOpacity={0.5} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="currentColor"
            className="text-gray-200 dark:text-gray-700"
            opacity={0.5}
          />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "currentColor",
              fontSize: 12,
              fontWeight: 500,
            }}
            className="text-gray-600 dark:text-gray-400"
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "currentColor",
              fontSize: 12,
              fontWeight: 500,
            }}
            className="text-gray-600 dark:text-gray-400"
          />
          <Tooltip
            cursor={{ fill: "rgba(59, 130, 246, 0.1)" }}
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              borderColor: "rgba(59, 130, 246, 0.3)",
              borderRadius: "12px",
              color: "#1e293b",
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(10px)",
            }}
            itemStyle={{
              color: "#3b82f6",
              fontWeight: 600,
            }}
            labelStyle={{
              color: "#475569",
              fontWeight: 700,
              marginBottom: "4px",
            }}
          />
          <Bar
            dataKey="value"
            fill="url(#barGradientPremium)"
            radius={[8, 8, 0, 0]}
            barSize={50}
            animationDuration={1200}
            animationEasing="ease-out"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
