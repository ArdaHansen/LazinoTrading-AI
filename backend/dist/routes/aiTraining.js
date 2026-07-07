import { Router } from 'express';
import { z } from 'zod';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { writeAuditLog } from '../services/auditLog.js';
const router = Router();
router.use(requireAuth);
const datasets = [];
const datasetSchema = z.object({ name: z.string().min(2), description: z.string().min(5) });
router.get('/datasets', (_req, res) => {
    res.json({ datasets });
});
router.post('/datasets', requireRole('admin'), (req, res) => {
    const parsed = datasetSchema.safeParse(req.body);
    if (!parsed.success)
        return res.status(400).json({ message: 'Invalid dataset' });
    const dataset = { id: `ds_${crypto.randomUUID()}`, createdAt: new Date().toISOString(), ...parsed.data };
    datasets.unshift(dataset);
    writeAuditLog({ actor: req.user.email, action: 'DATASET_CREATED', metadata: dataset });
    res.status(201).json({ dataset });
});
router.post('/start', requireRole('admin'), (req, res) => {
    writeAuditLog({ actor: req.user.email, action: 'AI_TRAINING_STARTED' });
    res.json({ status: 'queued', message: 'AI training placeholder queued for future Python worker integration.' });
});
export default router;
