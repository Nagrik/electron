import { ipcMain } from 'electron';
import orderService from '../services/orders.service';

ipcMain.on('getOrder', async (event, id: string) => {
  const data = await orderService.getOrderInfo(id);
  event.reply('getOrder', data);
});

ipcMain.on('getOrderPage', async (event, page: number) => {
  const data = await orderService.getOrderPage(page);
  event.reply('getOrderPage', data);
});
