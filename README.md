# ClinicHub

Mini Clinic Information System - A web application for managing clinic operations including patient registration, queue management, medical records, and prescriptions.

## Tech Stack

- **Frontend:** React.js + Vite + Tailwind CSS + React Router + Axios
- **Backend:** Node.js + Express.js + Sequelize ORM
- **Database:** MySQL
- **Authentication:** JWT (JSON Web Token)
- **API Documentation:** Postman Collection included

## Quick Start

### Prerequisites

- Node.js (v16+)
- MySQL (via XAMPP or Docker)

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials
npm start
```

Server runs on `http://localhost:5000`

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
# Edit VITE_API_URL if needed
npm run dev
```

Frontend runs on `http://localhost:5173`

### Database Setup

1. Start MySQL (XAMPP or Docker)
2. Create database: `CREATE DATABASE clinic_hub;`
3. Import schema: `mysql -u root -p clinic_hub < backend/database.sql`
4. Default admin credentials:
   - Username: `admin`
   - Password: `admin123`

## Project Structure

```
clinic-go/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── middleware/      # Auth, validation, error handling
│   │   ├── models/          # Sequelize models
│   │   ├── routes/          # API routes
│   │   ├── config/          # Database & env config
│   │   └── utils/           # Response helpers
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/      # Layout, shared components
│   │   ├── pages/           # Page components
│   │   ├── context/         # Auth context
│   │   ├── services/        # API client
│   │   └── App.jsx
│   ├── package.json
│   └── .env.example
└── database.sql
```

## API Endpoints

| Module | Endpoint | Method | Description |
|--------|----------|--------|-------------|
| Auth | `/api/auth/login` | POST | Login with username/password |
| Auth | `/api/auth/logout` | POST | Logout (JWT) |
| Patients | `/api/patients` | GET | List patients (search, pagination) |
| Patients | `/api/patients/:id` | GET | Get patient detail |
| Patients | `/api/patients` | POST | Create patient |
| Patients | `/api/patients/:id` | PUT | Update patient |
| Patients | `/api/patients/:id` | DELETE | Delete patient |
| Registration | `/api/registrations` | GET | List registrations |
| Registration | `/api/registrations` | POST | Create registration |
| Queue | `/api/queues` | GET | List queues |
| Queue | `/api/queues` | POST | Create queue (auto-generate number) |
| Queue | `/api/queues/:id/call` | PUT | Call next queue |
| Queue | `/api/queues/:id/status` | PUT | Update queue status |
| Medical Records | `/api/medical-records` | POST | Create SOAP record |
| Medical Records | `/api/medical-records/:patientId` | GET | Get patient history |
| Prescriptions | `/api/prescriptions` | POST | Create prescription |
| Prescriptions | `/api/prescriptions/:id` | GET | Get prescription |
| Dashboard | `/api/dashboard/stats` | GET | Dashboard statistics |

## Default Accounts

| Username | Password | Role |
|----------|----------|------|
| admin | admin123 | Administrator |
| dr_budi | admin123 | Dokter |
| petugas_ana | admin123 | Petugas Pendaftaran |

## License

MIT
