import React from "react";
import { Upload, CheckCircle, Archive, ArrowRight } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: Upload,
      title: "Upload Ijazah",
      description:
        "Sekolah atau operator mengunggah data ijazah siswa ke sistem",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: CheckCircle,
      title: "Verifikasi Data",
      description:
        "Admin memverifikasi dan menyetujui data yang telah diunggah",
      color: "from-rich-gold to-gold-light",
    },
    {
      icon: Archive,
      title: "Tersimpan Aman",
      description: "Data terarsip dengan aman dan dapat diakses kapan saja",
      color: "from-green-500 to-green-600",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-deep-navy dark:text-white mb-4 font-serif">
            Cara Kerja Sistem
          </h2>
          <p className="text-lg text-archive-slate dark:text-gray-400 max-w-2xl mx-auto">
            Proses sederhana dalam 3 langkah untuk mengelola arsip ijazah
            digital
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <div className="relative">
                {/* Card */}
                <div className="glass-strong rounded-2xl p-8 border-2 border-gray-200/50 dark:border-white/10 hover:shadow-glass-lg transition-all text-center">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-gradient-gold rounded-full flex items-center justify-center text-white font-bold text-sm shadow-glow-gold">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div
                    className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${step.color} mb-4`}
                  >
                    <step.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-deep-navy dark:text-white mb-3 font-serif">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-archive-slate dark:text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Arrow (not on last item) */}
              {index < steps.length - 1 && (
                <div
                  className="hidden md:flex items-center justify-center absolute top-1/2 -translate-y-1/2"
                  style={{ left: `${(index + 1) * 33.33 - 16.66}%` }}
                >
                  <ArrowRight className="w-8 h-8 text-rich-gold" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
