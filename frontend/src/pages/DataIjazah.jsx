import { useEffect, useState } from "react";

import { getIjazahList, deleteIjazah, api } from "../services/api";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";

// Components
import IjazahHeader from "../components/ijazah/IjazahHeader";
import IjazahFilter from "../components/ijazah/IjazahFilter";
import IjazahTable from "../components/ijazah/IjazahTable";

export default function DataIjazah() {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const [filterJenjang, setFilterJenjang] = useState("");
  const [filterSekolah, setFilterSekolah] = useState("");
  const [filterTahun, setFilterTahun] = useState("");

  const [optionSekolah, setOptionSekolah] = useState([]);
  const [optionJenjang, setOptionJenjang] = useState([]);
  const [optionTahun, setOptionTahun] = useState([]);

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

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Hapus Arsip Ini?",
      text: "Data yang dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
      background: "#fff",
      customClass: {
        popup: "rounded-2xl",
      },
    });

    if (!result.isConfirmed) return;

    setDeletingId(id);
    try {
      const res = await deleteIjazah(id);
      if (res.status) {
        Swal.fire({
          icon: "success",
          title: "Terhapus!",
          text: "Arsip ijazah berhasil dihapus.",
          timer: 1500,
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
      {(user?.role === "admin_bos" ||
        user?.role === "super_admin" ||
        user?.role === "admin_ijazah") && (
        <div className="flex justify-end">
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

      <IjazahTable
        data={filteredData}
        loading={loading}
        searchTerm={searchTerm}
        user={user}
        onDelete={handleDelete}
        deletingId={deletingId}
        onRefresh={loadData}
      />
    </div>
  );
}
