import React, { useState, useEffect } from "react";
import { api } from "../services/api";

// Components
import KlasterHeader from "../components/klaster/KlasterHeader";
import KlasterStats from "../components/klaster/KlasterStats";
import KlasterTable from "../components/klaster/KlasterTable";

export default function HasilKlaster() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tahun, setTahun] = useState(new Date().getFullYear());

  const fetchResult = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/clustering/result.php?tahun=${tahun}`);
      if (response.data.status === "success") {
        setData(response.data.data);
      } else {
        setData(null);
      }
    } catch (err) {
      console.error(err);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResult();
  }, [tahun]);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 min-h-screen transition-colors duration-300">
      <KlasterHeader tahun={tahun} setTahun={setTahun} />

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400 font-medium">
            Loading hasil...
          </p>
        </div>
      ) : !data ? (
        <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Belum ada hasil clustering
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Silakan jalankan proses clustering terlebih dahulu.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <KlasterStats data={data} />
          <KlasterTable data={data} />
        </div>
      )}
    </div>
  );
}
