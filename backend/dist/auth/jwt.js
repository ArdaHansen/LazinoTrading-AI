import crypto from 'crypto';
import jwt from 'jsonwebtoken';
const secret = process.env.JWT_SECRET || 'dev_secret_change_me';
export function signToken(user) {
    return jwt.sign(user, secret, { expiresIn: '8h', issuer: 'lazinotrading-ai' });
}
export function verifyToken(token) {
    return jwt.verify(token, secret, { issuer: 'lazinotrading-ai' });
}
export function createSessionId() {
    return crypto.randomBytes(32).toString('hex');
}
