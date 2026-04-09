"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const phrases = [
  "Solusi Terpercaya untuk Bisnis Anda",
  "Mitra Strategis Pertumbuhan Usaha",
  "Layanan Profesional & Berkualitas",
];

export default function Hero() {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const phrase = phrases[currentPhrase];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < phrase.length) {
            setDisplayText(phrase.slice(0, displayText.length + 1));
          } else {
            // Pause before deleting
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentPhrase((prev) => (prev + 1) % phrases.length);
          }
        }
      },
      isDeleting ? 30 : 60
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentPhrase]);

  return (
    <section
      id="beranda"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero" />

      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -30, 20, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gold/5 blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -20, 30, 0],
            y: [0, 20, -30, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-navy-light/30 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.03, 0.06, 0.03],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gold/5 blur-3xl"
        />
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(201,168,76,0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(201,168,76,0.3) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 section-container text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                       bg-white/5 border border-gold/20 backdrop-blur-sm mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="text-gold text-sm font-body font-medium">
              CV. Prabaswara Gandar Prima
            </span>
          </motion.div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight">
            Membangun
            <span className="block text-gradient-gold mt-2">Masa Depan</span>
            <span className="block mt-2">Bersama Anda</span>
          </h1>

          {/* Typing text */}
          <div className="h-12 flex items-center justify-center mb-10">
            <p className="text-lg sm:text-xl md:text-2xl text-navy-200 font-body">
              {displayText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="inline-block w-0.5 h-6 bg-gold ml-1 align-middle"
              />
            </p>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a href="#kontak" className="btn-primary text-lg px-10 py-4" id="hero-cta-primary">
              Mulai Konsultasi
            </a>
            <a href="#layanan" className="btn-outline text-lg px-10 py-4" id="hero-cta-secondary">
              Lihat Layanan
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
