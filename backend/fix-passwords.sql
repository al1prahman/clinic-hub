-- Default data with real bcrypt hashes for password "admin123"
INSERT INTO users (username, email, password, role, full_name) VALUES
('admin', 'admin@clinichub.com', '$2a$10$orFAq.fnGO7D42.Qju929eB.wXpgj.gB3X3Ag/BniRlEkPSx8b1YK', 'admin', 'Administrator'),
('dr_budi', 'budi@clinichub.com', '$2a$10$orFAq.fnGO7D42.Qju929eB.wXpgj.gB3X3Ag/BniRlEkPSx8b1YK', 'dokter', 'Dr. Budi Santoso'),
('petugas_ana', 'ana@clinichub.com', '$2a$10$orFAq.fnGO7D42.Qju929eB.wXpgj.gB3X3Ag/BniRlEkPSx8b1YK', 'petugas_pendaftaran', 'Petugas Ana Rahayu');
