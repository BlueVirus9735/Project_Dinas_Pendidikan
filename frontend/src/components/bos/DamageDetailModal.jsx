import React, { useState, useEffect } from "react";
import { X, Save, Plus, AlertCircle, Box, Trash2 } from "lucide-react";

export default function DamageDetailModal({
  isOpen,
  onClose,
  initialList = [],
  onSave,
  userRole,
}) {
  const [items, setItems] = useState([]);
  const [masterItems, setMasterItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch Master Data only once
  useEffect(() => {
    const fetchMaster = async () => {
      try {
        const res = await fetch(
          "http://localhost:8000/api/master_fasilitas.php"
        );
        const json = await res.json();
        if (json.status === "success") {
          setMasterItems(
            json.data.map((m) => ({
              name: m.nama_fasilitas,
              score: Number(m.nilai_standar),
              desc: `Nilai: ${m.nilai_standar}`,
              is_master: true,
            }))
          );
        }
      } catch (e) {
        console.error("Failed fetch master", e);
      } finally {
        setLoading(false);
      }
    };
    fetchMaster();
  }, []);

  // Initialize Items (Merge Master + Initial List)
  useEffect(() => {
    if (isOpen && !loading) {
      // 1. Start with Master Items (Clone to avoid mutation)
      let combined = masterItems.map((m) => ({ ...m, count: 0 }));

      // 2. Merge Initial List
      if (initialList && initialList.length > 0) {
        initialList.forEach((saved) => {
          const idx = combined.findIndex((m) => m.name === saved.name);
          if (idx >= 0) {
            combined[idx].count = saved.count;
          } else {
            // Custom item
            combined.push({
              name: saved.name,
              score: saved.score,
              count: saved.count,
              is_master: false,
            });
          }
        });
      }
      setItems(combined);
    }
  }, [isOpen, loading, initialList, masterItems]);

  const handleCountChange = (index, val) => {
    const newItems = [...items];
    newItems[index].count = Math.max(0, val);
    setItems(newItems);
  };

  const handleAddCustom = () => {
    const name = prompt("Masukan Nama Fasilitas:");
    if (!name) return;
    const score = Number(prompt("Masukan Skor Kerusakan per Unit:", "1"));
    if (score > 0) {
      setItems((prev) => [
        ...prev,
        { name, count: 1, score, is_master: false },
      ]);
    }
  };

  const handleSave = () => {
    // Filter only items with count > 0 for efficiency
    const activeItems = items.filter((i) => i.count > 0);
    onSave(activeItems);
    onClose();
  };

  const totalScore = items.reduce(
    (acc, curr) => acc + curr.count * curr.score,
    0
  );

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const canEdit = userRole === "operator_sekolah" || !userRole; // Default true if no user provided (dev)

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[85vh] relative z-10 border border-white/20 dark:border-white/10 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 dark:border-white/10 bg-gray-50/80 dark:bg-slate-800/80 flex justify-between items-center backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-2xl">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Rincian Kerusakan
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Input detail fasilitas yang rusak
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
              Total Skor
            </div>
            <div className="text-2xl font-black text-red-600 dark:text-red-400">
              {totalScore}
            </div>
          </div>
        </div>

        {/* Search & Toolbar */}
        {canEdit && (
          <div className="p-4 border-b border-gray-100 dark:border-white/5 flex gap-3 bg-white dark:bg-slate-900">
            <input
              placeholder="Cari nama fasilitas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 bg-gray-50 dark:bg-slate-800 border-none rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
            />
            <button
              type="button"
              onClick={handleAddCustom}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-bold transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Custom
            </button>
          </div>
        )}

        {/* List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-2 bg-gray-50/50 dark:bg-slate-900/50">
          {loading ? (
            <div className="text-center py-10 text-gray-400">
              Memuat data master...
            </div>
          ) : (
            filteredItems.map((item, idx) => (
              <div
                key={idx}
                className={`group flex items-center justify-between p-4 rounded-2xl border transition-all duration-200 ${
                  item.count > 0
                    ? "bg-white dark:bg-slate-800 border-red-200 dark:border-red-500/30 shadow-sm shadow-red-500/5"
                    : "bg-white dark:bg-slate-800 border-gray-100 dark:border-white/5 opacity-80 hover:opacity-100"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      item.count > 0
                        ? "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400"
                        : "bg-gray-100 text-gray-400 dark:bg-slate-700 dark:text-slate-500"
                    }`}
                  >
                    <Box className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-800 dark:text-gray-200">
                      {item.name}
                    </div>
                    <div className="text-xs text-gray-400">
                      Nilai Satuan: {item.score}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {canEdit ? (
                    <div className="flex items-center gap-2 bg-gray-50 dark:bg-slate-900 rounded-lg p-1 border border-gray-200 dark:border-slate-700">
                      <button
                        type="button"
                        onClick={() => handleCountChange(idx, item.count - 1)}
                        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-white dark:hover:bg-slate-800 rounded-md transition-colors font-bold"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        className="w-12 text-center bg-transparent text-sm font-bold outline-none"
                        value={item.count}
                        onChange={(e) =>
                          handleCountChange(idx, Number(e.target.value))
                        }
                      />
                      <button
                        type="button"
                        onClick={() => handleCountChange(idx, item.count + 1)}
                        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-white dark:hover:bg-slate-800 rounded-md transition-colors font-bold"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <div className="px-4 py-2 bg-gray-100 dark:bg-slate-800 rounded-xl font-bold text-gray-700 dark:text-gray-300">
                      {item.count} Unit
                    </div>
                  )}

                  <div className="w-16 text-right font-bold text-red-500">
                    {item.count * item.score}
                  </div>

                  {canEdit && !item.is_master && (
                    <button
                      type="button"
                      onClick={() => {
                        const conf = confirm("Hapus item ini?");
                        if (conf)
                          setItems((prev) => prev.filter((_, i) => i !== idx));
                      }}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-gray-100 dark:border-white/10 bg-white dark:bg-slate-900 flex justify-end gap-3 z-20">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl text-gray-500 hover:bg-gray-50 dark:hover:bg-slate-800 font-bold transition-all"
          >
            Batal
          </button>
          {canEdit && (
            <button
              type="button"
              onClick={handleSave}
              className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold shadow-lg shadow-red-500/30 transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4" /> Simpan Perubahan
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
