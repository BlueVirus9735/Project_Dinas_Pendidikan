import React from "react";
import {
  Download,
  RefreshCw,
  Trash2,
  FileArchive,
  Calendar,
} from "lucide-react";

export default function BackupCard({
  backup,
  onDownload,
  onRestore,
  onDelete,
}) {
  const formatSize = (bytes) => {
    if (!bytes) return "0 MB";
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(2)} MB`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("id-ID", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="group bg-white/50 dark:bg-gray-900/50 border-2 border-gray-200 dark:border-white/10 rounded-xl p-5 hover:border-rich-gold/30 hover:shadow-glass transition-smooth">
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-smooth">
          <FileArchive className="w-6 h-6" />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-deep-navy dark:text-white mb-1 truncate">
            {backup.filename}
          </h3>
          <div className="flex items-center gap-4 text-sm text-archive-slate dark:text-gray-400">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(backup.date)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FileArchive className="w-4 h-4" />
              <span>{formatSize(backup.size)}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onDownload}
            className="p-2.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-smooth group/btn"
            title="Download"
          >
            <Download className="w-4 h-4 group-hover/btn:scale-110 transition-smooth" />
          </button>
          <button
            onClick={onRestore}
            className="p-2.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white transition-smooth group/btn"
            title="Restore"
          >
            <RefreshCw className="w-4 h-4 group-hover/btn:scale-110 transition-smooth" />
          </button>
          <button
            onClick={onDelete}
            className="p-2.5 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-smooth group/btn"
            title="Delete"
          >
            <Trash2 className="w-4 h-4 group-hover/btn:scale-110 transition-smooth" />
          </button>
        </div>
      </div>
    </div>
  );
}
