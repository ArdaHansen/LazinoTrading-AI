import bcrypt from 'bcryptjs';
import { Router } from 'express';
import { z } from 'zod';
import { createSessionId, signToken } from '../auth/jwt.js';
import { findUserByEmail } from '../auth/users.js';
import { requireAuth } from '../middleware/auth.js';
import { writeAuditLog } from '../services/auditLog.js';

const router = Router();
const loginSchema = z.object({ email: z.string().email(), password: z.string().min(8) });

const loginAttempts = new Map<string, { count: number; resetAt: number }>();

function getClientKey(req: any) {
  return req.ip || 'unknown';
}

function isRateLimited(req: any) {
  const key = getClientKey(req);
  const now = Date.now();
  const bucket = loginAttempts.get(key);

  if (!bucket) return false;
  if (now > bucket.resetAt) {
    loginAttempts.delete(key);
    return false;
  }

  return bucket.count >= 5;
}

function registerFailedAttempt(req: any) {
  const key = getClientKey(req);
  const now = Date.now();
  const bucket = loginAttempts.get(key);

  if (!bucket || now > bucket.resetAt) {
    loginAttempts.set(key, { count: 1, resetAt: now + 60_000 });
    return;
  }

  bucket.count += 1;
}

router.post('/login', async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: 'Invalid login data' });

  if (isRateLimited(req)) {
    return res.status(429).json({ message: 'Too many attempts. Please try again later.' });
  }

  const user = findUserByEmail(parsed.data.email);
  if (!user) {
    registerFailedAttempt(req);
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const valid = await bcrypt.compare(parsed.data.password, user.passwordHash);
  if (!valid) {
    registerFailedAttempt(req);
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  loginAttempts.delete(getClientKey(req));

  const safeUser = { id: user.id, name: user.name, email: user.email, role: user.role };
  const sessionId = createSessionId();

  writeAuditLog({ actor: user.email, action: 'LOGIN_SUCCESS' });
  return res.json({ token: signToken(safeUser), user: safeUser, sessionId });
});

router.post('/logout', requireAuth, (_req, res) => {
  return res.json({ message: 'Logged out' });
});

router.get('/me', requireAuth, (req, res) => {
  return res.json({ user: req.user });
});

export default router;
