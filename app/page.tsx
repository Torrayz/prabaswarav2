import Navbar from "@/components/features/Navbar";
import Hero from "@/components/features/Hero";
import About from "@/components/features/About";
import ServicesGrid from "@/components/features/ServicesGrid";
import Portfolio from "@/components/features/Portfolio";
import Testimonial from "@/components/features/Testimonial";
import ContactForm from "@/components/features/ContactForm";
import WhatsAppButton from "@/components/features/WhatsAppButton";
import Footer from "@/components/features/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <ServicesGrid />
        <Portfolio />
        <Testimonial />
        <ContactForm />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
