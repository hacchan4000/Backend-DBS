require('dotenv').config();

export const migrationFileLanguage = 'js';
export const dir = 'migrations';
export const databaseUrl = process.env.DATABASE_URL;