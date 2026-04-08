import { z } from "zod";

export const contactFormSchema = z.object({
  nama: z
    .string()
    .min(2, "Nama harus minimal 2 karakter")
    .max(100, "Nama maksimal 100 karakter")
    .trim(),
  email: z
    .string()
    .email("Format email tidak valid")
    .max(255, "Email maksimal 255 karakter")
    .trim()
    .toLowerCase(),
  perusahaan: z
    .string()
    .max(200, "Nama perusahaan maksimal 200 karakter")
    .trim()
    .optional()
    .or(z.literal("")),
  pesan: z
    .string()
    .min(10, "Pesan harus minimal 10 karakter")
    .max(2000, "Pesan maksimal 2000 karakter")
    .trim(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
