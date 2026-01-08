import React, { useState, useEffect } from "react";
import { ClipboardList, Filter, Calendar, User, Activity } from "lucide-react";
import toast from "react-hot-toast";
import API_BASE_URL from "../config";
import ActivityLogCard from "../components/activity/ActivityLogCard";
import ActivityStats from "../components/activity/ActivityStats";

export default function ActivityLogs() {
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    module: "",
    action: "",
    date_from: "",
    date_to: "",
  });

  useEffect(() => {
    fetchStats();
    fetchLogs();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/activity-logs/stats.php`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const queryParams = new URLSearchParams();

      if (filters.module) queryParams.append("module", filters.module);
      if (filters.action) queryParams.append("action", filters.action);
      if (filters.date_from) queryParams.append("date_from", filters.date_from);
      if (filters.date_to) queryParams.append("date_to", filters.date_to);

      const response = await fetch(
        `${API_BASE_URL}/activity-logs/list.php?${queryParams}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (data.success) {
        setLogs(data.logs);
      } else {
        toast.error(data.message || "Gagal memuat riwayat aktivitas");
      }
    } catch (error) {
      console.error("Error fetching logs:", error);
      toast.error("Terjadi kesalahan saat memuat data");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleApplyFilters = () => {
    fetchLogs();
  };

  const handleResetFilters = () => {
    setFilters({
      module: "",
      action: "",
      date_from: "",
      date_to: "",
    });
    setTimeout(() => fetchLogs(), 100);
  };

  return (
    <div className="p-6 space-y-6 animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-deep-navy to-archive-slate rounded-xl">
            <ClipboardList className="w-6 h-6 text-rich-gold" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-deep-navy dark:text-white font-serif">
              Riwayat Aktivitas
            </h1>
            <p className="text-sm text-archive-slate dark:text-gray-400">
              Audit trail semua aktivitas pengguna
            </p>
          </div>
        </div>
      </div>

      {/* Statistics */}
      {stats && <ActivityStats stats={stats} />}

      {/* Filters */}
      <div className="glass-strong rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-rich-gold" />
          <h2 className="text-lg font-bold text-deep-navy dark:text-white">
            Filter
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Module Filter */}
          <div>
            <label className="text-sm font-semibold text-archive-slate dark:text-gray-400 block mb-2">
              Module
            </label>
            <select
              name="module"
              value={filters.module}
              onChange={handleFilterChange}
              className="w-full px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-white/10 rounded-xl text-deep-navy dark:text-white font-medium focus:ring-2 focus:ring-rich-gold/50 focus:border-rich-gold/50 transition-smooth outline-none"
            >
              <option value="">Semua Module</option>
              <option value="auth">Authentication</option>
              <option value="ijazah">Ijazah</option>
              <option value="user">User Management</option>
              <option value="backup">Backup</option>
              <option value="settings">Settings</option>
            </select>
          </div>

          {/* Action Filter */}
          <div>
            <label className="text-sm font-semibold text-archive-slate dark:text-gray-400 block mb-2">
              Action
            </label>
            <select
              name="action"
              value={filters.action}
              onChange={handleFilterChange}
              className="w-full px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-white/10 rounded-xl text-deep-navy dark:text-white font-medium focus:ring-2 focus:ring-rich-gold/50 focus:border-rich-gold/50 transition-smooth outline-none"
            >
              <option value="">Semua Action</option>
              <option value="login">Login</option>
              <option value="logout">Logout</option>
              <option value="create">Create</option>
              <option value="update">Update</option>
              <option value="delete">Delete</option>
              <option value="download">Download</option>
              <option value="backup_create">Backup Create</option>
              <option value="backup_restore">Backup Restore</option>
              <option value="password_change">Password Change</option>
            </select>
          </div>

          {/* Date From */}
          <div>
            <label className="text-sm font-semibold text-archive-slate dark:text-gray-400 block mb-2">
              Dari Tanggal
            </label>
            <input
              type="date"
              name="date_from"
              value={filters.date_from}
              onChange={handleFilterChange}
              className="w-full px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-white/10 rounded-xl text-deep-navy dark:text-white font-medium focus:ring-2 focus:ring-rich-gold/50 focus:border-rich-gold/50 transition-smooth outline-none"
            />
          </div>

          {/* Date To */}
          <div>
            <label className="text-sm font-semibold text-archive-slate dark:text-gray-400 block mb-2">
              Sampai Tanggal
            </label>
            <input
              type="date"
              name="date_to"
              value={filters.date_to}
              onChange={handleFilterChange}
              className="w-full px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-white/10 rounded-xl text-deep-navy dark:text-white font-medium focus:ring-2 focus:ring-rich-gold/50 focus:border-rich-gold/50 transition-smooth outline-none"
            />
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-3 mt-4">
          <button onClick={handleApplyFilters} className="btn-premium">
            Terapkan Filter
          </button>
          <button
            onClick={handleResetFilters}
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-deep-navy dark:text-white rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-smooth"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Activity Logs List */}
      <div className="glass-strong rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5 text-rich-gold" />
          <h2 className="text-lg font-bold text-deep-navy dark:text-white">
            Log Aktivitas ({logs.length})
          </h2>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-rich-gold border-t-transparent"></div>
            <p className="mt-4 text-archive-slate dark:text-gray-400">
              Memuat data...
            </p>
          </div>
        ) : logs.length === 0 ? (
          <div className="text-center py-12">
            <ClipboardList className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-archive-slate dark:text-gray-400">
              Tidak ada aktivitas ditemukan
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {logs.map((log) => (
              <ActivityLogCard key={log.id} log={log} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
