import { Router } from 'express';
import { z } from 'zod';
import { requireAuth } from '../middleware/auth.js';
import { writeAuditLog } from '../services/auditLog.js';

const router = Router();
router.use(requireAuth);

interface PaperOrder {
  id: string;
  userId: string;
  symbol: string;
  side: 'buy' | 'sell';
  quantity: number;
  price: number;
  createdAt: string;
}

const orders: PaperOrder[] = [];
const orderSchema = z.object({
  symbol: z.string().min(1).max(12).transform(v => v.toUpperCase()),
  side: z.enum(['buy', 'sell']),
  quantity: z.number().positive(),
  price: z.number().positive()
});

router.get('/orders', (req, res) => {
  res.json({ orders: orders.filter(order => order.userId === req.user!.id) });
});

router.post('/orders', (req, res) => {
  const parsed = orderSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: 'Invalid order' });

  const order: PaperOrder = {
    id: `ord_${crypto.randomUUID()}`,
    userId: req.user!.id,
    createdAt: new Date().toISOString(),
    ...parsed.data
  };

  orders.unshift(order);
  writeAuditLog({ actor: req.user!.email, action: 'PAPER_ORDER_CREATED', metadata: order });
  res.status(201).json({ order });
});

router.get('/portfolio', (req, res) => {
  const ownOrders = orders.filter(order => order.userId === req.user!.id);
  const positions = new Map<string, number>();

  for (const order of ownOrders) {
    const current = positions.get(order.symbol) || 0;
    positions.set(order.symbol, current + (order.side === 'buy' ? order.quantity : -order.quantity));
  }

  res.json({
    cash: 100000,
    currency: 'USD',
    positions: Array.from(positions.entries()).map(([symbol, quantity]) => ({ symbol, quantity }))
  });
});

export default router;
