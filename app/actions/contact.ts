"use server";

import { headers } from "next/headers";
import { supabase } from "@/lib/supabase";
import { rateLimiter } from "@/lib/rate-limit";
import { contactFormSchema } from "@/validations/contact";

export interface ContactActionResult {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
}

export async function submitContactForm(
  formData: FormData
): Promise<ContactActionResult> {
  // 1. Rate limiting berdasarkan IP
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headersList.get("x-real-ip") ??
    "anonymous";

  try {
    const { success: allowed } = await rateLimiter.limit(ip);

    if (!allowed) {
      return {
        success: false,
        message:
          "Terlalu banyak permintaan. Silakan coba lagi dalam beberapa menit.",
      };
    }
  } catch (error) {
    // Jika rate limiter gagal (Upstash down), tetap lanjutkan
    console.error("Rate limiter error:", error);
  }

  // 2. Parse dan validasi input dengan Zod
  const rawData = {
    nama: formData.get("nama"),
    email: formData.get("email"),
    perusahaan: formData.get("perusahaan"),
    pesan: formData.get("pesan"),
  };

  const result = contactFormSchema.safeParse(rawData);

  if (!result.success) {
    const fieldErrors: Record<string, string> = {};
    result.error.issues.forEach((issue) => {
      const field = issue.path[0] as string;
      if (!fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    });

    return {
      success: false,
      message: "Validasi gagal. Mohon periksa kembali form Anda.",
      errors: fieldErrors,
    };
  }

  // 3. Insert ke Supabase
  const { error } = await supabase.from("contact_submissions").insert({
    nama: result.data.nama,
    email: result.data.email,
    perusahaan: result.data.perusahaan || null,
    pesan: result.data.pesan,
  });

  if (error) {
    console.error("Supabase insert error:", error);
    return {
      success: false,
      message: "Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.",
    };
  }

  return {
    success: true,
    message:
      "Pesan Anda berhasil dikirim! Kami akan segera menghubungi Anda.",
  };
}
