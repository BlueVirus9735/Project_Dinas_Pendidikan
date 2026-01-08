import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Apa itu Sistem Arsip Digital Ijazah?",
      answer:
        "Sistem Arsip Digital Ijazah adalah platform berbasis web untuk mengelola, menyimpan, dan memverifikasi data ijazah siswa secara digital. Sistem ini memudahkan sekolah, dinas pendidikan, dan masyarakat dalam mengakses informasi ijazah dengan aman dan cepat.",
    },
    {
      question: "Siapa yang bisa mengakses sistem ini?",
      answer:
        "Sistem ini memiliki beberapa level akses: Super Admin (Dinas Pendidikan) memiliki akses penuh, Admin Ijazah dapat mengelola data ijazah, Operator Sekolah dapat mengunggah data dari sekolah masing-masing, dan Masyarakat Umum dapat memverifikasi keaslian ijazah melalui fitur verifikasi publik.",
    },
    {
      question: "Bagaimana cara verifikasi ijazah?",
      answer:
        "Untuk memverifikasi ijazah, cukup masukkan nomor ijazah pada form verifikasi di halaman ini. Sistem akan menampilkan informasi dasar seperti nama, sekolah, dan tahun lulus jika ijazah valid. Tidak perlu login untuk menggunakan fitur ini.",
    },
    {
      question: "Apakah data ijazah aman?",
      answer:
        "Ya, sangat aman. Data ijazah dienkripsi menggunakan teknologi XOR + Base64, dilindungi dengan role-based access control, dan disimpan dengan sistem backup otomatis. Semua aktivitas tercatat dalam activity logs untuk audit trail.",
    },
    {
      question: "Bagaimana jika ijazah hilang atau rusak?",
      answer:
        "Jika ijazah fisik hilang atau rusak, data digital tetap tersimpan aman di sistem. Sekolah atau dinas pendidikan dapat mencetak ulang ijazah berdasarkan data yang terarsip. Untuk keperluan ini, silakan hubungi sekolah atau Dinas Pendidikan Kabupaten Cirebon.",
    },
    {
      question: "Apakah ada biaya untuk menggunakan sistem ini?",
      answer:
        "Tidak ada biaya untuk verifikasi ijazah melalui sistem ini. Layanan verifikasi publik gratis untuk masyarakat. Untuk akses sebagai operator atau admin, silakan hubungi Dinas Pendidikan Kabupaten Cirebon.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 mb-4">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-deep-navy dark:text-white mb-4 font-serif">
            Pertanyaan Umum
          </h2>
          <p className="text-lg text-archive-slate dark:text-gray-400">
            Temukan jawaban untuk pertanyaan yang sering diajukan
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="glass-strong rounded-2xl border-2 border-gray-200/50 dark:border-white/10 overflow-hidden"
            >
              {/* Question Button */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
              >
                <span className="text-lg font-bold text-deep-navy dark:text-white pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-rich-gold flex-shrink-0 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Answer */}
              {openIndex === index && (
                <div className="px-6 pb-4 pt-2 border-t border-gray-200 dark:border-white/10">
                  <p className="text-archive-slate dark:text-gray-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center p-6 glass-strong rounded-2xl border-2 border-rich-gold/30">
          <p className="text-deep-navy dark:text-white mb-2">
            <strong>Masih ada pertanyaan?</strong>
          </p>
          <p className="text-sm text-archive-slate dark:text-gray-400">
            Hubungi Dinas Pendidikan Kabupaten Cirebon untuk informasi lebih
            lanjut
          </p>
        </div>
      </div>
    </section>
  );
}
