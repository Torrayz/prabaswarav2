export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-hero">
      {/* Hero Placeholder */}
      <section className="min-h-screen flex items-center justify-center section-padding">
        <div className="section-container text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6">
            CV. Prabaswara
            <span className="block text-gradient-gold">Gandar Prima</span>
          </h1>
          <p className="text-xl text-navy-200 font-body max-w-2xl mx-auto mb-10">
            Solusi Terpercaya untuk Bisnis Anda
          </p>
          <div className="accent-line-center mb-10" />
          <a
            href="#contact"
            className="btn-primary text-lg"
            id="hero-cta"
          >
            Hubungi Kami
          </a>
        </div>
      </section>
    </main>
  );
}
