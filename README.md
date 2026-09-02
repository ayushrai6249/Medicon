<h1 align="center">
  <img src="https://img.shields.io/badge/Medicon-Healthcare%20Platform-0ea5e9?style=for-the-badge&logo=data:image/svg+xml;base64,..." alt="Medicon" />
</h1>

<h3 align="center">🏥 A Full-Stack Doctor Appointment Booking Platform</h3>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat-square&logo=react" />
  <img src="https://img.shields.io/badge/Node.js-Express%205-339933?style=flat-square&logo=node.js" />
  <img src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=flat-square&logo=mongodb" />
  <img src="https://img.shields.io/badge/Vite-7.0-646CFF?style=flat-square&logo=vite" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?style=flat-square&logo=tailwindcss" />
  <img src="https://img.shields.io/badge/Deployed-Vercel-000000?style=flat-square&logo=vercel" />
  <img src="https://img.shields.io/badge/License-ISC-blue?style=flat-square" />
</p>

<p align="center">
  Medicon is a modern, full-stack healthcare appointment system that connects patients with doctors. It features a patient-facing frontend, a powerful admin panel, and a robust REST API backend — all in one monorepo.
</p>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Architecture](#-architecture)
- [API Reference](#-api-reference)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

Medicon is a **three-panel healthcare platform** built with the MERN stack:

| Panel | Description | Port |
|---|---|---|
| 🧑‍💻 **Frontend** | Patient-facing web app for browsing doctors and booking appointments | `5173` |
| 🛠️ **Admin Panel** | Dashboard for admins to manage doctors and appointments | `5174` |
| ⚙️ **Backend** | RESTful API server powering both panels | `3000` |

---

## ✨ Features

### 👤 Patient (Frontend)
- 🔐 **Authentication** — Register & log in with JWT-secured sessions
- 🩺 **Browse Doctors** — Filter doctors by speciality (General Physician, Gynecologist, Dermatologist, Pediatrician, Neurologist, Gastroenterologist)
- 📅 **Book Appointments** — Select available time slots on a doctor's calendar
- 💳 **Online Payments** — Pay appointment fees via **Razorpay** payment gateway
- 📋 **My Appointments** — View, track, and cancel upcoming appointments
- 👤 **Profile Management** — Update name, contact info, address, DOB, gender, and profile photo (uploaded to Cloudinary)
- 🔔 **Toast Notifications** — Real-time success/error feedback via react-toastify
- 📱 **Responsive Design** — Mobile-first layout using TailwindCSS

### 🛡️ Admin Panel
- 🔐 **Secure Admin Login** — Credential-based login with JWT
- ➕ **Add Doctors** — Register new doctors with profile image upload (Cloudinary)
- 📋 **All Doctors List** — View all registered doctors; toggle availability status
- 📅 **All Appointments** — View and cancel any appointment in the system
- 📊 **Dashboard** — Overview metrics: total doctors, patients, and appointments
- 👨‍⚕️ **Doctor View** — Doctors can log in to manage their own appointments, update their profile, and view their personal dashboard

### 🔧 Backend API
- ✅ **Health Check Endpoint** — `/health` for uptime monitoring
- 🔒 **JWT Middleware** — Role-based route protection (Admin, Doctor, User)
- 🖼️ **Image Uploads** — Multer + Cloudinary for multipart form data
- 💰 **Razorpay Integration** — Payment order creation and signature verification
- 🗄️ **MongoDB** — Persistent data storage with Mongoose ODM
- 🔑 **Bcrypt** — Password hashing for all user roles
- ✔️ **Validator** — Email and input validation

---

## 🛠️ Tech Stack

### Frontend & Admin (Client)
| Technology | Version | Purpose |
|---|---|---|
| [React](https://react.dev/) | 19.1.0 | UI component library |
| [React Router DOM](https://reactrouter.com/) | 7.6.3 | Client-side routing |
| [Vite](https://vitejs.dev/) | 7.0.0 | Build tool & dev server |
| [Tailwind CSS](https://tailwindcss.com/) | 3.4.1 | Utility-first CSS framework |
| [Axios](https://axios-http.com/) | 1.10.0 | HTTP client for API calls |
| [React Toastify](https://fkhadra.github.io/react-toastify/) | 11.0.5 | Toast notification system |
| PostCSS + Autoprefixer | latest | CSS processing |

### Backend (Server)
| Technology | Version | Purpose |
|---|---|---|
| [Node.js](https://nodejs.org/) | LTS | JavaScript runtime |
| [Express.js](https://expressjs.com/) | 5.1.0 | Web framework |
| [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/) | 8.16.1 | Database & ODM |
| [JSON Web Token](https://jwt.io/) | 9.0.2 | Authentication tokens |
| [Bcrypt](https://github.com/kelektiv/node.bcrypt.js) | 6.0.0 | Password hashing |
| [Cloudinary](https://cloudinary.com/) | 2.7.0 | Cloud image storage |
| [Multer](https://github.com/expressjs/multer) | 2.0.1 | Multipart file upload handling |
| [Razorpay](https://razorpay.com/) | 2.9.6 | Payment gateway |
| [Validator](https://github.com/validatorjs/validator.js) | 13.15.15 | Input validation |
| [CORS](https://github.com/expressjs/cors) | 2.8.5 | Cross-origin resource sharing |
| [dotenv](https://github.com/motdotla/dotenv) | 17.0.1 | Environment variable management |
| [Nodemon](https://nodemon.io/) | latest | Dev server auto-restart |

### DevOps & Deployment
| Tool | Purpose |
|---|---|
| [Vercel](https://vercel.com/) | Backend & Frontend deployment |
| ESLint | Code linting (React Hooks + Refresh plugins) |

---

## 📁 Project Structure

```
Medicon/
├── 📂 frontend/                  # Patient-facing React app
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx          # Landing page
│   │   │   ├── Doctors.jsx       # Browse & filter doctors by speciality
│   │   │   ├── Appointment.jsx   # Book appointment + Razorpay payment
│   │   │   ├── MyAppointments.jsx# View & cancel user's appointments
│   │   │   ├── MyProfile.jsx     # User profile management
│   │   │   ├── Login.jsx         # Auth (Login / Register)
│   │   │   ├── About.jsx         # About page
│   │   │   └── Contact.jsx       # Contact page
│   │   ├── components/
│   │   │   ├── Navbar.jsx        # Responsive navigation bar
│   │   │   ├── Footer.jsx        # Site footer
│   │   │   ├── Header.jsx        # Hero section
│   │   │   ├── Banner.jsx        # CTA banner
│   │   │   ├── TopDoctors.jsx    # Featured doctors section
│   │   │   ├── SpecialityMenu.jsx# Speciality filter component
│   │   │   └── RelatedDoctor.jsx # Related doctor suggestions
│   │   └── context/              # React Context (global state)
│   ├── vite.config.js
│   └── package.json
│
├── 📂 admin/                     # Admin + Doctor React app
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx         # Admin & Doctor login
│   │   │   ├── Admin/
│   │   │   │   ├── Dashboard.jsx     # Admin stats overview
│   │   │   │   ├── AddDoctor.jsx     # Register new doctor form
│   │   │   │   ├── DoctorsList.jsx   # All doctors + toggle availability
│   │   │   │   └── AllAppointment.jsx# All appointments management
│   │   │   └── Doctor/
│   │   │       ├── DoctorDashboard.jsx  # Doctor's personal stats
│   │   │       ├── DoctorAppointment.jsx# Doctor's appointments list
│   │   │       └── DoctorProfile.jsx    # Doctor profile editor
│   │   └── context/              # Admin & Doctor Context
│   └── package.json
│
├── 📂 backend/                   # Express REST API
│   ├── config/
│   │   ├── mongodb.js            # MongoDB connection
│   │   └── cloudinary.js         # Cloudinary configuration
│   ├── controllers/
│   │   ├── adminController.js    # Admin business logic
│   │   ├── doctorController.js   # Doctor business logic
│   │   └── userController.js     # User/Patient business logic
│   ├── middleware/
│   │   ├── authAdmin.js          # Admin JWT guard
│   │   ├── authDoctor.js         # Doctor JWT guard
│   │   ├── authUser.js           # User JWT guard
│   │   └── multer.js             # File upload handler
│   ├── models/
│   │   ├── userModel.js          # User schema
│   │   ├── doctorModel.js        # Doctor schema
│   │   └── appointmentModel.js   # Appointment schema
│   ├── routes/
│   │   ├── adminRoute.js         # /api/admin/* routes
│   │   ├── doctorRoute.js        # /api/doctor/* routes
│   │   └── userRoute.js          # /api/user/* routes
│   ├── server.js                 # App entry point
│   ├── vercel.json               # Vercel deployment config
│   └── package.json
│
├── .gitignore
├── LICENSE
└── README.md
```

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                     CLIENT LAYER                      │
│  ┌──────────────────────┐  ┌───────────────────────┐ │
│  │   Frontend (React)   │  │  Admin Panel (React)  │ │
│  │   Patient Portal     │  │  Admin + Doctor Views │ │
│  │   Port: 5173         │  │  Port: 5174           │ │
│  └──────────┬───────────┘  └──────────┬────────────┘ │
└─────────────┼────────────────────────┼───────────────┘
              │         Axios (HTTP)    │
              ▼                        ▼
┌─────────────────────────────────────────────────────┐
│                    API LAYER (Express)               │
│              Backend REST API — Port: 3000           │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────┐  │
│  │ /api/admin  │  │ /api/doctor  │  │  /api/user │  │
│  └─────────────┘  └──────────────┘  └────────────┘  │
│         JWT Middleware | Multer | Bcrypt              │
└──────┬──────────────────────────┬────────────────────┘
       │                          │
       ▼                          ▼
┌──────────────┐         ┌─────────────────┐
│   MongoDB    │         │   Cloudinary    │
│  (Database)  │         │ (Image Storage) │
└──────────────┘         └─────────────────┘
                                 ▲
                    ┌────────────┘
                    │
             ┌──────────────┐
             │   Razorpay   │
             │  (Payments)  │
             └──────────────┘
```

---

## 📡 API Reference

### Admin Routes — `/api/admin`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/login` | ❌ | Admin login |
| `POST` | `/add-doctor` | ✅ Admin | Add a new doctor (with image upload) |
| `POST` | `/all-doctors` | ✅ Admin | List all registered doctors |
| `POST` | `/change-availability` | ✅ Admin | Toggle doctor availability |
| `GET` | `/appointments` | ✅ Admin | Fetch all appointments |
| `POST` | `/cancel-appointment` | ✅ Admin | Cancel any appointment |
| `GET` | `/dashboard` | ✅ Admin | Dashboard stats (doctors, patients, appointments) |

### Doctor Routes — `/api/doctor`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/list` | ❌ | Get list of all doctors (public) |
| `POST` | `/login` | ❌ | Doctor login |
| `GET` | `/appointments` | ✅ Doctor | Doctor's appointment list |
| `POST` | `/complete-appointment` | ✅ Doctor | Mark appointment as completed |
| `POST` | `/cancel-appointment` | ✅ Doctor | Cancel an appointment |
| `GET` | `/dashboard` | ✅ Doctor | Doctor's personal dashboard stats |
| `GET` | `/profile` | ✅ Doctor | Get doctor profile |
| `POST` | `/update-profile` | ✅ Doctor | Update doctor profile |

### User Routes — `/api/user`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/register` | ❌ | Register new patient |
| `POST` | `/login` | ❌ | Patient login |
| `GET` | `/get-profile` | ✅ User | Get user profile |
| `POST` | `/update-profile` | ✅ User | Update profile (with image upload) |
| `POST` | `/book-appointment` | ✅ User | Book a doctor appointment |
| `GET` | `/appointments` | ✅ User | Get user's appointments |
| `POST` | `/cancel-appointment` | ✅ User | Cancel an appointment |
| `POST` | `/payment-razorpay` | ✅ User | Create Razorpay payment order |
| `POST` | `/verifyRazorpay` | ✅ User | Verify Razorpay payment signature |

### System

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Server health check (status, uptime, timestamp) |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ and **npm**
- **MongoDB** (local instance or [MongoDB Atlas](https://www.mongodb.com/atlas))
- **Cloudinary** account — [cloudinary.com](https://cloudinary.com/)
- **Razorpay** account — [razorpay.com](https://razorpay.com/)

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/your-username/Medicon.git
cd Medicon
```

**2. Install Backend dependencies**
```bash
cd backend
npm install
```

**3. Install Frontend dependencies**
```bash
cd ../frontend
npm install
```

**4. Install Admin Panel dependencies**
```bash
cd ../admin
npm install
```

### Running the Application

Open **three separate terminals**:

**Terminal 1 — Backend (API Server)**
```bash
cd backend
npm run server
# Server runs on http://localhost:3000
```

**Terminal 2 — Frontend (Patient App)**
```bash
cd frontend
npm run dev
# App runs on http://localhost:5173
```

**Terminal 3 — Admin Panel**
```bash
cd admin
npm run dev
# App runs on http://localhost:5174
```

---

## 🔐 Environment Variables

### `backend/.env`

Create a `.env` file in the `/backend` directory based on `.env.example`:

```env
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
ADMIN_EMAIL=admin_email
ADMIN_PASSWORD=admin_password
JWT_SECRET=your_jwt_secret
CURRENCY=INR
```

### `frontend/.env` & `admin/.env`

```env
VITE_BACKEND_URL=http://localhost:3000
```

> ⚠️ **Never commit `.env` files** to version control. All sensitive credentials should remain secret.

---

## 🌐 Deployment

The backend is configured for **Vercel** deployment via [`vercel.json`](./backend/vercel.json):

```json
{
  "version": 2,
  "builds": [{ "src": "server.js", "use": "@vercel/node" }],
  "routes": [{ "src": "/(.*)", "dest": "server.js" }]
}
```

**Deploy steps:**
1. Push to GitHub
2. Connect the repository to [Vercel](https://vercel.com)
3. Set environment variables in the Vercel dashboard
4. Deploy each app (frontend, admin, backend) as separate Vercel projects

---

## 🩺 Doctor Specialities Supported

| Speciality | Description |
|---|---|
| 🩺 General Physician | Primary care and general health |
| 👩‍⚕️ Gynecologist | Women's health and reproductive care |
| 🧴 Dermatologist | Skin, hair, and nail conditions |
| 👶 Pediatrician | Child health and development |
| 🧠 Neurologist | Brain and nervous system disorders |
| 🫁 Gastroenterologist | Digestive system conditions |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and **commit**: `git commit -m 'feat: add your feature'`
4. **Push** to the branch: `git push origin feature/your-feature-name`
5. Open a **Pull Request**

Please follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.

---

## 📄 License

This project is licensed under the **ISC License** — see the [LICENSE](./LICENSE) file for details.

---

<p align="center">
  Made with ❤️ for better healthcare access
</p>
