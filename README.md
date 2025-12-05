🚖 HermesCabs

HermesCabs is a full‑stack ride-hailing application with Next.js frontend and FastAPI backend, featuring user signup/login with JWT authentication, booking rides, and a premium golden-themed UI.

✨ Features

User Authentication: Signup / Login with JWT

Secure: Passwords are hashed, tokens stored securely

Elegant Theme: Golden-beige UI with smooth animations

Responsive Design: Works across devices

Backend API: Built with FastAPI — easy to extend for rides, drivers, and payments

Clean Architecture: Frontend and backend separation for scalability

🛠️ Tech Stack
Layer	Technology
Frontend	Next.js, React, Tailwind CSS
Backend	FastAPI, Python
Authentication	JWT via python-jose, password hashing with passlib
Database	SQLite / PostgreSQL / MySQL (configurable)
Styling	Tailwind CSS with golden/beige theme
📂 Project Structure
HermesCabs/
│
├── backend/                     # FastAPI backend
│   ├── main.py                  # App entrypoint
│   ├── models.py                # Database models
│   ├── schemas.py               # Pydantic schemas
│   ├── auth.py                  # JWT auth & login/signup logic
│   ├── database.py              # DB connection setup
│   └── requirements.txt         # Python dependencies
│
├── frontend/                    # Next.js frontend
│   ├── app/
│   │   ├── page.tsx             # Home page
│   │   ├── login/page.tsx       # Login page
│   │   ├── signup/page.tsx      # Signup page
│   │   └── book/page.tsx        # Book a ride page
│   │
│   ├── components/              # Reusable React components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── LocationMap.tsx
│   │
│   ├── public/                  # Static assets (images, favicon)
│   ├── styles/                  # Tailwind/Global styles
│   │   └── globals.css
│   ├── package.json             # Frontend dependencies
│   └── next.config.js
│
├── .gitignore
├── README.md
└── LICENSE


You can expand backend/ for rides, drivers, payments, etc.

🚀 Getting Started
Prerequisites

Node.js (v16+) & npm / yarn

Python 3.10+

(Optional) Database: SQLite / PostgreSQL / MySQL

Setup Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload


Backend will run at http://127.0.0.1:8000

Setup Frontend
cd ../frontend
npm install
npm run dev


Frontend will run at http://localhost:3000

Set NEXT_PUBLIC_API_URL=http://127.0.0.1:8000 in .env.local if needed

🧪 Testing

You can test backend endpoints with Postman or curl:

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

Persist users in a real database

Driver registration & dashboard

Ride history & booking management

Payment integration with Stripe / PayPal

Protected routes using JWT authentication

👥 Contributing

Fork the repository

Create a feature branch: git checkout -b feature/YourFeature

Commit & push changes

Open a Pull Request

📄 License

This project is licensed under the MIT License.
