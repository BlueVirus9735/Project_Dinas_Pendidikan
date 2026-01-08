import React from "react";

export default function FilterCard({
  icon: Icon,
  label,
  value,
  onChange,
  options,
  placeholder = "Semua",
  optionKey = null,
  optionLabel = null,
}) {
  const optionCount = options?.length || 0;

  return (
    <div className="group relative">
      {/* Glassmorphism Card */}
      <div className="glass-strong rounded-2xl p-5 transition-smooth hover:shadow-glass-lg hover:-translate-y-1 border-2 border-transparent hover:border-rich-gold/30 relative overflow-hidden">
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-rich-gold/0 to-rich-gold/0 group-hover:from-rich-gold/5 group-hover:to-gold-light/5 transition-smooth pointer-events-none rounded-2xl" />

        {/* Content */}
        <div className="relative z-10">
          {/* Header with Icon and Label */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-gold flex items-center justify-center text-white shadow-glow-gold group-hover:scale-110 transition-smooth">
              <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-deep-navy dark:text-white font-serif">
                {label}
              </h3>
              <p className="text-xs text-archive-slate dark:text-gray-400">
                {optionCount} pilihan
              </p>
            </div>
          </div>

          {/* Select Dropdown */}
          <select
            value={value}
            onChange={onChange}
            className="w-full px-4 py-3 bg-white/50 dark:bg-gray-900/50 border-2 border-gray-200/50 dark:border-white/10 rounded-xl text-sm font-medium text-deep-navy dark:text-white outline-none focus:ring-2 focus:ring-rich-gold/50 focus:border-rich-gold/50 transition-smooth cursor-pointer hover:border-rich-gold/30"
          >
            <option value="">{placeholder}</option>
            {options?.map((option, index) => {
              const optionValue = optionKey ? option[optionKey] : option;
              const optionDisplay = optionLabel ? option[optionLabel] : option;

              return (
                <option key={index} value={optionValue}>
                  {optionDisplay}
                </option>
              );
            })}
          </select>

          {/* Active Indicator Badge */}
          {value && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-gold rounded-full flex items-center justify-center shadow-glow-gold animate-scale-in">
              <div className="w-2 h-2 bg-white rounded-full" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
