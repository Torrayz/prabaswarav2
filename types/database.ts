export interface ContactSubmission {
  id: string;
  nama: string;
  email: string;
  perusahaan: string | null;
  pesan: string;
  created_at: string;
}

export interface Service {
  id: string;
  nama: string;
  deskripsi: string;
  icon_url: string | null;
  urutan: number;
  is_active: boolean;
}

export interface Database {
  public: {
    Tables: {
      contact_submissions: {
        Row: ContactSubmission;
        Insert: Omit<ContactSubmission, "id" | "created_at">;
        Update: Partial<Omit<ContactSubmission, "id">>;
      };
      services: {
        Row: Service;
        Insert: Omit<Service, "id">;
        Update: Partial<Omit<Service, "id">>;
      };
    };
  };
}
