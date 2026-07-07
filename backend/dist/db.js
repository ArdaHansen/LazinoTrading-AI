import 'dotenv/config';
import { Pool } from 'pg';
const connectionString = process.env.DATABASE_URL;
export const pool = connectionString
    ? new Pool({ connectionString })
    : null;
export async function testDatabaseConnection() {
    if (!pool) {
        return 'not-configured';
    }
    try {
        await pool.query('SELECT 1');
        return 'connected';
    }
    catch {
        return 'error';
    }
}
