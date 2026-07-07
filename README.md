# LazinoTrading AI

Private AI-powered trading research and automation platform for strategy development, paper trading, market analysis and future machine-learning experiments.

Current version: Phase 1 Alpha MVP

## Phase 1 includes

- Website dashboard
- Employee login flow
- Server-side authentication
- Role-based admin center
- Paper trading simulator foundation
- AI training system placeholder
- Audit logging foundation
- Docker setup

## Important

This project does not execute live trades. It is a research and paper-trading MVP only.

## Quick start

```bash
cp .env.example .env
npm install
npm run dev
```

Frontend: http://localhost:3000  
Backend: http://localhost:4000/health

## Render deployment

This project is prepared for Render with:

- a frontend service using Next.js
- a backend service using Express
- a shared environment file pattern for production variables
- a database-ready backend layer via PostgreSQL connection support

### Suggested Render setup

1. Create two web services:
   - Frontend: root directory `frontend`
   - Backend: root directory `backend`
2. Use the commands:
   - Frontend build: `npm install && npm run build`
   - Frontend start: `npm run start`
   - Backend build: `npm install && npm run build`
   - Backend start: `npm run start`
3. Add environment variables in Render:
   - `NODE_ENV=production`
   - `PORT=10000`
   - `FRONTEND_URL=https://your-frontend-url.onrender.com`
   - `CORS_ORIGIN=https://your-frontend-url.onrender.com`
   - `JWT_SECRET=your-secret`
   - `DATABASE_URL=postgresql://...`

If you later connect a real database, the backend is already prepared to use `DATABASE_URL` through PostgreSQL.

## Demo users

Admin:
- Email: admin@lazinotrading.ai
- Password: LazinoAdmin123!

Employee:
- Email: employee@lazinotrading.ai
- Password: LazinoEmployee123!

Change these before real deployment.
