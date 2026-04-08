"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

const portfolioItems = [
  {
    id: 1,
    title: "Pembangunan Infrastruktur Jalan",
    category: "Infrastruktur",
    description:
      "Proyek pembangunan dan perbaikan infrastruktur jalan sepanjang 5km di kawasan industri.",
    year: "2024",
  },
  {
    id: 2,
    title: "Renovasi Gedung Perkantoran",
    category: "Konstruksi",
    description:
      "Renovasi total gedung perkantoran 5 lantai dengan desain modern dan efisien energi.",
    year: "2024",
  },
  {
    id: 3,
    title: "Pengadaan Alat Berat",
    category: "Pengadaan",
    description:
      "Pengadaan dan distribusi alat berat untuk proyek pembangunan skala besar.",
    year: "2023",
  },
  {
    id: 4,
    title: "Konsultasi Manajemen Proyek",
    category: "Konsultasi",
    description:
      "Pendampingan manajemen proyek untuk perusahaan manufaktur selama 12 bulan.",
    year: "2023",
  },
  {
    id: 5,
    title: "Perencanaan Tata Ruang",
    category: "Perencanaan",
    description:
      "Perencanaan tata ruang kawasan komersial dengan pendekatan berkelanjutan.",
    year: "2023",
  },
  {
    id: 6,
    title: "Supply Chain Optimization",
    category: "Logistik",
    description:
      "Optimalisasi rantai pasok untuk perusahaan distribusi nasional.",
    year: "2022",
  },
];

const categories = ["Semua", ...Array.from(new Set(portfolioItems.map((p) => p.category)))];

// Generate color based on category
function getCategoryColor(category: string) {
  const colors: Record<string, string> = {
    Infrastruktur: "from-blue-500/20 to-navy/80",
    Konstruksi: "from-amber-500/20 to-navy/80",
    Pengadaan: "from-emerald-500/20 to-navy/80",
    Konsultasi: "from-purple-500/20 to-navy/80",
    Perencanaan: "from-rose-500/20 to-navy/80",
    Logistik: "from-cyan-500/20 to-navy/80",
  };
  return colors[category] || "from-gold/20 to-navy/80";
}

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("Semua");

  const filtered =
    activeCategory === "Semua"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory);

  return (
    <section id="portfolio" className="section-padding bg-gradient-navy relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -mr-48" />

      <div className="section-container relative">
        <SectionHeading
          title="Portfolio Kami"
          subtitle="Proyek-proyek yang telah kami selesaikan dengan penuh dedikasi"
          light
        />

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full font-body text-sm font-medium
                         transition-all duration-300 ${
                           activeCategory === cat
                             ? "bg-gold text-navy-dark shadow-gold"
                             : "bg-white/10 text-navy-200 hover:bg-white/20 border border-white/10"
                         }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Masonry Grid */}
        <motion.div layout className="masonry-grid">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="masonry-item"
              >
                <div className="glass-card group overflow-hidden cursor-pointer">
                  {/* Visual header */}
                  <div
                    className={`relative h-48 bg-gradient-to-br ${getCategoryColor(item.category)}
                               flex items-center justify-center overflow-hidden`}
                  >
                    <div className="text-center p-6">
                      <span className="text-gold/60 font-body text-xs font-semibold uppercase tracking-widest">
                        {item.category}
                      </span>
                      <h3 className="text-white font-display font-bold text-lg mt-2 leading-snug">
                        {item.title}
                      </h3>
                    </div>
                    {/* Hover overlay */}
                    <div
                      className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100
                                  transition-opacity duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-navy-200 font-body text-sm leading-relaxed">
                      {item.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-gold/70 text-xs font-body font-medium">
                        {item.year}
                      </span>
                      <span
                        className="text-gold text-sm font-body font-semibold
                                    inline-flex items-center gap-1 group-hover:gap-2 transition-all"
                      >
                        Detail
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
