"use client";

import { usePathname } from "next/navigation";
import { logout } from "@/app/actions/auth";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Jangan tampilkan sidebar di halaman login
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-navy-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-navy text-white flex flex-col fixed inset-y-0 left-0">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-display font-bold text-gold">
            Prabaswara Admin
          </h2>
        </div>
        <nav className="flex-1 py-6 px-4 space-y-2">
          <a
            href="/admin/messages"
            className={`block px-4 py-3 rounded-lg transition-colors text-sm font-medium ${
              pathname.includes("/admin/messages")
                ? "bg-gold text-navy-dark"
                : "text-navy-100 hover:bg-white/5"
            }`}
          >
            Pesan Kontak
          </a>
          <a
            href="/admin/services"
            className={`block px-4 py-3 rounded-lg transition-colors text-sm font-medium ${
              pathname.includes("/admin/services")
                ? "bg-gold text-navy-dark"
                : "text-navy-100 hover:bg-white/5"
            }`}
          >
            Layanan (Services)
          </a>
        </nav>
        <div className="p-4 border-t border-white/10">
          <form action={logout}>
            <button
              type="submit"
              className="w-full px-4 py-3 text-sm font-medium text-red-400 hover:bg-red-400/10 rounded-lg transition-colors text-left flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-6xl mx-auto">
            {children}
        </div>
      </main>
    </div>
  );
}
