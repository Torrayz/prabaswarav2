-- ============================================
-- Migration: Create tables for CV. Prabaswara Gandar Prima
-- ============================================

-- 1. Tabel contact_submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nama TEXT NOT NULL,
  email TEXT NOT NULL,
  perusahaan TEXT,
  pesan TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS untuk contact_submissions
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Anon bisa insert (submit form)
CREATE POLICY "anon_insert_contact"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Authenticated bisa select (admin view)
CREATE POLICY "auth_select_contact"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- 2. Tabel services
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nama TEXT NOT NULL,
  deskripsi TEXT NOT NULL,
  icon_url TEXT,
  urutan INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true
);

-- RLS untuk services
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Anon bisa read services yang aktif
CREATE POLICY "public_read_active_services"
  ON services
  FOR SELECT
  TO anon
  USING (is_active = true);

-- Authenticated bisa manage semua services
CREATE POLICY "auth_manage_services"
  ON services
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 3. Seed data services
INSERT INTO services (nama, deskripsi, icon_url, urutan, is_active) VALUES
  ('Konsultasi Bisnis', 'Layanan konsultasi strategis untuk membantu perusahaan Anda merencanakan dan mengoptimalkan operasi bisnis secara menyeluruh.', '📋', 1, true),
  ('Manajemen Proyek', 'Pengelolaan proyek profesional dari perencanaan hingga penyelesaian dengan standar kualitas tinggi dan tepat waktu.', '🏗️', 2, true),
  ('Analisis & Pelaporan', 'Layanan analisis data dan pelaporan komprehensif untuk mendukung pengambilan keputusan bisnis yang tepat.', '📊', 3, true),
  ('Pengadaan & Logistik', 'Solusi pengadaan barang dan jasa serta manajemen logistik yang efisien untuk kebutuhan operasional perusahaan.', '🔧', 4, true),
  ('Perencanaan & Desain', 'Layanan perencanaan dan desain yang kreatif serta fungsional sesuai dengan kebutuhan spesifik klien.', '📐', 5, true),
  ('Kemitraan Strategis', 'Fasilitasi kemitraan strategis dan pengembangan jaringan bisnis untuk pertumbuhan jangka panjang.', '🤝', 6, true);
