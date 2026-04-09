"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function addService(formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase.from("services").insert({
    nama: formData.get("nama") as string,
    deskripsi: formData.get("deskripsi") as string,
    icon_url: formData.get("icon_url") as string,
    urutan: parseInt((formData.get("urutan") as string) || "0"),
    is_active: formData.get("is_active") === "true",
  });

  if (error) {
    return { success: false, message: error.message };
  }

  revalidatePath("/services");
  return { success: true };
}

export async function updateService(id: string, formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("services")
    .update({
      nama: formData.get("nama") as string,
      deskripsi: formData.get("deskripsi") as string,
      icon_url: formData.get("icon_url") as string,
      urutan: parseInt((formData.get("urutan") as string) || "0"),
      is_active: formData.get("is_active") === "true",
    })
    .eq("id", id);

  if (error) {
    return { success: false, message: error.message };
  }

  revalidatePath("/services");
  return { success: true };
}

export async function deleteService(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("services").delete().eq("id", id);

  if (error) {
    return { success: false, message: error.message };
  }

  revalidatePath("/services");
  return { success: true };
}
