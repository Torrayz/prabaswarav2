"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";

const services = [
  {
    icon: "📋",
    nama: "Konsultasi Bisnis",
    deskripsi:
      "Layanan konsultasi strategis untuk membantu perusahaan Anda merencanakan dan mengoptimalkan operasi bisnis secara menyeluruh.",
  },
  {
    icon: "🏗️",
    nama: "Manajemen Proyek",
    deskripsi:
      "Pengelolaan proyek profesional dari perencanaan hingga penyelesaian dengan standar kualitas tinggi dan tepat waktu.",
  },
  {
    icon: "📊",
    nama: "Analisis & Pelaporan",
    deskripsi:
      "Layanan analisis data dan pelaporan komprehensif untuk mendukung pengambilan keputusan bisnis yang tepat.",
  },
  {
    icon: "🔧",
    nama: "Pengadaan & Logistik",
    deskripsi:
      "Solusi pengadaan barang dan jasa serta manajemen logistik yang efisien untuk kebutuhan operasional perusahaan.",
  },
  {
    icon: "📐",
    nama: "Perencanaan & Desain",
    deskripsi:
      "Layanan perencanaan dan desain yang kreatif serta fungsional sesuai dengan kebutuhan spesifik klien.",
  },
  {
    icon: "🤝",
    nama: "Kemitraan Strategis",
    deskripsi:
      "Fasilitasi kemitraan strategis dan pengembangan jaringan bisnis untuk pertumbuhan jangka panjang.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function ServicesGrid() {
  return (
    <section id="layanan" className="section-padding bg-white relative">
      {/* Decorative */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-navy/5 rounded-full blur-3xl -ml-48 -mb-48" />

      <div className="section-container relative">
        <SectionHeading
          title="Layanan Kami"
          subtitle="Solusi komprehensif untuk setiap kebutuhan bisnis Anda"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <motion.div key={service.nama} variants={itemVariants}>
              <Card variant="elevated" className="p-8 h-full group">
                <div
                  className="w-14 h-14 rounded-xl bg-navy/5 flex items-center justify-center
                             text-2xl mb-6 group-hover:bg-gold/10 group-hover:scale-110
                             transition-all duration-300"
                >
                  {service.icon}
                </div>
                <h3 className="text-xl font-display font-bold text-navy mb-3">
                  {service.nama}
                </h3>
                <p className="text-navy-400 font-body leading-relaxed text-sm">
                  {service.deskripsi}
                </p>
                <div className="mt-6 pt-4 border-t border-navy-50">
                  <a
                    href="#kontak"
                    className="text-gold font-body font-semibold text-sm
                               inline-flex items-center gap-2 hover:gap-3 transition-all duration-300"
                  >
                    Pelajari Lebih Lanjut
                    <svg
                      className="w-4 h-4"
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
                  </a>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          <a
            href="/services"
            className="btn-secondary inline-flex items-center gap-2"
            id="services-cta"
          >
            Lihat Semua Layanan
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
