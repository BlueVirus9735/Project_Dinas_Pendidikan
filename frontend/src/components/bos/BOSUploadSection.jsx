import React from "react";
import { FileSpreadsheet } from "lucide-react";

export default function BOSUploadSection({ file, onUpload, isUploading }) {
  if (!file) return null;

  return (
    <div className="mt-6 lg:col-span-3">
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/50 p-4 rounded-xl flex items-center justify-between animate-in fade-in slide-in-from-top-2">
        <div className="flex items-center gap-3">
          <FileSpreadsheet className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span className="text-sm font-medium text-blue-900 dark:text-blue-200">
            File terpilih: <span className="font-bold">{file.name}</span>
          </span>
        </div>
        <button
          onClick={onUpload}
          disabled={isUploading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isUploading ? "Mengupload..." : "Upload Sekarang"}
        </button>
      </div>
    </div>
  );
}
