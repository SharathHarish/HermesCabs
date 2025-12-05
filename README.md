HermesCabs 🚖

HermesCabs is a full‑stack ride‑hailing application.
It offers user signup/login using JWT, a sleek golden‑beige themed frontend in Next.js, and a backend API built with FastAPI.
The system supports user registration, authentication, booking rides, and — in future — driver signup, ride scheduling, package delivery, and more.

🔎 Features

✅ User signup / login with hashed password + JWT authentication

✅ Secure token ‎storage (JWT) — ready for protected routes & API calls

🎨 Elegant Golden‑Beige UI theme (light background, soft gold/beige elements)

🖥️ Responsive UI built with Next.js

⚙️ Backend APIs built in FastAPI — easy to extend (rides, drivers, packages…)

🔄 Clean separation: frontend ↔ backend; easy to deploy independently

🧰 Tech Stack
Layer	Technology
Frontend	Next.js, React, Tailwind CSS
Backend	FastAPI, Python, JWT (via python-jose), password hashing (passlib)
Auth	JSON Web Token (JWT)
Data storage	(you can plug in any DB — e.g. SQLite, PostgreSQL, MySQL)
Styling	Tailwind CSS, custom golden‑beige theme

📂 Project Structure
HermesCabs/
│
├── backend/                     # FastAPI backend
│   ├── main.py                  # FastAPI app entrypoint
│   ├── models.py                # Database models (User, Ride, etc.)
│   ├── schemas.py               # Pydantic schemas
│   ├── auth.py                  # JWT authentication, login/signup logic
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

🚀 Getting Started (Local Development)
Prerequisites

Node.js (v16+ recommended) and npm / yarn

Python 3.10+

(Optional) A database, if you move beyond in‑memory storage

Setup Steps

Clone the repository

git clone https://github.com/SharathHarish/HermesCabs.git
cd HermesCabs


Start FastAPI backend

cd backend
pip install -r requirements.txt
uvicorn main:app --reload


Backend should now run at http://127.0.0.1:8000

Start Next.js frontend

cd ../frontend
cp .env.example .env.local
# Set NEXT_PUBLIC_API_URL=http://127.0.0.1:8000 in .env.local
npm install
npm run dev


Frontend should be available at http://localhost:3000

🧪 Testing / Validation

You can test your backend APIs directly using Postman or curl:

# Signup
curl -X POST http://127.0.0.1:8000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"secret","phone":"1234567890"}'

# Login
curl -X POST http://127.0.0.1:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"secret"}'

📸 Screenshots
1. Login Page

2. Signup Page

3. Book a Ride

4. Stripe Payment

🛠️ Continuing Development

 Persist users in a database

 Add ride booking endpoints

 Add driver registration & dashboard

 Add protected routes (JWT authentication)

 Deploy backend & frontend

 Add ride history, profile management, payment history

🎯 Motivation

HermesCabs demonstrates a real-world full-stack architecture:
secure JWT authentication, clean frontend-backend separation, and a modern UI theme.

🧑‍💻 Contributing

Fork the repository

Create a feature branch: git checkout -b feature/YourFeature

Commit & push changes

Submit a Pull Request

📄 License

MIT License
