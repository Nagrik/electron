import { ipcMain } from 'electron';
import customerService from '../services/customers.service';

ipcMain.on('getCustomer', async (event, id: string) => {
  const data = await customerService.getCustomerInfo(id);
  event.reply('getCustomer', data);
});

ipcMain.on('getCustomerPage', async (event, page: number) => {
  const data = await customerService.getCustomersPage(page);
  event.reply('getCustomerPage', data);
});

ipcMain.on('searchCustomer', async (event, search: string) => {
  const data = await customerService.search(search);
  event.reply('searchCustomer', data);
});
