import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';
import paperTradingRoutes from './routes/paperTrading.js';
import aiTrainingRoutes from './routes/aiTraining.js';
import { testDatabaseConnection } from './db.js';
const app = express();
const port = Number(process.env.PORT || process.env.API_PORT || 4000);
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
const allowedOrigins = (process.env.CORS_ORIGIN || `${frontendUrl},http://localhost:3000,http://127.0.0.1:3000`)
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
app.use(helmet());
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
            return;
        }
        callback(null, false);
    },
    credentials: true
}));
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));
app.get('/health', async (_req, res) => {
    const dbStatus = await testDatabaseConnection();
    res.json({
        status: 'ok',
        project: 'LazinoTrading AI',
        database: dbStatus
    });
});
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/paper-trading', paperTradingRoutes);
app.use('/api/ai-training', aiTrainingRoutes);
app.listen(port, () => {
    console.log(`LazinoTrading AI backend running on port ${port}`);
});
