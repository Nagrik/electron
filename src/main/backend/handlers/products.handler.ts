import { ipcMain } from 'electron';
import productService from '../services/products.service';

ipcMain.on('getProduct', async (event, id: string) => {
  const data = await productService.getProductInfo(id);
  event.reply('getProduct', data);
});

ipcMain.on('getProductPage', async (event, page: number) => {
  const data = await productService.getProductPage(page);
  event.reply('getProductPage', data);
});

ipcMain.on('searchProduct', async (event, search: string) => {
  const data = await productService.search(search);
  event.reply('searchProduct', data);
});
