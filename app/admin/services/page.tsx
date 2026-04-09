import { createClient } from "@/lib/supabase/server";
import ServicesManager from "./ServicesManager";
import { type Service } from "@/types/database";

export default async function ServicesPageAdmin() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("urutan", { ascending: true });

  if (error) {
    return (
      <div className="bg-red-50 text-red-500 p-4 rounded-lg">
        Gagal memuat layanan: {error.message}
      </div>
    );
  }

  return <ServicesManager initialServices={(data as unknown as Service[]) || []} />;
}
