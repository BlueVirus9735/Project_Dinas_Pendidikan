import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import MainLayout from "../layouts/MainLayout";
import DataIjazah from "../pages/DataIjazah";
import UploadIjazah from "../pages/UploadIjazah";
import Dashboard from "../pages/Dashboard";
import UserManagement from "../pages/UserManagement";
import { AuthProvider, useAuth } from "../context/AuthContext";
import Laporan from "../pages/Laporan";
import Settings from "../pages/Settings";
import Backup from "../pages/Backup";
import ActivityLogs from "../pages/ActivityLogs";
import Trash from "../pages/Trash";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const authContext = useAuth();

  // Safety check for null context
  if (!authContext) {
    return <Navigate to="/login" replace />;
  }

  const { isAuthenticated, loading, user } = authContext;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-rich-gold border-t-transparent"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return (
      <div className="p-8 text-center text-red-600">
        Anda tidak memiliki akses ke halaman ini.
      </div>
    );
  }

  return children;
};

export default function AppRouter() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute
                allowedRoles={[
                  "super_admin",
                  "admin_ijazah",
                  "operator_sekolah",
                ]}
              >
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute allowedRoles={["super_admin"]}>
                <MainLayout>
                  <UserManagement />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/data-ijazah"
            element={
              <ProtectedRoute
                allowedRoles={[
                  "super_admin",
                  "admin_ijazah",
                  "operator_sekolah",
                  "operator_ijazah",
                ]}
              >
                <MainLayout>
                  <DataIjazah />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/upload-ijazah"
            element={
              <ProtectedRoute
                allowedRoles={[
                  "admin_ijazah",
                  "operator_sekolah",
                  "operator_ijazah",
                ]}
              >
                <MainLayout>
                  <UploadIjazah />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/laporan"
            element={
              <ProtectedRoute allowedRoles={["super_admin", "admin_ijazah"]}>
                <MainLayout>
                  <Laporan />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute
                allowedRoles={[
                  "super_admin",
                  "admin_ijazah",
                  "operator_sekolah",
                  "operator_ijazah",
                ]}
              >
                <MainLayout>
                  <Settings />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/backup"
            element={
              <ProtectedRoute allowedRoles={["super_admin", "admin_ijazah"]}>
                <MainLayout>
                  <Backup />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/activity-logs"
            element={
              <ProtectedRoute allowedRoles={["super_admin"]}>
                <MainLayout>
                  <ActivityLogs />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/trash"
            element={
              <ProtectedRoute allowedRoles={["super_admin"]}>
                <MainLayout>
                  <Trash />
                </MainLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
