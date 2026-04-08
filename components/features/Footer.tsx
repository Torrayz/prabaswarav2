import Link from "next/link";

const footerLinks = {
  layanan: [
    { label: "Konsultasi Bisnis", href: "#layanan" },
    { label: "Manajemen Proyek", href: "#layanan" },
    { label: "Analisis & Pelaporan", href: "#layanan" },
    { label: "Pengadaan & Logistik", href: "#layanan" },
  ],
  perusahaan: [
    { label: "Tentang Kami", href: "#tentang" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Testimonial", href: "#testimonial" },
    { label: "Kontak", href: "#kontak" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-gold flex items-center justify-center">
                <span className="font-display font-bold text-navy-dark text-lg">
                  P
                </span>
              </div>
              <div>
                <span className="text-white font-display font-bold text-lg block leading-tight">
                  Prabaswara
                </span>
                <span className="text-gold text-xs font-body tracking-wider">
                  GANDAR PRIMA
                </span>
              </div>
            </div>
            <p className="text-navy-200 font-body text-sm leading-relaxed mb-6">
              Mitra terpercaya untuk solusi bisnis profesional. Kami berkomitmen
              memberikan layanan berkualitas tinggi untuk kesuksesan bisnis Anda.
            </p>
          </div>

          {/* Layanan */}
          <div>
            <h4 className="font-display font-bold text-white text-lg mb-6">
              Layanan
            </h4>
            <ul className="space-y-3">
              {footerLinks.layanan.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-navy-200 font-body text-sm hover:text-gold transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Perusahaan */}
          <div>
            <h4 className="font-display font-bold text-white text-lg mb-6">
              Perusahaan
            </h4>
            <ul className="space-y-3">
              {footerLinks.perusahaan.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-navy-200 font-body text-sm hover:text-gold transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h4 className="font-display font-bold text-white text-lg mb-6">
              Kontak
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-gold mt-0.5 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-navy-200 font-body text-sm">
                  Jl. Contoh Alamat No. 123
                  <br />
                  Kota, Indonesia
                </span>
              </div>
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-gold shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-navy-200 font-body text-sm">
                  info@prabaswarav2.com
                </span>
              </div>
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-gold shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="text-navy-200 font-body text-sm">
                  +62 812 3456 7890
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-navy-300 font-body text-sm">
              &copy; {new Date().getFullYear()} CV. Prabaswara Gandar Prima. Hak
              Cipta Dilindungi.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="#"
                className="text-navy-300 font-body text-sm hover:text-gold transition-colors"
              >
                Kebijakan Privasi
              </Link>
              <Link
                href="#"
                className="text-navy-300 font-body text-sm hover:text-gold transition-colors"
              >
                Syarat & Ketentuan
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
