# Small Issue Tracker — Full Stack (FastAPI + React + TypeScript)

A minimal full-stack issue tracker with **FastAPI** backend and **React + TypeScript + Tailwind CSS** frontend, fully dark-mode by default.

---

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [Next Steps](#next-steps)

---

## Features

- Backend:
  - FastAPI with REST endpoints: `/issues`, `/issues/{id}`, `/health`.
  - In-memory storage (replaceable with a DB like PostgreSQL).
- Frontend:
  - React + TypeScript + Vite.
  - Tailwind CSS dark theme.
  - Add, view, filter, and list issues.
  - Status and priority badges.

---

## Prerequisites

- **Python 3.13+**
- **Node.js 20+**
- **npm 9+**

---

## Backend Setup

1. Navigate to the backend folder:

```bash
cd backend
Create and activate a virtual environment:

bash
Copy code
python -m venv .venv
# Linux/macOS
source .venv/bin/activate
# Windows
.venv\Scripts\activate
Install dependencies:

bash
Copy code
pip install fastapi uvicorn
Run the backend server:

bash
Copy code
uvicorn main:app --reload --host 0.0.0.0 --port 8000
API root: http://localhost:8000

OpenAPI docs: http://localhost:8000/docs

Frontend Setup
Navigate to the frontend folder:

bash
Copy code
cd frontend
Install dependencies:

bash
Copy code
npm install
Run the frontend development server:

bash
Copy code
npm run dev
Open the dev URL (Vite default) http://localhost:5173

The frontend will automatically call the backend API at http://localhost:8000.

Usage
Add Issue: Fill the form and click "Add Issue".

View Issues: Scroll the list to see all issues.

Status & Priority: Each issue shows status/priority badges.
```
