-- ============================================
-- ClinicHub Database Schema
-- Mini Clinic Information System
-- ============================================

DROP DATABASE IF EXISTS clinic_hub;
CREATE DATABASE clinic_hub;
USE clinic_hub;

-- ============================================
-- TABLE: users (authentication)
-- ============================================
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'dokter', 'petugas_pendaftaran') NOT NULL DEFAULT 'petugas_pendaftaran',
    full_name VARCHAR(100) NOT NULL,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- TABLE: polyclinics (referensi poli)
-- ============================================
CREATE TABLE polyclinics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- TABLE: doctors (referensi dokter)
-- ============================================
CREATE TABLE doctors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    polyclinic_id INT NOT NULL,
    license_number VARCHAR(50),
    phone VARCHAR(20),
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (polyclinic_id) REFERENCES polyclinics(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- TABLE: patients (master data pasien)
-- ============================================
CREATE TABLE patients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    medical_record_number VARCHAR(20) NOT NULL UNIQUE,
    nik VARCHAR(16) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    gender ENUM('L', 'P') NOT NULL,
    date_of_birth DATE NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- TABLE: registrations (pendaftaran pasien)
-- ============================================
CREATE TABLE registrations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    doctor_id INT NOT NULL,
    polyclinic_id INT NOT NULL,
    visit_date DATE NOT NULL,
    payment_type ENUM('bpjs', 'umum', 'vip') NOT NULL DEFAULT 'umum',
    initial_complaint TEXT,
    status ENUM('menunggu', 'check_in', 'pemeriksaan', 'selesai') NOT NULL DEFAULT 'menunggu',
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE,
    FOREIGN KEY (polyclinic_id) REFERENCES polyclinics(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- TABLE: queues (antrean pasien)
-- ============================================
CREATE TABLE queues (
    id INT AUTO_INCREMENT PRIMARY KEY,
    queue_number VARCHAR(10) NOT NULL UNIQUE,
    registration_id INT NOT NULL,
    patient_id INT NOT NULL,
    doctor_id INT NOT NULL,
    called_at TIMESTAMP NULL DEFAULT NULL,
    status ENUM('menunggu', 'check_in', 'pemeriksaan', 'selesai') NOT NULL DEFAULT 'menunggu',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (registration_id) REFERENCES registrations(id) ON DELETE CASCADE,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- TABLE: medical_records (pemeriksaan dokter - SOAP)
-- ============================================
CREATE TABLE medical_records (
    id INT AUTO_INCREMENT PRIMARY KEY,
    registration_id INT NOT NULL,
    patient_id INT NOT NULL,
    doctor_id INT NOT NULL,
    -- Subjective
    complaint TEXT,
    -- Objective
    blood_pressure VARCHAR(20),
    temperature DECIMAL(4,1),
    weight DECIMAL(5,2),
    height DECIMAL(5,2),
    -- Assessment
    diagnosis TEXT,
    -- Plan
    therapy_plan TEXT,
    examination_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (registration_id) REFERENCES registrations(id) ON DELETE CASCADE,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- TABLE: prescriptions (resep obat)
-- ============================================
CREATE TABLE prescriptions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    medical_record_id INT NOT NULL,
    medication_name VARCHAR(200) NOT NULL,
    dosage VARCHAR(100),
    frequency VARCHAR(100),
    duration VARCHAR(100),
    instructions TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (medical_record_id) REFERENCES medical_records(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- TABLE: medical_procedures (tindakan medis)
-- ============================================
CREATE TABLE medical_procedures (
    id INT AUTO_INCREMENT PRIMARY KEY,
    medical_record_id INT NOT NULL,
    procedure_name VARCHAR(200) NOT NULL,
    procedure_notes TEXT,
    cost DECIMAL(12,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (medical_record_id) REFERENCES medical_records(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- DEFAULT DATA (untuk testing)
-- ============================================

-- Admin user (password: admin123)
INSERT INTO users (username, email, password, role, full_name) VALUES
('admin', 'admin@clinichub.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'admin', 'Administrator'),
('dr_budi', 'budi@clinichub.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'dokter', 'Dr. Budi Santoso'),
('petugas_ana', 'ana@clinichub.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'petugas_pendaftaran', 'Petugas Ana Rahayu');

-- Poliklinik
INSERT INTO polyclinics (name, description) VALUES
('Poli Umum', 'Pelayanan kesehatan umum'),
('Poli Spesialis Anak', 'Pelayanan kesehatan anak'),
('Poli Spesialis Bedah', 'Pelayanan kesehatan bedah');

-- Doctors
INSERT INTO doctors (user_id, polyclinic_id, license_number, phone) VALUES
(2, 1, 'DOK-001', '08123456789'),
(2, 2, 'DOK-002', '08123456790');

-- Sample Patient (NIK: 3201011234567890, No RM: RM001)
INSERT INTO patients (medical_record_number, nik, name, gender, date_of_birth, phone, address) VALUES
('RM001', '3201011234567890', 'Ahmad Fauzi', 'L', '1990-05-15', '08111111111', 'Jl. Contoh No. 1, Bandung'),
('RM002', '3201019876543210', 'Siti Rahayu', 'P', '1985-08-22', '08111111112', 'Jl. Contoh No. 2, Bandung');

-- Sample Registration
INSERT INTO registrations (patient_id, doctor_id, polyclinic_id, visit_date, payment_type, initial_complaint, status) VALUES
(1, 1, 1, CURDATE(), 'umum', 'Demam dan batuk', 'menunggu'),
(2, 2, 2, CURDATE(), 'bpjs', 'Sakit kepala', 'menunggu');

-- Sample Queue
INSERT INTO queues (queue_number, registration_id, patient_id, doctor_id) VALUES
('A001', 1, 1, 1),
('A002', 2, 2, 2);
