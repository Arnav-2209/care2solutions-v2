# Care2Solutions Website v2

## Project Overview

The Care2Solutions company website — a full-stack web application built with modern technologies.

## Tech Stack

### Frontend
- **React** — UI library
- **TypeScript** — Type safety
- **Vite** — Build tool and dev server
- **Tailwind CSS** — Utility-first CSS framework

### Backend
- **Node.js** — Runtime
- **TypeScript** — Type safety
- **Fastify** — Web framework
- **Zod** — Schema validation

### Database
- **PostgreSQL** — Relational database (to be configured later)

## Architecture

```
Frontend (React + Vite)
       │
       │ REST API
       ▼
Backend (Node.js + Fastify)
       │
       ▼
PostgreSQL (to be configured)
```

## Project Structure

```
care2solutions-v2/
│
├── frontend/                # React + Vite application
│   └── src/
│       ├── assets/          # Static assets (images, fonts, etc.)
│       ├── components/      # Reusable UI components
│       ├── sections/        # Page sections
│       ├── pages/           # Full pages
│       ├── hooks/           # Custom React hooks
│       ├── services/        # API service functions
│       ├── types/           # TypeScript type definitions
│       ├── utils/           # Utility functions
│       ├── App.tsx          # Root component
│       └── main.tsx         # Entry point
│
├── backend/                 # Node.js + Fastify API
│   └── src/
│       ├── routes/          # Route definitions
│       ├── controllers/     # Request handlers
│       ├── services/        # Business logic
│       ├── schemas/         # Zod validation schemas
│       ├── plugins/         # Fastify plugins
│       ├── middleware/       # Custom middleware
│       ├── config/          # Configuration
│       ├── types/           # TypeScript type definitions
│       ├── app.ts           # Fastify app factory
│       └── server.ts        # Server entry point
│
├── docs/                    # Documentation
├── .gitignore
├── .env.example
├── README.md
└── CONTRIBUTING.md
```

## Getting Started

### Prerequisites

- **Node.js** >= 20
- **npm** >= 10
- **Git**

### Clone the Repository

```bash
git clone git@github.com:Arnav-2209/care2solutions-v2.git
cd care2solutions-v2
```

### Environment Variables

```bash
cp .env.example .env
```

Edit `.env` and fill in the required values.

## Frontend Development

```bash
cd frontend
npm install
npm run dev
```

The development server will start at `http://localhost:5173`.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Backend Development

```bash
cd backend
npm install
npm run dev
```

The API server will start at `http://localhost:3001`.

### Build

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Health Check

```bash
curl http://localhost:3001/api/health
```

Expected response:

```json
{
  "status": "ok"
}
```

## Environment Variables

| Variable       | Description                  | Example                          |
|----------------|------------------------------|----------------------------------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host/db` |
| `FRONTEND_URL` | Frontend application URL     | `http://localhost:5173`          |
| `BACKEND_URL`  | Backend API URL              | `http://localhost:3001`          |
| `PORT`         | Backend server port          | `3001`                           |
| `HOST`         | Backend server host          | `0.0.0.0`                       |

## Git Workflow

We use a feature-branch workflow. See [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

### Branch Naming

```
feature/<name>    — New features
fix/<name>        — Bug fixes
refactor/<name>   — Code refactoring
docs/<name>       — Documentation changes
```

### Commit Convention

```
feat:      — New feature
fix:       — Bug fix
docs:      — Documentation
style:     — Styling changes
refactor:  — Code refactoring
test:      — Tests
chore:     — Maintenance
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the full contribution guide.

## Deployment

To be configured later.
