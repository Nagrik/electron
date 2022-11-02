import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export default (url?: string) => {
  return new Pool({
    connectionString: url || process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
};
