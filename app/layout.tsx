import type { Metadata, Viewport } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { COMPANY_INFO } from "@/lib/constants";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: "#1B2A4A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://prabaswarav2.com"),
  title: {
    default: "CV. Prabaswara Gandar Prima — Solusi Terpercaya untuk Bisnis Anda",
    template: "%s | CV. Prabaswara Gandar Prima",
  },
  description:
    "CV. Prabaswara Gandar Prima adalah mitra terpercaya untuk layanan konsultasi bisnis, manajemen proyek, pengadaan & logistik, serta perencanaan strategis. Berpengalaman lebih dari 10 tahun.",
  keywords: [
    "CV Prabaswara Gandar Prima",
    "jasa profesional",
    "solusi bisnis",
    "company profile",
    "konsultasi bisnis",
    "manajemen proyek",
    "pengadaan logistik",
    "perencanaan strategis",
    "jasa konstruksi",
    "mitra bisnis terpercaya",
  ],
  authors: [{ name: COMPANY_INFO.name }],
  creator: COMPANY_INFO.name,
  publisher: COMPANY_INFO.name,
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://prabaswarav2.com",
    siteName: "CV. Prabaswara Gandar Prima",
    title: "CV. Prabaswara Gandar Prima — Solusi Terpercaya untuk Bisnis Anda",
    description:
      "Mitra terpercaya untuk layanan konsultasi bisnis, manajemen proyek, pengadaan & logistik, serta perencanaan strategis.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CV. Prabaswara Gandar Prima",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CV. Prabaswara Gandar Prima — Solusi Terpercaya untuk Bisnis Anda",
    description:
      "Mitra terpercaya untuk layanan konsultasi bisnis, manajemen proyek, dan perencanaan strategis.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://prabaswarav2.com",
  },
  category: "business",
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: COMPANY_INFO.name,
  url: COMPANY_INFO.baseUrl,
  logo: `${COMPANY_INFO.baseUrl}/logo.png`,
  description:
    "Mitra terpercaya untuk layanan konsultasi bisnis, manajemen proyek, pengadaan & logistik, serta perencanaan strategis.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kota",
    addressCountry: "ID",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: COMPANY_INFO.phone,
    contactType: "customer service",
    availableLanguage: "Indonesian",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${playfair.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body antialiased" suppressHydrationWarning>
        {/* Accessibility: skip to main content */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-4 focus:left-4
                     focus:px-4 focus:py-2 focus:bg-gold focus:text-navy-dark focus:rounded-lg
                     focus:font-body focus:font-semibold"
        >
          Langsung ke konten utama
        </a>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#1B2A4A",
              color: "#FAF8F5",
              fontFamily: "var(--font-dm-sans)",
              borderRadius: "12px",
              border: "1px solid rgba(201, 168, 76, 0.3)",
            },
            success: {
              iconTheme: {
                primary: "#C9A84C",
                secondary: "#1B2A4A",
              },
            },
            error: {
              iconTheme: {
                primary: "#EF4444",
                secondary: "#1B2A4A",
              },
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
