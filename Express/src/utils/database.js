import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
    connectionString: "postgresql://postgres:AdityA42069chAndrA@db.ophkitxgeobubdciwgpa.supabase.co:5432/postgres",
    ssl: {
        rejectUnauthorized: false
    }
});