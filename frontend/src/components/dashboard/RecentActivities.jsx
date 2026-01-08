import React from "react";
import { Clock, ArrowUpRight, School, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function RecentActivities({ activities, userRole }) {
  const navigate = useNavigate();
  const isVisible = ["super_admin", "admin_ijazah"].includes(userRole);

  if (!isVisible) return null;

  return (
    <div className="flex flex-col gap-3">
      {activities.length > 0 ? (
        activities.map((item, idx) => (
          <div
            key={idx}
            className="group flex items-center gap-3 p-3 rounded-lg border border-transparent hover:border-vault-accent/20 hover:bg-white/5 transition-all duration-200"
          >
            <div className="w-10 h-10 rounded-lg bg-deep-navy flex items-center justify-center text-vault-accent font-mono text-sm font-bold border border-white/5">
              {item.nama ? item.nama.charAt(0) : "?"}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-deep-navy dark:text-gray-200 truncate text-sm">
                {item.nama}
              </h4>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px] text-gray-400 font-mono bg-gray-100 dark:bg-white/5 px-1.5 rounded">
                  {item.tahun}
                </span>
                <p className="text-xs text-gray-500 truncate">{item.sekolah}</p>
              </div>
            </div>
            <div className="text-[10px] text-gray-400 font-mono tabular-nums opacity-0 group-hover:opacity-100 transition-opacity">
              Just Now
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-12 flex flex-col items-center opacity-60">
          <FileText className="w-12 h-12 text-gray-300 mb-3" />
          <p className="text-gray-500 font-mono text-sm">[VAULT_EMPTY]</p>
        </div>
      )}
    </div>
  );
}
