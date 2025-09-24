# Issue Tracker — Full Stack (Python + FastAPI + React + TypeScript)

A Full Stack issue tracker with Python's **FastAPI** backend and **React + TypeScript + Tailwind CSS** frontend.

---

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Usage](#usage)

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
- **uv**
- **Node.js 20+**
- **npm 9+**

---

## Backend Setup

1. Navigate to the backend folder:

```bash
cd backend
```

2. Initialize Project and Install dependencies:

```bash
pip install uv
uv init
uv add fastapi uvicorn[standard]
```

3. Run Backend

```bash
uv run python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Backend run at

```bash
http://localhost:8000
```

## Frontend Setup

1. Navigate to the frontend folder and install dependencies:

```bash
cd frontend
npm install

```

2. Run Frontend

```bash
npm run dev
```

Frontend run at

```bash
http://localhost:5173
```

## Usage

Add Issue: Fill the form and click "Add Issue".

View Issues: Scroll the list to see all issues.

Status & Priority: Each issue shows status/priority badges.
