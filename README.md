# 🚀 BHANOVA – AI-Powered Personal Productivity Platform

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react" />
  <img src="https://img.shields.io/badge/FastAPI-0.115-009688?logo=fastapi" />
  <img src="https://img.shields.io/badge/Python-3.11-3776AB?logo=python" />
  <img src="https://img.shields.io/badge/PostgreSQL-16-336791?logo=postgresql" />
  <img src="https://img.shields.io/badge/SQLAlchemy-2.0-red" />
  <img src="https://img.shields.io/badge/JWT-Authentication-success" />
  <img src="https://img.shields.io/badge/Render-Backend-46E3B7?logo=render" />
  <img src="https://img.shields.io/badge/Vercel-Frontend-black?logo=vercel" />
</p>

BHANOVA is a full-stack productivity platform that helps users manage daily habits, study plans, fitness, goals, journaling, reading progress, and personal growth from a single dashboard.

The application is built using **React**, **FastAPI**, and **PostgreSQL**, following a modular architecture with secure authentication and REST APIs.

---

# 🌐 Live Demo

### Frontend

https://bhanova.vercel.app

### Backend API

https://bhanova.onrender.com

### API Documentation

https://bhanova.onrender.com/docs

---

# ✨ Features

## User Management

- Secure JWT Authentication
- User Registration & Login
- Password Hashing
- Protected API Routes
- User Profile Management

---

## Habit Tracking

- Create Daily Habits
- Habit Completion Tracking
- Streak Calculation
- Habit Statistics
- Progress Monitoring

---

## Study Planner

- Study Topic Management
- Study Session Logging
- Learning Progress Tracking
- Daily Study Analytics

---

## DSA Tracker

- Track DSA Topics
- Problem Solving Progress
- Accuracy Tracking
- Revision Planning

---

## Fitness Dashboard

- Workout Logging
- Body Measurements
- Weight Tracking
- Progress History

---

## Nutrition Tracking

- Food Journal
- Daily Calories
- Protein, Carbs & Fat Tracking
- Water Intake Monitoring

---

## Sleep Tracking

- Sleep Duration
- Sleep Quality
- Daily Sleep Logs

---

## Reading Tracker

- Book Library
- Reading Sessions
- Reading Progress
- Completion Statistics

---

## Goal Management

- Daily Goals
- Weekly Goals
- Monthly Goals
- Progress Tracking

---

## Planner

- Daily Task Planning
- Priority Management
- Task Completion Tracking

---

## Journal

- Morning Journal
- Night Reflection
- Gratitude Logging

---

## Finance Tracker

- Income Tracking
- Expense Tracking
- Savings Records

---

## Career Dashboard

- Job Applications
- Interview Preparation
- University Shortlisting

---

# 🏗 Architecture

```
                React + Vite
                      │
                      │ REST API
                      ▼
              FastAPI Backend
                      │
              SQLAlchemy ORM
                      │
                      ▼
               PostgreSQL Database
```

---

# 🛠 Tech Stack

## Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router
- TanStack Query
- Zustand
- Framer Motion
- Recharts

---

## Backend

- FastAPI
- Python 3.11
- SQLAlchemy
- Alembic
- JWT Authentication
- Pydantic

---

## Database

- PostgreSQL

---

## Deployment

Frontend:
- Vercel

Backend:
- Render

---

# 📁 Project Structure

```
BHANOVA
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── backend
│   ├── app
│   ├── models
│   ├── routers
│   ├── services
│   ├── database.py
│   └── main.py
│
└── README.md
```

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/Bhanureddy-05/BHANOVA.git

cd BHANOVA
```

---

## Backend

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

# Linux / Mac
source venv/bin/activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend runs at

```
http://127.0.0.1:8000
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at

```
http://localhost:5173
```

---

# 🔐 Environment Variables

Example:

```env
DATABASE_URL=your_database_url

SECRET_KEY=your_secret_key

ALGORITHM=HS256

ACCESS_TOKEN_EXPIRE_MINUTES=30
```

---

# 📷 Screenshots

> Add screenshots here

- Login Page

- Dashboard

- Habit Tracker

- Study Planner

- Fitness Dashboard

- Analytics

---

# 📌 Future Enhancements

- AI Productivity Assistant
- Google Calendar Synchronization
- Email Reminder Service
- Smartwatch Integration
- Voice Journaling
- Mobile Application
- Advanced Analytics
- Notification System

---

# 📊 Skills Demonstrated

- Full Stack Development
- REST API Development
- Authentication & Authorization
- Database Design
- Backend Architecture
- State Management
- Responsive UI Development
- Deployment & DevOps
- Git Version Control

---

# 👨‍💻 Author

**Y Bhanu Prakash Reddy**

LinkedIn:
(Add your LinkedIn)

GitHub:

https://github.com/Bhanureddy-05

---

# 📄 License

This project is licensed under the MIT License.
