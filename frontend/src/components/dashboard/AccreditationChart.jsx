import React from "react";
import { Award } from "lucide-react";
import {
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#10B981", "#3B82F6", "#F59E0B", "#EF4444", "#8B5CF6"];

export default function AccreditationChart({ data, userRole }) {
  const isVisible = ["super_admin", "admin_bos"].includes(userRole);

  if (!isVisible) return null;

  return (
    <div
      className={`bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700 flex flex-col ${
        userRole === "admin_bos" ? "lg:col-span-3" : ""
      }`}
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-purple-500" />
            Status Akreditasi
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Komposisi kualitas sekolah.
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center relative min-h-[300px]">
        <div className="h-64 w-full">
          {data.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                  cornerRadius={6}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-gray-900 text-white p-3 rounded-xl shadow-xl border border-gray-700">
                          <p className="font-bold text-sm">{payload[0].name}</p>
                          <p className="text-xs opacity-80">
                            {payload[0].value} Sekolah
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </RePieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <p>Data Akreditasi Kosong</p>
            </div>
          )}
          <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
            <span className="text-4xl font-black text-gray-900 dark:text-white">
              {data.reduce((acc, curr) => acc + curr.value, 0)}
            </span>
            <span className="text-xs uppercase tracking-widest text-gray-400 font-semibold mt-1">
              Sekolah
            </span>
          </div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {data.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-default"
          >
            <span
              className="w-3 h-3 rounded-full shrink-0"
              style={{
                backgroundColor: COLORS[idx % COLORS.length],
                boxShadow: `0 0 8px ${COLORS[idx % COLORS.length]}66`,
              }}
            ></span>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 truncate w-full">
                {item.name}
              </span>
              <span className="text-sm font-bold text-gray-800 dark:text-gray-200">
                {item.value}{" "}
                <span className="text-[10px] font-normal opacity-50">Unit</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
