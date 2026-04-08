"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Beranda", href: "#beranda" },
  { label: "Tentang", href: "#tentang" },
  { label: "Layanan", href: "#layanan" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Testimonial", href: "#testimonial" },
  { label: "Kontak", href: "#kontak" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-navy-dark/95 backdrop-blur-lg shadow-glass border-b border-gold/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#beranda" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-gold flex items-center justify-center">
                <span className="font-display font-bold text-navy-dark text-lg">
                  P
                </span>
              </div>
              <div className="hidden sm:block">
                <span className="text-white font-display font-bold text-lg leading-tight block">
                  Prabaswara
                </span>
                <span className="text-gold text-xs font-body tracking-wider">
                  GANDAR PRIMA
                </span>
              </div>
            </a>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-body text-navy-200 hover:text-gold
                             transition-colors duration-300 rounded-lg hover:bg-white/5"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#kontak"
                className="ml-4 btn-primary text-sm px-6 py-2.5"
                id="nav-cta"
              >
                Hubungi Kami
              </a>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden relative w-10 h-10 flex items-center justify-center"
              aria-label="Toggle menu"
              id="mobile-menu-toggle"
            >
              <div className="w-6 flex flex-col gap-1.5">
                <motion.span
                  animate={
                    isMobileOpen
                      ? { rotate: 45, y: 6 }
                      : { rotate: 0, y: 0 }
                  }
                  className="w-full h-0.5 bg-white block origin-center transition-colors"
                />
                <motion.span
                  animate={
                    isMobileOpen ? { opacity: 0 } : { opacity: 1 }
                  }
                  className="w-full h-0.5 bg-white block"
                />
                <motion.span
                  animate={
                    isMobileOpen
                      ? { rotate: -45, y: -6 }
                      : { rotate: 0, y: 0 }
                  }
                  className="w-full h-0.5 bg-white block origin-center transition-colors"
                />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-navy-dark/90 backdrop-blur-xl"
              onClick={() => setIsMobileOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-navy-dark border-l border-gold/10 pt-24 px-8"
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    onClick={() => setIsMobileOpen(false)}
                    className="py-3 px-4 text-lg font-body text-navy-200 hover:text-gold
                               hover:bg-white/5 rounded-lg transition-colors duration-300"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-white/10">
                <a
                  href="#kontak"
                  onClick={() => setIsMobileOpen(false)}
                  className="btn-primary w-full text-center block"
                >
                  Hubungi Kami
                </a>
              </div>

              {/* Company info */}
              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-navy-300 text-xs font-body">
                  &copy; {new Date().getFullYear()} CV. Prabaswara Gandar Prima
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
