import { useState, useEffect, useCallback } from "react";
import { api } from "../services/api";
import { read, utils } from "xlsx";
import Swal from "sweetalert2";

export const useBOSData = (user) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // Fetch Data
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      let url = "/clustering/list.php";
      if (user?.role === "operator_sekolah" && user?.sekolah_id) {
        url += `?sekolah_id=${user.sekolah_id}`;
      }

      const response = await api.get(url);
      if (response.data.status === "success" || response.data.status === true) {
        setData(response.data.data || []);
      } else {
        setData(Array.isArray(response.data) ? response.data : []);
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal Mengambil Data",
        text: "Terjadi kesalahan saat menghubungkan ke server.",
        confirmButtonColor: "#EF4444",
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Upload Logic
  const handleUpload = async (file) => {
    if (!file) return;

    setUploading(true);
    try {
      let fileToUpload = file;
      // Convert Excel to CSV if needed
      if (file.name.endsWith(".xlsx") || file.name.endsWith(".xls")) {
        const data = await file.arrayBuffer();
        const workbook = read(data);
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const csvData = utils.sheet_to_csv(worksheet);

        const blob = new Blob([csvData], { type: "text/csv" });
        fileToUpload = new File([blob], "converted_data.csv", {
          type: "text/csv",
        });
      }

      const formData = new FormData();
      formData.append("file", fileToUpload);

      const response = await api.post("/clustering/upload.php", formData, {
        headers: {
          "Content-Type": undefined,
        },
      });

      Swal.fire({
        icon: "success",
        title: "Upload Berhasil",
        text: response.data.message,
        confirmButtonColor: "#3B82F6",
      });
      fetchData();
      return true; // Success indicator
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Upload Gagal",
        text: err.response?.data?.message || err.message,
        confirmButtonColor: "#EF4444",
      });
      return false; // Failure indicator
    } finally {
      setUploading(false);
    }
  };

  // Manual Submit Logic (Create/Update)
  const handleManualSubmit = async (formData, isEditing, editItemId) => {
    setUploading(true);
    try {
      let url = "/clustering/create.php";

      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (
          formData[key] !== null &&
          formData[key] !== undefined &&
          key !== "file_bukti"
        ) {
          data.append(key, formData[key]);
        }
      });
      // data.append("status", "PENDING_VERIF"); // Removed: Status now passed via formData
      if (formData.file_bukti) {
        data.append("file_bukti", formData.file_bukti);
      }
      if (user?.role === "operator_sekolah") {
        data.append("sekolah_id", user.sekolah_id);
      }

      if (isEditing && editItemId) {
        url = "/clustering/update.php";
        data.append("id", editItemId);
      }

      const response = await api.post(url, data, {
        headers: {
          "Content-Type": undefined,
        },
      });

      if (response.data.status === "success" || response.data.status === true) {
        Swal.fire({
          icon: "success",
          title: isEditing ? "Data Diperbarui" : "Data Disimpan",
          text: "Informasi sekolah berhasil disimpan ke database.",
          showConfirmButton: false,
          timer: 1500,
        });
        fetchData();
        return true;
      } else {
        throw new Error(response.data.message);
      }
    } catch (err) {
      console.error("Manual Submit Error:", err);
      console.error("Response:", err.response);

      let errorMessage = err.message;
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.response?.data) {
        errorMessage =
          typeof err.response.data === "string"
            ? err.response.data.substring(0, 100)
            : JSON.stringify(err.response.data);
      }

      Swal.fire({
        icon: "error",
        title: "Gagal Menyimpan",
        text: errorMessage,
        confirmButtonColor: "#EF4444",
      });
      return false;
    } finally {
      setUploading(false);
    }
  };

  // Verify Logic
  const handleVerify = async (id, status) => {
    let catatan = "";
    if (status === "REJECTED") {
      const { value: text } = await Swal.fire({
        input: "textarea",
        inputLabel: "Alasan Penolakan",
        inputPlaceholder: "Tuliskan alasan penolakan...",
        inputAttributes: {
          "aria-label": "Tuliskan alasan penolakan",
        },
        showCancelButton: true,
      });
      if (text) {
        catatan = text;
      } else {
        return; // Cancelled
      }
    } else {
      const result = await Swal.fire({
        title: "Konfirmasi Verifikasi",
        text: "Apakah Anda yakin ingin menyetujui laporan ini?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Ya, Setujui",
        cancelButtonText: "Batal",
      });
      if (!result.isConfirmed) return;
    }

    try {
      const response = await api.post("/clustering/verify.php", {
        id,
        status,
        catatan,
      });
      if (response.data.status === "success" || response.data.status === true) {
        Swal.fire("Berhasil", response.data.message, "success");
        fetchData();
      } else {
        Swal.fire("Gagal", response.data.message, "error");
      }
    } catch (err) {
      Swal.fire("Error", "Terjadi kesalahan server", "error");
    }
  };

  // Initial Load
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    uploading,
    fetchData,
    handleUpload,
    handleManualSubmit,
    handleVerify,
  };
};
