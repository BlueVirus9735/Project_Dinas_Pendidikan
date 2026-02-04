import React, { useState, useEffect } from "react";
import { Trash2, AlertTriangle, Search, Filter } from "lucide-react";
import toast from "react-hot-toast";
import { api } from "../services/api";
import TrashCard from "../components/trash/TrashCard";
import ConfirmModal from "../components/common/ConfirmModal";

export default function Trash() {
  const [trashItems, setTrashItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showPermanentDeleteModal, setShowPermanentDeleteModal] =
    useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchTrash();
  }, []);

  const fetchTrash = async () => {
    setLoading(true);
    try {
      const response = await api.get("/trash/list.php");
      const data = response.data;

      if (data.status) {
        setTrashItems(data.data.items || []);
      } else {
        toast.error(data.message || "Gagal memuat trash");
      }
    } catch (error) {
      console.error("Error fetching trash:", error);
      toast.error("Terjadi kesalahan saat memuat data");
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async (item) => {
    try {
      const response = await api.post("/trash/restore.php", { id: item.id });
      const data = response.data;

      if (data.status) {
        toast.success(`Ijazah ${item.nama} berhasil dipulihkan!`);
        fetchTrash(); // Refresh list
      } else {
        toast.error(data.message || "Gagal memulihkan ijazah");
      }
    } catch (error) {
      console.error("Error restoring:", error);
      toast.error("Terjadi kesalahan saat memulihkan data");
    }
  };

  const handlePermanentDeleteClick = (item) => {
    setSelectedItem(item);
    setShowPermanentDeleteModal(true);
  };

  const handlePermanentDeleteConfirm = async () => {
    if (!selectedItem) return;

    try {
      const response = await api.post("/trash/permanent-delete.php", {
        id: selectedItem.id,
      });
      const data = response.data;

      if (data.status) {
        toast.success(`Ijazah ${selectedItem.nama} berhasil dihapus permanen!`);
        setShowPermanentDeleteModal(false);
        setSelectedItem(null);
        fetchTrash(); // Refresh list
      } else {
        toast.error(data.message || "Gagal menghapus permanen");
      }
    } catch (error) {
      console.error("Error permanent delete:", error);
      toast.error("Terjadi kesalahan saat menghapus data");
    }
  };

  // Filter items based on search
  const filteredItems = trashItems.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.nama?.toLowerCase().includes(query) ||
      item.nisn?.toLowerCase().includes(query) ||
      item.sekolah?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="p-6 space-y-6 animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl">
            <Trash2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-deep-navy dark:text-white font-serif">
              Trash / Arsip Terhapus
            </h1>
            <p className="text-sm text-archive-slate dark:text-gray-400">
              Data yang dihapus dapat dipulihkan dalam 90 hari
            </p>
          </div>
        </div>

        {/* Item Count */}
        <div className="px-4 py-2 bg-red-500/10 border-2 border-red-500/30 rounded-xl">
          <span className="text-sm font-bold text-red-600 dark:text-red-400">
            {filteredItems.length} Item
          </span>
        </div>
      </div>

      {/* Warning Banner */}
      <div className="glass-strong rounded-2xl p-4 border-2 border-amber-500/30">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-deep-navy dark:text-white mb-1">
              Perhatian: Retention Policy 90 Hari
            </p>
            <p className="text-sm text-archive-slate dark:text-gray-400">
              Data yang berada di trash lebih dari 90 hari akan{" "}
              <strong>dihapus permanen secara otomatis</strong> dan tidak dapat
              dipulihkan.
            </p>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="glass-strong rounded-2xl p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-archive-slate dark:text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama, NISN, atau sekolah..."
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-white/10 rounded-xl text-deep-navy dark:text-white focus:ring-2 focus:ring-rich-gold/50 focus:border-rich-gold/50 transition-smooth outline-none"
            />
          </div>
        </div>
      </div>

      {/* Trash Items List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-rich-gold border-t-transparent"></div>
          <p className="mt-4 text-archive-slate dark:text-gray-400">
            Memuat data trash...
          </p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="glass-strong rounded-2xl p-12 text-center">
          <Trash2 className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-deep-navy dark:text-white mb-2">
            {searchQuery ? "Tidak ada hasil" : "Trash Kosong"}
          </h3>
          <p className="text-archive-slate dark:text-gray-400">
            {searchQuery
              ? "Tidak ada data yang cocok dengan pencarian"
              : "Tidak ada ijazah yang dihapus"}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <TrashCard
              key={item.id}
              item={item}
              onRestore={handleRestore}
              onPermanentDelete={handlePermanentDeleteClick}
            />
          ))}
        </div>
      )}

      {/* Permanent Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showPermanentDeleteModal}
        onClose={() => {
          setShowPermanentDeleteModal(false);
          setSelectedItem(null);
        }}
        onConfirm={handlePermanentDeleteConfirm}
        title="Hapus Permanen?"
        message={`Anda yakin ingin menghapus permanen ijazah "${selectedItem?.nama}"? Data yang dihapus permanen TIDAK DAPAT dipulihkan kembali!`}
        confirmText="Hapus Permanen"
        confirmButtonClass="bg-red-500 hover:bg-red-600"
      />
    </div>
  );
}
