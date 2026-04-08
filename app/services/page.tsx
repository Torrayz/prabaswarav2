import SectionHeading from "@/components/ui/SectionHeading";

// ISR: revalidate setiap 1 jam (3600 detik)
export const revalidate = 3600;

export const metadata = {
  title: "Layanan Kami",
  description:
    "Jelajahi berbagai layanan profesional yang ditawarkan oleh CV. Prabaswara Gandar Prima.",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-cream">
      {/* Header */}
      <section className="bg-gradient-navy py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title="Layanan Kami"
            subtitle="Kami menyediakan berbagai layanan profesional untuk memenuhi kebutuhan bisnis Anda."
            light
          />
        </div>
      </section>

      {/* Services Grid Placeholder */}
      <section className="section-padding">
        <div className="section-container">
          <p className="text-center text-navy-400 font-body">
            Data layanan akan dimuat dari Supabase.
          </p>
        </div>
      </section>
    </main>
  );
}
