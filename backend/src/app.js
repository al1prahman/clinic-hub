const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');

// Import routes
const authRoutes = require('./routes/auth.routes');
const patientRoutes = require('./routes/patient.routes');
const registrationRoutes = require('./routes/registration.routes');
const queueRoutes = require('./routes/queue.routes');
const medicalRecordRoutes = require('./routes/medicalRecord.routes');
const prescriptionRoutes = require('./routes/prescription.routes');
const dashboardRoutes = require('./routes/dashboard.routes');

const app = express();

// ===== Middleware =====
app.use(cors({
  origin: process.env.VITE_API_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== Routes =====
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/registrations', registrationRoutes);
app.use('/api/queues', queueRoutes);
app.use('/api/medical-records', medicalRecordRoutes);
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'ClinicHub API is running', data: null });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
    errors: null,
  });
});

// Error handler (must be last)
app.use(errorHandler);

module.exports = app;
