🚖 HermesCabs

HermesCabs is a full‑stack ride-hailing application with a Next.js frontend and FastAPI backend, featuring user signup/login with JWT, ride booking, and a premium golden-themed UI.

✨ Features

User Authentication: Signup / Login with JWT

Secure: Passwords hashed, tokens stored securely

Elegant Golden Theme: Smooth UI animations

Responsive Design: Works on mobile, tablet, and desktop

Backend API: Built with FastAPI for rides, drivers, and payments

Scalable Architecture: Frontend and backend separation

🛠️ Tech Stack
Layer	Technology
Frontend	Next.js, React, Tailwind CSS
Backend	FastAPI, Python
Authentication	JWT (python-jose), Password Hashing (passlib)
Database	SQLite / PostgreSQL / MySQL
Styling	Tailwind CSS with golden/beige theme

📂 Project Structure
HermesCabs/
│
├── backend/                     
│   ├── main.py                  # FastAPI entrypoint
│   ├── models.py                # Database models
│   ├── schemas.py               # Pydantic schemas
│   ├── auth.py                  # JWT auth & login/signup
│   ├── database.py              # DB connection
│   └── requirements.txt         # Python dependencies
│
├── frontend/                    
│   ├── app/
│   │   ├── page.tsx             # Home page
│   │   ├── login/page.tsx       # Login page
│   │   ├── signup/page.tsx      # Signup page
│   │   └── book/page.tsx        # Book a ride
│   │
│   ├── components/              
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── LocationMap.tsx
│   │
│   ├── public/                  
│   ├── styles/                  
│   │   └── globals.css
│   ├── package.json             
│   └── next.config.js
│
├── .gitignore
├── README.md
└── LICENSE
🚀 Getting Started
Prerequisites

Node.js (v16+) & npm / yarn

Python 3.10+

Optional: SQLite / PostgreSQL / MySQL

Backend Setup
cd backend
pip install -r requirements.txt
uvicorn main:app --reload


Backend runs at: http://127.0.0.1:8000

Frontend Setup
cd ../frontend
npm install
npm run dev


Frontend runs at: http://localhost:3000

Optionally, set NEXT_PUBLIC_API_URL=http://127.0.0.1:8000 in .env.local

🧪 Testing

Test backend endpoints with Postman or curl:

# Signup
curl -X POST http://127.0.0.1:8000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"secret","phone":"1234567890"}'

# Login
curl -X POST http://127.0.0.1:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"secret"}'

📸 Screenshots
Login Page

Signup Page

Book a Ride

Stripe Payment

🔧 Future Enhancements

Persistent database for users and rides

Driver registration & dashboard

Ride history & booking management

Payment integration with Stripe / PayPal

Protected routes with JWT authentication

👥 Contributing

Fork the repository

Create a feature branch: git checkout -b feature/YourFeature

Commit & push changes

Open a Pull Request

📄 License

This project is licensed under the MIT License.
