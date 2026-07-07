import { verifyToken } from '../auth/jwt.js';
export function requireAuth(req, res, next) {
    const header = req.headers.authorization;
    if (!header?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = header.slice(7);
    if (!token || token.length < 20) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        req.user = verifyToken(token);
        return next();
    }
    catch {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
}
export function requireRole(role) {
    return (req, res, next) => {
        if (req.user?.role !== role) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        return next();
    };
}
