import { Router } from 'express';
import { users } from '../auth/users.js';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { getAuditLogs } from '../services/auditLog.js';
const router = Router();
router.use(requireAuth, requireRole('admin'));
router.get('/users', (_req, res) => {
    res.json({ users: users.map(({ passwordHash, ...user }) => user) });
});
router.get('/audit-logs', (_req, res) => {
    res.json({ logs: getAuditLogs() });
});
router.get('/system', (_req, res) => {
    res.json({
        status: 'alpha-online',
        modules: {
            authentication: 'active',
            paperTrading: 'active',
            aiTraining: 'placeholder',
            liveTrading: 'disabled'
        }
    });
});
export default router;
