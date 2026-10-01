# Kanban Task Management

A full-stack Kanban app for managing boards, columns, and tasks.

I built this project to get more hands-on experience with full-stack development. The frontend is built with Next.js, the backend uses FastAPI, and PostgreSQL is used for the database.

## Features

* User signup and login
* JWT authentication
* User-specific boards
* Create, update, and delete boards
* Create, update, and delete columns
* Create, update, and delete tasks
* Drag and drop tasks between columns
* Task details sidebar
* Task priorities and due dates
* Form validation
* Protected API routes

## Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* TanStack Query
* React Hook Form
* Zod
* dnd-kit
* Lucide React

### Backend

* Python
* FastAPI
* SQLAlchemy
* PostgreSQL
* Alembic
* JWT
* Password hashing

### Tools

* Docker
* Git
* VS Code

## How it works

The basic structure is:

```text
User
 └── Boards
      └── Columns
           └── Tasks
```

A user can create multiple boards. Each board has its own columns and tasks.

Tasks can be moved between columns using drag and drop.

## Running locally

### 1. Clone the repository

```bash
git clone https://github.com/LynxQuas/kanban-task-management.git
cd kanban-task-management
```

### 2. Start PostgreSQL

From the project root:

```bash
docker compose -f backend/docker-compose.yml up -d
```

### 3. Start the backend

```bash
cd backend

python -m venv .venv
source .venv/bin/activate

pip install -r requirements.txt
```

Create your `.env` file from `.env.example`, then run the migrations:

```bash
alembic upgrade head
```

Start the API:

```bash
fastapi dev app/main.py
```

### 4. Start the frontend

Open another terminal:

```bash
cd frontend

npm install
```

Create `.env.local` from `.env.example`, then start Next.js:

```bash
npm run dev
```

The frontend runs at:

```text
http://localhost:3000
```

## What I learned

This project gave me experience working across both the frontend and backend instead of only working on the UI.

Some of the main things I worked with:

* Building REST APIs with FastAPI
* Working with PostgreSQL and SQLAlchemy
* Managing migrations with Alembic
* Implementing JWT authentication
* Protecting API routes
* Managing server state with TanStack Query
* Working with Next.js routing
* Building and validating forms
* Implementing drag and drop with dnd-kit
* Breaking larger React components into smaller components
* Connecting the frontend, API, and database together

I also spent time refactoring parts of the project as it grew. That helped me understand how to organize code instead of keeping everything inside large components or files.

## Current Status

The main features are working:

* Authentication
* Board CRUD
* Column CRUD
* Task CRUD
* Drag and drop

I'm continuing to work on the project. The next things I want to add are automated testing, deployment, CI/CD, logging, and some additional features such as comments, notifications, and file uploads.

## Why I built it

I wanted to build something where I had to deal with more than just frontend UI.

Working on this project has given me a better understanding of how authentication, APIs, databases, frontend state, and the different parts of a full-stack application fit together.
