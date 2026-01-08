import React from "react";
import { Shield, Zap, BarChart3, Search } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: Shield,
      title: "Keamanan Terjamin",
      description:
        "Data terenkripsi dengan teknologi XOR + Base64 dan dilindungi dengan role-based access control.",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Zap,
      title: "Akses Cepat",
      description:
        "Pencarian instant dan download cepat untuk akses data ijazah kapan saja, dimana saja.",
      color: "from-rich-gold to-gold-light",
    },
    {
      icon: BarChart3,
      title: "Laporan Lengkap",
      description:
        "Activity logs terperinci dan sistem backup otomatis untuk keamanan data maksimal.",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Search,
      title: "Verifikasi Publik",
      description:
        "Masyarakat dapat memverifikasi keaslian ijazah secara online tanpa perlu datang ke kantor.",
      color: "from-purple-500 to-purple-600",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-deep-navy dark:text-white mb-4 font-serif">
            Fitur Unggulan
          </h2>
          <p className="text-lg text-archive-slate dark:text-gray-400 max-w-2xl mx-auto">
            Sistem arsip digital yang aman, cepat, dan mudah digunakan untuk
            pengelolaan data ijazah
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass-strong rounded-2xl p-6 border-2 border-gray-200/50 dark:border-white/10 hover:shadow-glass-lg hover:scale-105 transition-all group"
            >
              {/* Icon */}
              <div
                className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.color} mb-4 group-hover:scale-110 transition-transform`}
              >
                <feature.icon className="w-8 h-8 text-white" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-deep-navy dark:text-white mb-3 font-serif">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-archive-slate dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
