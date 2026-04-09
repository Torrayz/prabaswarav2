"use client";

import { useState } from "react";
import { type Service } from "@/types/database";
import { addService, updateService, deleteService } from "@/app/actions/services";
import toast from "react-hot-toast";

export default function ServicesManager({
  initialServices,
}: {
  initialServices: Service[];
}) {
  const [isEditing, setIsEditing] = useState<Service | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const action = isEditing ? () => updateService(isEditing.id, formData) : () => addService(formData);

    try {
      const res = await action();
      if (res.success) {
        toast.success(isEditing ? "Layanan berhasil diupdate!" : "Layanan berhasil ditambahkan!");
        setIsAdding(false);
        setIsEditing(null);
        // Page reloads implicitly based on how standard router works with mutations and revalidatePath,
        // but since we are a Client Component, we might need router.refresh() if it doesn't auto-refresh.
        // revalidatePath in Server Action usually triggers NextJs to push new data to client.
      } else {
        toast.error("Gagal: " + res.message);
      }
    } catch {
      toast.error("Terjadi kesalahan sistem.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Yakin ingin menghapus layanan ini?")) return;
    try {
      const res = await deleteService(id);
      if (res.success) {
        toast.success("Layanan berhasil dihapus!");
      } else {
        toast.error("Gagal menghapus: " + res.message);
      }
    } catch {
      toast.error("Terjadi kesalahan sistem.");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-navy">
            Manajemen Layanan
          </h1>
          <p className="text-navy-400 mt-2">
            Kelola data layanan yang tampil di halaman depan.
          </p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-gold text-navy-dark px-4 py-2 font-medium rounded-lg hover:bg-gold-light transition"
        >
          + Tambah Layanan
        </button>
      </div>

      {/* Form Modal */}
      {(isAdding || isEditing) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6">
            <h2 className="text-xl font-bold text-navy mb-4">
              {isEditing ? "Edit Layanan" : "Tambah Layanan Baru"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-navy">Nama Layanan</label>
                <input
                  name="nama"
                  defaultValue={isEditing?.nama || ""}
                  required
                  className="w-full mt-1 px-4 py-2 border border-navy-100 rounded-lg focus:outline-gold"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy">Deskripsi</label>
                <textarea
                  name="deskripsi"
                  defaultValue={isEditing?.deskripsi || ""}
                  required
                  rows={3}
                  className="w-full mt-1 px-4 py-2 border border-navy-100 rounded-lg focus:outline-gold"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-navy">Icon (Emoji/URL)</label>
                  <input
                    name="icon_url"
                    defaultValue={isEditing?.icon_url || "📋"}
                    className="w-full mt-1 px-4 py-2 border border-navy-100 rounded-lg focus:outline-gold"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy">Urutan (Angka)</label>
                  <input
                    type="number"
                    name="urutan"
                    defaultValue={isEditing?.urutan || 0}
                    className="w-full mt-1 px-4 py-2 border border-navy-100 rounded-lg focus:outline-gold"
                  />
                </div>
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-navy">
                  <input
                    type="radio"
                    name="is_active"
                    value="true"
                    defaultChecked={isEditing ? isEditing.is_active === true : true}
                  />
                  Aktif (Ditampilkan)
                </label>
                <label className="flex items-center gap-2 text-sm font-medium text-navy mt-1">
                  <input
                    type="radio"
                    name="is_active"
                    value="false"
                    defaultChecked={isEditing ? isEditing.is_active === false : false}
                  />
                  Sembunyikan (Draft)
                </label>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsAdding(false);
                    setIsEditing(null);
                  }}
                  className="px-4 py-2 text-navy-400 hover:text-navy"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-2 bg-navy text-white rounded-lg hover:bg-navy-light disabled:opacity-50"
                >
                  {isLoading ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Data Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-navy-50 overflow-hidden">
        <table className="w-full text-left text-sm text-navy-400">
          <thead className="bg-navy-50/50 text-navy font-semibold">
            <tr>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Layanan</th>
              <th className="px-6 py-4">Urutan</th>
              <th className="px-6 py-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-50">
            {initialServices.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center">
                  Belum ada data layanan.
                </td>
              </tr>
            ) : (
              initialServices.map((service) => (
                <tr key={service.id} className="hover:bg-navy-50/30 transition-colors">
                  <td className="px-6 py-4">
                    {service.is_active ? (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">Aktif</span>
                    ) : (
                      <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-full font-medium">Draft</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-navy/5 flex items-center justify-center text-xl">
                        {service.icon_url}
                      </div>
                      <div>
                        <div className="font-medium text-navy">{service.nama}</div>
                        <div className="text-xs truncate max-w-[200px] mt-0.5" title={service.deskripsi}>
                          {service.deskripsi}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{service.urutan}</td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button
                      onClick={() => setIsEditing(service)}
                      className="text-gold hover:underline font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="text-red-500 hover:underline font-medium"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
