📘 Employee Leave Management System

A full-stack application built using Node.js, Express, MongoDB, React, Zustand, Vite, and JWT Authentication to manage employee leave requests with role-based access control.

Employees can apply for leave, view their balance, and track approval status.
Managers can review, approve, or reject leave requests.

🚀 Tech Stack
Frontend

React (Vite)

Zustand (State Management)

Axios

React Router

Tailwind CSS

Backend

Node.js

Express.js

MongoDB + Mongoose

JWT Authentication

Bcrypt

dotenv, cors

📂 Project Structure
employee-leave-management/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│   ├── package.json
│   └── .env.example
│
└── frontend/
    ├── src/
    ├── package.json
    └── vite.config.js

⚙️ Backend Setup
1. Navigate to backend
cd backend

2. Install dependencies
npm install

3. Create .env file

Use .env.example as a reference.

MONGODB_URI=mongodb://localhost:27017/employee_leave_db
JWT_SECRET=your_jwt_secret_key
PORT=5000

4. (Optional) Seed sample users
npm run seed

Sample accounts generated:
Employee:
email: employee@test.com
password: password123

Manager:
email: manager@test.com
password: password123

5. Start backend
npm run dev


The API will run on:
👉 http://localhost:5000/api

🖥️ Frontend Setup
1. Navigate to frontend
cd frontend

2. Install dependencies
npm install

3. Start frontend
npm run dev


App runs on (default):
👉 http://localhost:5173

🔐 API Endpoints
Auth
Method	Endpoint	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	Login and receive JWT
GET	/api/auth/me	Get logged-in user
Employee – Leaves
Method	Endpoint	Description
POST	/api/leaves	Apply for leave
GET	/api/leaves/my-requests	View my requests
DELETE	/api/leaves/:id	Cancel request
GET	/api/leaves/balance	Check leave balance
Manager – Leaves
Method	Endpoint	Description
GET	/api/leaves/all	View all requests
GET	/api/leaves/pending	Only pending requests
PUT	/api/leaves/:id/approve	Approve leave
PUT	/api/leaves/:id/reject	Reject leave
📊 Dashboard
Method	Endpoint	Description
GET	/api/dashboard/employee	Employee dashboard stats
GET	/api/dashboard/manager	Manager dashboard stats
🔑 Features
Employee Features

Apply for leave

Check leave balance

View request history

Cancel pending requests

JWT-based login

Manager Features

Review pending requests

Approve / reject requests

Add comments during decisions

View all employee leave requests

Other Features

Protected routes (Frontend + Backend)

Role-based authorization

Global state using Zustand

Axios interceptors for attaching tokens
📦 Scripts
Backend
npm run dev        # Start server (nodemon)
npm run seed       # Seed sample users

Frontend
npm run dev
npm run build
npm run preview
