import { ipcMain } from 'electron';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

type Shared = {
  connection: Pool | null;
};

const shared: Shared = {
  connection: new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  }),
};

ipcMain.on('setDB', (event, dbUrl: string) => {
  shared.connection = new Pool({
    connectionString: dbUrl,
    ssl: {
      rejectUnauthorized: false,
    },
  });
});

export default shared;

require('./handlers/suppliers.handler');
require('./handlers/customers.handler');
require('./handlers/products.handler');
require('./handlers/employees.handler');
require('./handlers/orders.handler');
