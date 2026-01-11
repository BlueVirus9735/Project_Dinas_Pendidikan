import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Database,
  Upload,
  LogOut,
  X,
  ChevronDown,
  FileText,
  Users,
  ShieldCheck,
  Settings,
  HardDrive,
  ClipboardList,
  Trash2,
  UserPlus,
  School,
  GraduationCap,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState({
    ijazah: true,
    master: true,
    bos: true,
  });

  const toggleMenu = (key) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const allMenuStructure = [
    {
      type: "link",
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
      roles: ["super_admin", "admin_ijazah"],
    },
    {
      type: "link",
      name: "Data Siswa",
      path: "/data-siswa",
      icon: UserPlus,
      roles: ["super_admin", "admin_ijazah", "operator_sekolah"],
    },
    {
      type: "link",
      name: "Manajemen User",
      path: "/users",
      icon: Users,
      roles: ["super_admin"],
    },
    {
      type: "group",
      id: "master",
      label: "Master Data",
      icon: Database,
      roles: ["super_admin", "admin_ijazah", "operator_sekolah"],
      items: [
        {
          name: "Master Sekolah",
          path: "/master-sekolah",
          icon: School,
          roles: ["super_admin"],
        },
        {
          name: "Master Siswa",
          path: "/master-siswa",
          icon: GraduationCap,
          roles: ["super_admin", "admin_ijazah", "operator_sekolah"],
        },
      ],
    },
    {
      type: "group",
      id: "ijazah",
      label: "Ijazah",
      icon: FileText,
      roles: [
        "super_admin",
        "admin_ijazah",
        "operator_sekolah",
        "operator_ijazah",
      ],
      items: [
        {
          name: "Data Ijazah",
          path: "/data-ijazah",
          icon: Database,
          roles: [
            "super_admin",
            "admin_ijazah",
            "operator_sekolah",
            "operator_ijazah",
          ],
        },
        {
          name: "Upload Baru",
          path: "/upload-ijazah",
          icon: Upload,
          roles: [
            "super_admin",
            "admin_ijazah",
            "operator_sekolah",
            "operator_ijazah",
          ],
        },
      ],
    },
    {
      type: "link",
      name: "Riwayat Aktivitas",
      path: "/activity-logs",
      icon: ClipboardList,
      roles: ["super_admin"],
    },
    {
      type: "link",
      name: "Trash / Arsip Terhapus",
      path: "/trash",
      icon: Trash2,
      roles: ["super_admin"],
    },
    {
      type: "link",
      name: "Backup & Restore",
      path: "/backup",
      icon: HardDrive,
      roles: ["super_admin", "admin_ijazah"],
    },
    {
      type: "link",
      name: "Pengaturan",
      path: "/settings",
      icon: Settings,
      roles: [
        "super_admin",
        "admin_ijazah",
        "operator_sekolah",
        "operator_ijazah",
      ],
    },
  ];

  const menuStructure = allMenuStructure.filter((item) => {
    if (!user || !user.role) return false;
    if (item.roles && !item.roles.includes(user.role)) return false;
    if (item.id === "bos" && user.role === "operator_sekolah") {
      if (user.jenjang !== "SD") return false;
    }
    return true;
  });

  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={`
        fixed inset-y-0 left-0 z-30 w-72 glass-strong shadow-glass-lg md:relative md:translate-x-0 flex flex-col archive-pattern
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        {/* Header Section */}
        <div className="h-24 flex items-center px-6 relative border-b border-gray-200/50 dark:border-white/10 bg-gradient-to-r from-transparent via-rich-gold/5 to-transparent">
          <div className="flex items-center gap-4 relative z-10 w-full">
            <div className="w-10 h-10 relative shrink-0 bg-gradient-gold rounded-xl p-1.5 shadow-glow-gold border border-rich-gold/30">
              <img
                src="/logo_dinas.png"
                alt="Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col text-deep-navy dark:text-white">
              <h1 className="text-lg font-bold font-serif leading-tight tracking-tight">
                Dinas Pendidikan
              </h1>
              <p className="text-[10px] font-semibold text-archive-slate dark:text-gray-400 uppercase tracking-widest">
                Kabupaten Cirebon
              </p>
            </div>
          </div>

          <button
            className="ml-auto md:hidden text-gray-400 hover:text-deep-navy dark:hover:text-white p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto custom-scrollbar">
          {menuStructure.map((item, idx) => {
            if (item.type === "link") {
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm
                            ${
                              isActive
                                ? "bg-gradient-gold text-white shadow-glow-gold font-bold"
                                : "text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-50 dark:hover:from-white/10 dark:hover:to-white/5 hover:text-deep-navy dark:hover:text-white"
                            }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <item.icon className="w-5 h-5 shrink-0" />
                      <span>{item.name}</span>
                    </>
                  )}
                </NavLink>
              );
            } else if (item.type === "group") {
              const visibleItems = item.items.filter((child) => {
                if (!child.roles) return true;
                return child.roles.includes(user.role);
              });

              if (visibleItems.length === 0) return null;

              const isExpanded = expandedMenus[item.id];
              const hasActiveChild = visibleItems.some(
                (child) => location.pathname === child.path
              );

              return (
                <div key={item.id} className="pt-2">
                  <button
                    onClick={() => toggleMenu(item.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium text-sm group
                                ${
                                  hasActiveChild
                                    ? "bg-gradient-to-r from-rich-gold/10 to-gold-light/10 dark:from-rich-gold/20 dark:to-gold-light/20 text-rich-gold border border-rich-gold/20"
                                    : "text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-50 dark:hover:from-white/10 dark:hover:to-white/5 hover:text-deep-navy dark:hover:text-white"
                                }
                               `}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon
                        className={`w-5 h-5 ${
                          hasActiveChild
                            ? "text-rich-gold"
                            : "text-gray-400 group-hover:text-deep-navy dark:group-hover:text-white"
                        }`}
                      />
                      <span className={hasActiveChild ? "font-bold" : ""}>
                        {item.label}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-500 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isExpanded && (
                    <div className="pl-4 pr-1 space-y-1 mt-1">
                      {visibleItems.map((child) => (
                        <NavLink
                          key={child.path}
                          to={child.path}
                          onClick={() => setIsSidebarOpen(false)}
                          className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium text-sm border-l-2
                                                ${
                                                  isActive
                                                    ? "border-rich-gold text-deep-navy dark:text-white bg-gradient-to-r from-rich-gold/10 to-transparent dark:from-rich-gold/20 font-semibold"
                                                    : "border-transparent text-gray-500 dark:text-gray-400 hover:text-deep-navy dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 hover:border-gray-300 dark:hover:border-white/20"
                                                }`
                          }
                        >
                          {child.name}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            return null;
          })}
        </nav>

        {/* User Profile Section */}
        <div className="p-4 bg-gradient-to-br from-gray-50 to-white dark:from-black/30 dark:to-black/20 border-t border-gray-200/50 dark:border-white/10 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-xl bg-gradient-gold flex items-center justify-center text-white font-bold border-2 border-rich-gold/50 shadow-glow-gold text-lg">
              {user?.username?.charAt(0).toUpperCase() || "U"}
            </div>
            <div className="overflow-hidden flex-1">
              <p className="text-sm font-bold text-deep-navy dark:text-white truncate font-serif">
                {user?.username || "Guest User"}
              </p>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-rich-gold" />
                <p className="text-xs text-archive-slate dark:text-gray-400 capitalize truncate font-medium">
                  {user?.role?.replace("_", " ") || "Guest"}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 hover:border-red-500 dark:hover:border-red-500 text-sm font-semibold group"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar Sesi</span>
          </button>
        </div>
      </aside>
    </>
  );
}
