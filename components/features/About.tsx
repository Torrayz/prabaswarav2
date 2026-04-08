"use client";

import { motion } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";
import SectionHeading from "@/components/ui/SectionHeading";

const stats = [
  { label: "Tahun Pengalaman", end: 10, suffix: "+" },
  { label: "Proyek Selesai", end: 150, suffix: "+" },
  { label: "Klien Puas", end: 80, suffix: "+" },
  { label: "Tim Profesional", end: 25, suffix: "" },
];

function StatCounter({
  label,
  end,
  suffix,
  delay,
}: {
  label: string;
  end: number;
  suffix: string;
  delay: number;
}) {
  const { formattedCount, ref } = useCountUp({ end, suffix, duration: 2500 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="text-center"
    >
      <div className="text-4xl md:text-5xl font-display font-bold text-gradient-gold mb-2">
        {formattedCount}
      </div>
      <div className="text-navy-400 font-body text-sm">{label}</div>
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="tentang" className="section-padding bg-cream relative">
      {/* Decorative element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -mr-32 -mt-32" />

      <div className="section-container relative">
        <SectionHeading
          title="Tentang Kami"
          subtitle="Mengenal lebih dekat CV. Prabaswara Gandar Prima"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl md:text-3xl font-display font-bold text-navy mb-6">
              Mitra Terpercaya dalam
              <span className="text-gradient-gold"> Pertumbuhan Bisnis</span>
            </h3>
            <div className="space-y-4 text-navy-400 font-body leading-relaxed">
              <p>
                CV. Prabaswara Gandar Prima adalah perusahaan yang berdedikasi
                untuk memberikan layanan profesional terbaik. Dengan pengalaman
                bertahun-tahun di industri, kami telah membantu ratusan klien
                mencapai tujuan bisnis mereka.
              </p>
              <p>
                Kami percaya bahwa setiap bisnis memiliki potensi untuk berkembang.
                Dengan pendekatan yang personal dan solusi yang inovatif, kami
                berkomitmen untuk menjadi mitra strategis dalam perjalanan sukses
                Anda.
              </p>
              <p>
                Tim kami terdiri dari profesional berpengalaman yang siap
                memberikan layanan berkualitas tinggi dengan standar terbaik.
              </p>
            </div>

            {/* Values */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { icon: "🎯", text: "Fokus pada Kualitas" },
                { icon: "🤝", text: "Kemitraan Jangka Panjang" },
                { icon: "💡", text: "Inovasi Berkelanjutan" },
                { icon: "⚡", text: "Respons Cepat" },
              ].map((value, i) => (
                <motion.div
                  key={value.text}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white border border-navy-50"
                >
                  <span className="text-xl">{value.icon}</span>
                  <span className="text-sm font-body font-medium text-navy">
                    {value.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image / Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-gradient-navy">
              {/* Abstract visual representing professionalism */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-gold mx-auto mb-6 flex items-center justify-center">
                    <span className="text-4xl font-display font-bold text-navy-dark">
                      PGP
                    </span>
                  </div>
                  <p className="text-white/80 font-display text-xl">
                    CV. Prabaswara Gandar Prima
                  </p>
                  <p className="text-gold/80 font-body text-sm mt-2">
                    Profesional • Terpercaya • Inovatif
                  </p>
                </div>
              </div>
              {/* Decorative borders */}
              <div className="absolute top-4 left-4 right-4 bottom-4 border border-gold/20 rounded-xl" />
              <div className="absolute top-8 left-8 right-8 bottom-8 border border-gold/10 rounded-lg" />
            </div>

            {/* Floating card */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 border border-navy-50"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
                  <span className="text-gold text-lg">★</span>
                </div>
                <div>
                  <div className="text-sm font-display font-bold text-navy">
                    Terpercaya
                  </div>
                  <div className="text-xs text-navy-400 font-body">
                    Sejak 2014
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 p-8 rounded-2xl bg-white border border-navy-50 shadow-sm"
        >
          {stats.map((stat, i) => (
            <StatCounter
              key={stat.label}
              label={stat.label}
              end={stat.end}
              suffix={stat.suffix}
              delay={i * 0.1}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
