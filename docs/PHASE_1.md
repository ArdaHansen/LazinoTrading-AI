# Phase 1 Build Notes

## Completed foundation

- Next.js website and internal dashboard
- Employee login page
- Express REST API
- JWT authentication
- Admin-only routes
- Paper order creation
- Portfolio calculation foundation
- AI training placeholder endpoint
- Audit logging in memory
- Docker services for PostgreSQL and Redis

## Not production-ready yet

- Demo users are stored in code for Alpha only
- Audit logs are in memory
- Paper trading does not use real market prices
- Database integration is prepared but not wired
- AI training is a placeholder
- Live trading is intentionally disabled

## Next technical steps

1. Add Prisma or Drizzle ORM
2. Move users, orders and audit logs into PostgreSQL
3. Add refresh tokens and secure HTTP-only cookies
4. Add dataset upload and validation
5. Add backtesting module
6. Add real analytics dashboard
7. Add unit and integration tests
