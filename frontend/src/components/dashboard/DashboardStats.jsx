import React from "react";
import { FileText, Award, Activity } from "lucide-react";
import StatCard from "../common/StatCard";

export default function DashboardStats({ user, stats }) {
  if (!stats) return null;

  return (
    <div className="p-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {["super_admin", "admin_ijazah"].includes(user?.role) && (
        <>
          <StatCard
            title="Total Arsip Ijazah"
            value={stats.counts.total_ijazah}
            icon={FileText}
            description="Total data terverifikasi dalam sistem"
            color="blue"
          />
          <StatCard
            title="Dominasi Lulusan"
            value={
              stats.charts.ijazah_per_year.length > 0
                ? stats.charts.ijazah_per_year.reduce((prev, current) =>
                    prev.value > current.value ? prev : current
                  ).name
                : "-"
            }
            icon={Award}
            description="Tahun kelulusan terbanyak"
            color="purple"
          />
          <StatCard
            title="Aktivitas Baru"
            value={stats.recent_docs.length}
            icon={Activity}
            description="Dokumen terbaru 7 hari terakhir"
            color="amber"
          />
        </>
      )}
    </div>
  );
}
