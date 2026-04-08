"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

const testimonials = [
  {
    id: 1,
    nama: "Ahmad Faisal",
    jabatan: "Direktur Utama",
    perusahaan: "PT. Mitra Usaha Nusantara",
    kutipan:
      "Kerja sama dengan CV. Prabaswara Gandar Prima sangat memuaskan. Tim mereka profesional, responsif, dan hasilnya selalu melebihi ekspektasi kami. Kami sangat merekomendasikan mereka.",
    rating: 5,
  },
  {
    id: 2,
    nama: "Siti Nurhaliza",
    jabatan: "General Manager",
    perusahaan: "PT. Berkah Sejahtera",
    kutipan:
      "Proyek kami selesai tepat waktu dengan kualitas yang sangat baik. Komunikasi selama proyek berjalan sangat lancar dan setiap masalah ditangani dengan cepat.",
    rating: 5,
  },
  {
    id: 3,
    nama: "Budi Santoso",
    jabatan: "Owner",
    perusahaan: "CV. Karya Mandiri",
    kutipan:
      "Saya sudah bekerja sama dengan Prabaswara selama 3 tahun dan selalu puas dengan hasilnya. Mereka benar-benar memahami kebutuhan klien dan memberikan solusi yang tepat.",
    rating: 5,
  },
  {
    id: 4,
    nama: "Diana Putri",
    jabatan: "Head of Operations",
    perusahaan: "PT. Global Teknindo",
    kutipan:
      "Tim Prabaswara Gandar Prima memiliki keahlian yang luar biasa. Konsultasi bisnis mereka membantu kami meningkatkan efisiensi operasional hingga 40%.",
    rating: 5,
  },
];

export default function Testimonial() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);

    // Auto-play
    const autoplay = setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollTo(0);
      }
    }, 5000);

    return () => {
      emblaApi.off("select", onSelect);
      clearInterval(autoplay);
    };
  }, [emblaApi, onSelect]);

  return (
    <section id="testimonial" className="section-padding bg-cream relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl -mt-80" />

      <div className="section-container relative">
        <SectionHeading
          title="Apa Kata Klien Kami"
          subtitle="Kepuasan klien adalah prioritas utama kami"
        />

        {/* Carousel */}
        <div className="overflow-hidden -mx-4" ref={emblaRef}>
          <div className="flex">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="flex-[0_0_100%] min-w-0 px-4 md:flex-[0_0_80%] lg:flex-[0_0_60%]"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-8 md:p-10 border border-navy-50 shadow-sm relative"
                >
                  {/* Quote mark */}
                  <div className="absolute top-6 right-8 text-6xl text-gold/10 font-display leading-none">
                    &ldquo;
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-gold"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-navy-400 font-body leading-relaxed text-base md:text-lg mb-8 relative">
                    &ldquo;{t.kutipan}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center">
                      <span className="text-navy-dark font-display font-bold text-lg">
                        {t.nama.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-display font-bold text-navy">
                        {t.nama}
                      </div>
                      <div className="text-sm text-navy-400 font-body">
                        {t.jabatan} — {t.perusahaan}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === selectedIndex
                  ? "bg-gold w-8"
                  : "bg-navy-200 hover:bg-navy-300"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
