import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { AuthRequestUser } from '../types/user.js';

const secret = process.env.JWT_SECRET || 'dev_secret_change_me';

export function signToken(user: AuthRequestUser) {
  return jwt.sign(user, secret, { expiresIn: '8h', issuer: 'lazinotrading-ai' });
}

export function verifyToken(token: string) {
  return jwt.verify(token, secret, { issuer: 'lazinotrading-ai' }) as AuthRequestUser;
}

export function createSessionId() {
  return crypto.randomBytes(32).toString('hex');
}
