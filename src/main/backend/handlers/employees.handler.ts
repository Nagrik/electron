import { ipcMain } from 'electron';
import employeeService from '../services/employees.service';

ipcMain.on('getEmployee', async (event, id: string) => {
  const data = await employeeService.getEmployeeInfo(id);
  event.reply('getEmployee', data);
});

ipcMain.on('getEmployeePage', async (event, page: number) => {
  const data = await employeeService.getEmployeePage(page);
  event.reply('getEmployeePage', data);
});
