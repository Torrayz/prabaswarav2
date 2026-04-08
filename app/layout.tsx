import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
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

export const metadata: Metadata = {
  title: {
    default: "CV. Prabaswara Gandar Prima — Solusi Terpercaya untuk Bisnis Anda",
    template: "%s | CV. Prabaswara Gandar Prima",
  },
  description:
    "CV. Prabaswara Gandar Prima adalah perusahaan yang menyediakan layanan profesional dan terpercaya. Hubungi kami untuk solusi bisnis terbaik.",
  keywords: [
    "CV Prabaswara Gandar Prima",
    "jasa profesional",
    "solusi bisnis",
    "company profile",
  ],
  authors: [{ name: "CV. Prabaswara Gandar Prima" }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "CV. Prabaswara Gandar Prima",
    title: "CV. Prabaswara Gandar Prima — Solusi Terpercaya untuk Bisnis Anda",
    description:
      "CV. Prabaswara Gandar Prima adalah perusahaan yang menyediakan layanan profesional dan terpercaya.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="font-body antialiased">
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
