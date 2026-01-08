import { useEffect, useState } from "react";

import {
  getIjazahList,
  deleteIjazah,
  verifyIjazah,
  api,
} from "../services/api";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import { LayoutGrid, List } from "lucide-react";

// Components
import IjazahHeader from "../components/ijazah/IjazahHeader";
import IjazahFilter from "../components/ijazah/IjazahFilter";
import IjazahTable from "../components/ijazah/IjazahTable";
import IjazahCard from "../components/ijazah/IjazahCard";
import DeleteConfirmModal from "../components/ijazah/DeleteConfirmModal";

export default function DataIjazah() {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // Default to grid for 'Portfolio' look

  const [filterJenjang, setFilterJenjang] = useState("");
  const [filterSekolah, setFilterSekolah] = useState("");
  const [filterTahun, setFilterTahun] = useState("");

  const [optionSekolah, setOptionSekolah] = useState([]);
  const [optionJenjang, setOptionJenjang] = useState([]);
  const [optionTahun, setOptionTahun] = useState([]);

  // Delete modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedIjazah, setSelectedIjazah] = useState(null);

  useEffect(() => {
    loadData();
    if (
      user?.role === "admin_bos" ||
      user?.role === "super_admin" ||
      user?.role === "admin_ijazah"
    ) {
      loadFilterOptions();
    }
  }, [filterJenjang, filterSekolah, filterTahun, user]);

  const loadFilterOptions = async () => {
    try {
      const schoolsRes = await api.get("/schools.php");
      if (schoolsRes.data.status) {
        const schools = schoolsRes.data.data;
        setOptionSekolah(schools);

        const uniqueJenjangs = [
          ...new Set(schools.map((s) => s.jenjang).filter(Boolean)),
        ];
        setOptionJenjang(uniqueJenjangs.sort());
      }

      const ijazahRes = await getIjazahList({});
      if (ijazahRes.status) {
        const allIjazah = ijazahRes.data;
        const uniqueYears = [
          ...new Set(allIjazah.map((item) => item.tahun).filter(Boolean)),
        ];
        setOptionTahun(uniqueYears.sort((a, b) => b - a)); // Sort descending
      }
    } catch (err) {
      console.error("Gagal memuat opsi filter", err);
    }
  };

  const loadData = async () => {
    try {
      setLoading(true);
      const params = {};

      if (user?.role === "operator_sekolah" && user?.nama_sekolah) {
        params.sekolah = user.nama_sekolah;
      }
      if (filterJenjang) params.jenjang = filterJenjang;
      if (filterSekolah) params.sekolah = filterSekolah;
      if (filterTahun) params.tahun = filterTahun;

      const res = await getIjazahList(params);
      if (res.status) {
        setData(res.data);
      } else {
        console.error(res.message);
      }
    } catch (error) {
      console.error("Gagal memuat data");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Gagal memuat data ijazah. Silakan coba lagi nanti.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id) => {
    const ijazah = data.find((item) => item.id === id);
    setSelectedIjazah(ijazah);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async (deleteReason) => {
    if (!selectedIjazah) return;

    setDeletingId(selectedIjazah.id);
    setShowDeleteModal(false);

    try {
      const res = await deleteIjazah(selectedIjazah.id, deleteReason);
      if (res.status) {
        Swal.fire({
          icon: "success",
          title: "Terhapus!",
          text: res.message || "Ijazah berhasil di hapus",
          timer: 2000,
          showConfirmButton: false,
        });
        loadData();
      } else {
        Swal.fire("Gagal", res.message, "error");
      }
    } catch (err) {
      Swal.fire("Error", "Gagal menghapus data", "error");
    } finally {
      setDeletingId(null);
      setSelectedIjazah(null);
    }
  };

  const handleVerify = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Verifikasi Ijazah?",
        text: "Apakah Anda yakin ingin mengubah status verifikasi ijazah ini?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#8B5CF6",
        cancelButtonColor: "#6B7280",
        confirmButtonText: "Ya, Verifikasi!",
        cancelButtonText: "Batal",
      });

      if (result.isConfirmed) {
        const response = await verifyIjazah(id);

        if (response.status) {
          Swal.fire({
            icon: "success",
            title: "Berhasil!",
            text: response.message,
            timer: 2000,
            showConfirmButton: false,
          });
          loadData(); // Refresh data
        } else {
          Swal.fire({
            icon: "error",
            title: "Gagal!",
            text: response.message,
          });
        }
      }
    } catch (error) {
      console.error("Error verifying ijazah:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Terjadi kesalahan saat memverifikasi ijazah",
      });
    }
  };

  const filteredData = data.filter(
    (item) =>
      item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.nisn.includes(searchTerm) ||
      item.sekolah.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen transition-colors duration-300 space-y-8">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="w-full">
          <IjazahHeader
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onRefresh={loadData}
            loading={loading}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        {/* View Toggle */}
        <div className="bg-white dark:bg-gray-800 p-1 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-md transition-colors ${
              viewMode === "grid"
                ? "bg-deep-navy text-white shadow-sm"
                : "text-gray-400 hover:text-gray-600"
            }`}
            title="Tampilan Grid"
          >
            <LayoutGrid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={`p-2 rounded-md transition-colors ${
              viewMode === "table"
                ? "bg-deep-navy text-white shadow-sm"
                : "text-gray-400 hover:text-gray-600"
            }`}
            title="Tampilan Tabel"
          >
            <List className="w-5 h-5" />
          </button>
        </div>

        {(user?.role === "admin_bos" ||
          user?.role === "super_admin" ||
          user?.role === "admin_ijazah") && (
          <div className="flex justify-end w-full md:w-auto">
            <IjazahFilter
              filterJenjang={filterJenjang}
              setFilterJenjang={setFilterJenjang}
              filterSekolah={filterSekolah}
              setFilterSekolah={setFilterSekolah}
              filterTahun={filterTahun}
              setFilterTahun={setFilterTahun}
              optionJenjang={optionJenjang}
              optionSekolah={optionSekolah}
              optionTahun={optionTahun}
            />
          </div>
        )}
      </div>

      {viewMode === "table" ? (
        <IjazahTable
          data={filteredData}
          loading={loading}
          searchTerm={searchTerm}
          user={user}
          onDelete={handleDeleteClick}
          deletingId={deletingId}
          onRefresh={loadData}
        />
      ) : /* Grid View Render */
      loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-64 bg-gray-200 dark:bg-gray-800 rounded-xl"
            ></div>
          ))}
        </div>
      ) : filteredData.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          Tidak ada data ditemukan.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredData.map((item) => (
            <IjazahCard
              key={item.id}
              item={item}
              user={user}
              onDelete={handleDeleteClick}
              onVerify={handleVerify}
              onRefresh={loadData}
            />
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedIjazah(null);
        }}
        onConfirm={handleDeleteConfirm}
        ijazahName={selectedIjazah?.nama || ""}
      />
    </div>
  );
}
