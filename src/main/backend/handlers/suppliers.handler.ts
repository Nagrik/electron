import { ipcMain } from 'electron';
import supplierService from '../services/suppliers.service';

ipcMain.on('getSupplier', async (event, id: string) => {
  const data = await supplierService.getSupplierInfo(id);
  event.reply('getSupplier', data);
});

ipcMain.on('getSupplierPage', async (event, page: number) => {
  const data = await supplierService.getSuppliersPage(page);
  event.reply('getSupplierPage', data);
});
