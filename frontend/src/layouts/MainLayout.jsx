import { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import DashboardNavbar from "../components/layout/DashboardNavbar";

export default function MainLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-hidden font-sans transition-colors duration-200">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className="flex-1 flex flex-col overflow-hidden relative">
        <DashboardNavbar setIsSidebarOpen={setIsSidebarOpen} />

        <main className="flex-1 overflow-y-auto bg-[#F3F4F6] dark:bg-gray-900 relative scroll-smooth">
          {children}
        </main>
      </div>
    </div>
  );
}
