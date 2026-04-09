import { supabase } from "@/lib/supabase";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Service } from "@/types/database";

// ISR: revalidate setiap 1 jam (3600 detik)
export const revalidate = 3600;

export const metadata = {
  title: "Layanan Kami",
  description:
    "Jelajahi berbagai layanan profesional yang ditawarkan oleh CV. Prabaswara Gandar Prima.",
};

async function getServices(): Promise<Service[]> {
  const { data, error } = await supabase
    .from("services")
    .select("id, nama, deskripsi, icon_url, urutan")
    .eq("is_active", true)
    .order("urutan", { ascending: true });

  if (error) {
    console.error("Error fetching services:", error);
    return [];
  }

  return (data as unknown as Service[]) ?? [];
}

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <main className="min-h-screen bg-cream">
      {/* Header */}
      <section className="bg-gradient-navy py-24 px-4 relative overflow-hidden">
        {/* Decorative */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-navy-light/30 rounded-full blur-3xl -ml-32 -mb-32" />

        <div className="max-w-7xl mx-auto relative">
          <SectionHeading
            title="Layanan Kami"
            subtitle="Kami menyediakan berbagai layanan profesional untuk memenuhi kebutuhan bisnis Anda."
            light
          />
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="section-container">
          {services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-2xl p-8 border border-navy-50 shadow-sm
                             hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div
                    className="w-14 h-14 rounded-xl bg-navy/5 flex items-center justify-center
                               text-2xl mb-6 group-hover:bg-gold/10 group-hover:scale-110
                               transition-all duration-300"
                  >
                    {service.icon_url || "📋"}
                  </div>
                  <h3 className="text-xl font-display font-bold text-navy mb-3">
                    {service.nama}
                  </h3>
                  <p className="text-navy-400 font-body leading-relaxed text-sm">
                    {service.deskripsi}
                  </p>
                  <div className="mt-6 pt-4 border-t border-navy-50">
                    <a
                      href="/#kontak"
                      className="text-gold font-body font-semibold text-sm
                                 inline-flex items-center gap-2 hover:gap-3 transition-all duration-300"
                    >
                      Konsultasi Sekarang
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
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-navy-400 font-body text-lg">
                Data layanan sedang dimuat...
              </p>
            </div>
          )}

          {/* Back to Home */}
          <div className="text-center mt-16">
            <a
              href="/"
              className="btn-outline inline-flex items-center gap-2"
            >
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
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
              Kembali ke Beranda
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
