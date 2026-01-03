import React from "react";
import {
  FileText,
  Award,
  Activity,
  School,
  PieChart,
  Users,
} from "lucide-react";
import StatsCard from "./StatsCard";

export default function DashboardStats({ user, stats }) {
  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {["super_admin", "admin_ijazah"].includes(user?.role) && (
        <>
          <StatsCard
            title="Total Arsip Ijazah"
            value={stats.counts.total_ijazah}
            icon={<FileText className="w-7 h-7 text-white" />}
            gradient="from-blue-500 to-indigo-600"
            trend="Realtime"
            trendLabel="data terverifikasi"
            footerValue="+12% bulan ini"
          />
          <StatsCard
            title="Dominasi Lulusan"
            value={
              stats.charts.ijazah_per_year.length > 0
                ? stats.charts.ijazah_per_year.reduce((prev, current) =>
                    prev.value > current.value ? prev : current
                  ).name
                : "-"
            }
            icon={<Award className="w-7 h-7 text-white" />}
            gradient="from-cyan-500 to-blue-600"
            trend="Tahun"
            trendLabel="terbanyak"
            footerValue="Puncak statistik"
          />
          <StatsCard
            title="Aktivitas Baru"
            value={stats.recent_docs.length}
            icon={<Activity className="w-7 h-7 text-white" />}
            gradient="from-indigo-500 to-violet-600"
            trend="Dokumen"
            trendLabel="baru ditambahkan"
            footerValue="Dalam 7 hari terakhir"
            isCount={true}
          />
        </>
      )}
    </div>
  );
}
