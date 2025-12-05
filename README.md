# 🚗 Rydeon - Modern Cab Booking Platform

A full-stack ride-hailing application built with Next.js, FastAPI, and SQLite. Features a beautiful dark-themed UI with glassmorphism effects and real-time ride booking.

![Rydeon](https://img.shields.io/badge/Status-Production%20Ready-success)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104-green)
![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Features

### 🎨 Modern UI/UX
- **Dark Mode Theme** - Sleek black interface with purple/blue gradients
- **Glassmorphism Effects** - Frosted glass design throughout
- **Smooth Animations** - Fade, slide, and scale effects
- **Fully Responsive** - Works on mobile, tablet, and desktop

### 🚕 Core Features
- **User Authentication** - Secure registration and login
- **Ride Booking** - Book rides with pickup and drop-off locations
- **Interactive Maps** - OpenStreetMap integration (100% free, no API key)
- **Real-time Dashboard** - Track rides, stats, and history
- **Multiple Ride Options** - Rydeon X, Comfort, XL, and Premium

### 🔧 Technical Features
- **Next.js 14** - React framework with App Router
- **FastAPI** - High-performance Python backend
- **SQLite Database** - Lightweight and portable
- **JWT Authentication** - Secure token-based auth
- **RESTful API** - Clean and documented endpoints

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Python 3.11+
- Git (optional, for deployment)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/rydeon.git
   cd rydeon
   ```

2. **Setup Backend**
   ```bash
   cd backend
   pip install -r requirements.txt
   python -m uvicorn app.main:app --reload
   ```
   Backend runs on: http://localhost:8000

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Frontend runs on: http://localhost:3000

4. **Access the App**
   - Open http://localhost:3000
   - Register a new account
   - Start booking rides!

## 📁 Project Structure

```
rydeon/
├── frontend/                 # Next.js frontend
│   ├── app/                 # App router pages
│   │   ├── page.tsx        # Homepage
│   │   ├── book/           # Ride booking
│   │   ├── login/          # Login page
│   │   ├── signup/         # Registration
│   │   ├── dashboard/      # User dashboard
│   │   └── ride/[id]/      # Ride details
│   ├── components/          # React components
│   │   ├── Navbar.tsx      # Navigation bar
│   │   ├── SimpleMap.jsx   # Map component
│   │   └── ClientLayout.tsx
│   ├── public/             # Static assets
│   └── package.json
│
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── main.py         # FastAPI app
│   │   ├── database.py     # Database config
│   │   ├── models/         # SQLAlchemy models
│   │   ├── routes/         # API endpoints
│   │   ├── schemas/        # Pydantic schemas
│   │   └── utils/          # Helper functions
│   ├── requirements.txt
│   └── rydeon.db          # SQLite database
│
├── README.md
├── DEPLOYMENT_GUIDE.md
├── netlify.toml           # Netlify config
└── render.yaml            # Render config
```

## 🎯 Key Pages

### Homepage (`/`)
- Hero section with booking form
- Service cards (Ride, Drive, Package)
- Safety information
- Call-to-action sections

### Booking (`/book`)
- Location input fields
- Interactive map selection
- Ride options with pricing
- Real-time availability

### Dashboard (`/dashboard`)
- Ride statistics
- Active rides counter
- Recent ride history
- Quick action buttons

### Authentication
- `/login` - User login
- `/signup` - New user registration
- JWT token-based authentication

## 🗺️ Map Integration

Uses **OpenStreetMap** with Leaflet.js:
- ✅ 100% Free (no API key required)
- ✅ No usage limits
- ✅ Global coverage
- ✅ Click to select pickup/drop-off
- ✅ Visual markers and popups

## 🔐 Authentication Flow

1. User registers with email and password
2. Password hashed with bcrypt
3. JWT token generated on login
4. Token stored in localStorage
5. Protected routes check for valid token
6. Automatic logout on token expiry

## 📊 Database Schema

### Users Table
- id, name, email, password (hashed), role, created_at

### Rides Table
- id, user_id, passenger_id, driver_id, cab_id
- pickup_location, drop_location
- pickup_lat, pickup_lng, drop_lat, drop_lng
- distance_km, fare_amount, status, created_at

### Drivers Table
- id, user_id, license_number, vehicle_type, rating

### Cabs Table
- id, driver_id, model, plate_number, capacity

### Payments Table
- id, ride_id, amount, payment_method, status

## 🎨 Design System

### Colors
- **Background**: `#000000` (Black)
- **Primary**: `#9333ea` (Purple-600)
- **Secondary**: `#2563eb` (Blue-600)
- **Text**: `#ffffff` (White)
- **Muted**: `#9ca3af` (Gray-400)

### Components
- **Glass Cards**: `bg-white/10 backdrop-blur-xl border border-white/20`
- **Gradient Buttons**: `bg-gradient-to-r from-purple-600 to-blue-600`
- **Form Inputs**: `bg-white/5 border border-white/10`

### Animations
- `animate-fade-in` - Fade in effect (0.6s)
- `animate-slide-up` - Slide up from bottom (0.6s)
- `animate-slide-in-left` - Slide from left (0.8s)
- `animate-slide-in-right` - Slide from right (0.8s)
- `animate-scale-in` - Scale up effect (0.5s)

## 🚀 Deployment

### Frontend (Netlify)
1. Push code to GitHub
2. Connect repository to Netlify
3. Configure build settings:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Add environment variable: `NEXT_PUBLIC_API_URL`
5. Deploy!

### Backend (Render)
1. Push code to GitHub
2. Create new Web Service on Render
3. Connect repository
4. Render auto-detects settings from `render.yaml`
5. Add environment variables
6. Deploy!

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed instructions.

## 🔧 Configuration

### Frontend Environment Variables
Create `.env.local` in `frontend/`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Backend Environment Variables
Create `.env` in `backend/`:
```env
DATABASE_URL=sqlite:///./rydeon.db
SECRET_KEY=your-secret-key-here
```

## 📝 API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user

### Rides
- `POST /rides/book` - Book a new ride
- `GET /rides/` - Get all rides
- `GET /rides/{id}` - Get ride details
- `PATCH /rides/{id}/start` - Start ride
- `PATCH /rides/{id}/complete` - Complete ride

### Users
- `GET /users/me` - Get current user
- `PUT /users/me` - Update user profile

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (React 18)
- **Styling**: Tailwind CSS
- **Maps**: Leaflet.js + OpenStreetMap
- **HTTP Client**: Axios
- **Routing**: Next.js App Router

### Backend
- **Framework**: FastAPI
- **Database**: SQLite (SQLAlchemy ORM)
- **Authentication**: JWT (python-jose)
- **Password Hashing**: bcrypt
- **Validation**: Pydantic

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@Samir1s](https://github.com/Samir1s)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- FastAPI for the high-performance backend
- OpenStreetMap for free map tiles
- Tailwind CSS for the utility-first CSS framework

## 📞 Support

For support, email your.email@example.com or open an issue on GitHub.

---

**Made with ❤️ and ☕**

⭐ Star this repo if you find it helpful!
