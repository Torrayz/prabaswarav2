export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      contact_submissions: {
        Row: {
          id: string
          nama: string
          email: string
          perusahaan: string | null
          pesan: string
          created_at: string
        }
        Insert: {
          id?: string
          nama: string
          email: string
          perusahaan?: string | null
          pesan: string
          created_at?: string
        }
        Update: {
          id?: string
          nama?: string
          email?: string
          perusahaan?: string | null
          pesan?: string
          created_at?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          id: string
          nama: string
          deskripsi: string
          icon_url: string | null
          urutan: number | null
          is_active: boolean | null
        }
        Insert: {
          id?: string
          nama: string
          deskripsi: string
          icon_url?: string | null
          urutan?: number | null
          is_active?: boolean | null
        }
        Update: {
          id?: string
          nama?: string
          deskripsi?: string
          icon_url?: string | null
          urutan?: number | null
          is_active?: boolean | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
        Database["public"]["Views"])
    ? (Database["public"]["Tables"] &
        Database["public"]["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type Service = Tables<"services">;
export type ContactSubmission = Tables<"contact_submissions">;
