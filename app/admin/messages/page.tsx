import { createClient } from "@/lib/supabase/server";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export default async function MessagesPage() {
  const supabase = await createClient();

  const { data: messages, error } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="bg-red-50 text-red-500 p-4 rounded-lg">
        Gagal memuat pesan: {error.message}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-navy">
          Pesan Kontak Masuk
        </h1>
        <p className="text-navy-400 mt-2">
          Daftar pesan yang dikirim oleh pengunjung melalui form kontak.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-navy-50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-navy-400">
            <thead className="bg-navy-50/50 text-navy font-semibold">
              <tr>
                <th className="px-6 py-4">Tanggal</th>
                <th className="px-6 py-4">Pengirim</th>
                <th className="px-6 py-4">Perusahaan</th>
                <th className="px-6 py-4">Pesan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-50">
              {messages?.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center">
                    Belum ada pesan masuk.
                  </td>
                </tr>
              ) : (
                messages?.map((msg) => (
                  <tr key={msg.id} className="hover:bg-navy-50/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {format(new Date(msg.created_at), "dd MMM yyyy, HH:mm", {
                        locale: id,
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-navy">{msg.nama}</div>
                      <div className="text-xs mt-1">
                        <a
                          href={`mailto:${msg.email}`}
                          className="text-gold hover:underline"
                        >
                          {msg.email}
                        </a>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {msg.perusahaan ? (
                        <span className="px-2.5 py-1 bg-navy-50 text-navy rounded-md text-xs">
                          {msg.perusahaan}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 max-w-md">
                      <p className="truncate hover:text-wrap hover:line-clamp-none line-clamp-2">
                        {msg.pesan}
                      </p>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
