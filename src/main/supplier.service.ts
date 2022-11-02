import { IpcMainEvent } from 'electron';
import connect from '../renderer/backend/db/db';

export const getSupplier = async (event: IpcMainEvent, id: string) => {
  // const module = await import('../renderer/backend/getSupplier');
  const connection = connect();
  const data = await connection.query(
    'SELECT * FROM suppliers WHERE suppliers."SupplierID"=$1',
    [id]
  );

  event.reply('getSupplier', data.rows[0]);
};

export default {};
