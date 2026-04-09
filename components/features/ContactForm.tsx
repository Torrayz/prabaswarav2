"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { contactFormSchema, type ContactFormData } from "@/validations/contact";
import { submitContactForm } from "@/app/actions/contact";

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    nama: "",
    email: "",
    perusahaan: "",
    pesan: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validasi client-side dengan Zod
    const validationResult = contactFormSchema.safeParse(formData);
    if (!validationResult.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      validationResult.error.issues.forEach((err) => {
        const field = err.path[0] as keyof ContactFormData;
        if (!fieldErrors[field]) {
          fieldErrors[field] = err.message;
        }
      });
      setErrors(fieldErrors);
      toast.error("Mohon periksa kembali form Anda");
      return;
    }

    setIsLoading(true);

    try {
      // Submit via Server Action
      const fd = new FormData();
      fd.append("nama", formData.nama);
      fd.append("email", formData.email);
      fd.append("perusahaan", formData.perusahaan || "");
      fd.append("pesan", formData.pesan);

      const result = await submitContactForm(fd);

      if (result.success) {
        toast.success(result.message);
        setFormData({ nama: "", email: "", perusahaan: "", pesan: "" });
      } else {
        toast.error(result.message);
        if (result.errors) {
          setErrors(result.errors as Partial<Record<keyof ContactFormData, string>>);
        }
      }
    } catch {
      toast.error("Terjadi kesalahan jaringan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="kontak" className="section-padding bg-white relative">
      {/* Decorative */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -mr-48 -mb-48" />

      <div className="section-container relative">
        <SectionHeading
          title="Hubungi Kami"
          subtitle="Siap membantu mewujudkan solusi terbaik untuk bisnis Anda"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-display font-bold text-navy mb-6">
              Mari Berdiskusi
            </h3>
            <p className="text-navy-400 font-body leading-relaxed mb-8">
              Kami siap mendengarkan kebutuhan Anda. Hubungi kami melalui form
              berikut atau melalui kontak di bawah ini.
            </p>

            <div className="space-y-6">
              {[
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                  label: "Alamat",
                  value: "Jl. Contoh Alamat No. 123, Kota, Indonesia",
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                  label: "Email",
                  value: "info@prabaswarav2.com",
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  ),
                  label: "Telepon",
                  value: "+62 812 3456 7890",
                },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-navy/5 flex items-center justify-center text-gold shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-sm text-navy-300 font-body mb-1">
                      {item.label}
                    </div>
                    <div className="text-navy font-body font-medium">
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-cream rounded-2xl p-8 border border-navy-50"
              id="contact-form"
            >
              {/* Nama */}
              <div className="mb-5">
                <label
                  htmlFor="nama"
                  className="block text-sm font-body font-medium text-navy mb-2"
                >
                  Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="nama"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  className={`input-field ${errors.nama ? "border-red-400 focus:ring-red-400/50" : ""}`}
                  placeholder="Masukkan nama lengkap"
                />
                {errors.nama && (
                  <p className="mt-1 text-xs text-red-500 font-body">{errors.nama}</p>
                )}
              </div>

              {/* Email */}
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block text-sm font-body font-medium text-navy mb-2"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`input-field ${errors.email ? "border-red-400 focus:ring-red-400/50" : ""}`}
                  placeholder="nama@email.com"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500 font-body">{errors.email}</p>
                )}
              </div>

              {/* Perusahaan */}
              <div className="mb-5">
                <label
                  htmlFor="perusahaan"
                  className="block text-sm font-body font-medium text-navy mb-2"
                >
                  Nama Perusahaan{" "}
                  <span className="text-navy-300 font-normal">(opsional)</span>
                </label>
                <input
                  type="text"
                  id="perusahaan"
                  name="perusahaan"
                  value={formData.perusahaan}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Nama perusahaan Anda"
                />
              </div>

              {/* Pesan */}
              <div className="mb-8">
                <label
                  htmlFor="pesan"
                  className="block text-sm font-body font-medium text-navy mb-2"
                >
                  Pesan <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="pesan"
                  name="pesan"
                  value={formData.pesan}
                  onChange={handleChange}
                  rows={5}
                  className={`textarea-field ${errors.pesan ? "border-red-400 focus:ring-red-400/50" : ""}`}
                  placeholder="Ceritakan kebutuhan Anda..."
                />
                {errors.pesan && (
                  <p className="mt-1 text-xs text-red-500 font-body">{errors.pesan}</p>
                )}
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isLoading}
                className="w-full"
              >
                {isLoading ? "Mengirim..." : "Kirim Pesan"}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
