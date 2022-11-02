/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, ipcMain, shell } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';

// import { ipcMain } from 'electron';
// import MainWindow from '../renderer/backend/MainWindow';
// import connect from '../renderer/backend/db/db';
import cors from 'cors';
import express, { Request, Response } from 'express';
import connect from '../renderer/backend/db/db';
// import MainWindow from '../renderer/backend/MainWindow';
import { getSupplier } from './supplier.service';
import { resolveHtmlPath } from './util';

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}
// let mainWindow: MainWindow | null = null;

// global.shared = { ipcMain };
// ipcMain.on('getSupplier', getSupplier);
const expressApp = express();

expressApp.use(express.json());
expressApp.use(cors());

expressApp.get('/getSupplier', async (req: Request, res: Response) => {
  const connection = connect();
  const data = await connection.query(
    'SELECT * FROM suppliers WHERE suppliers."SupplierID"=$1',
    [req.query.id]
  );

  res.send(data.rows[0]);
});

expressApp.listen(42500, () => {
  console.log('express is up');
});

// ipcMain.on('getSupplier', async (event, id: string) => {
//   const module = await import('../renderer/backend/getSupplier');
//   const connection = await connect();
//   const data = await connection.query(
//     'SELECT * FROM suppliers WHERE suppliers."SupplierID"=$1',
//     [id]
//   );
//   // console.log(data);
//   await connection.end();
//   // console.log(data.rows[0]);
//   event.reply('getSupplier', data.rows[0]);
// });

let mainWindow: BrowserWindow | null = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  console.log(installer);
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  // const test = new MainWindow();
  // await test.installExtensions();
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

// // // /**
// // //  * Add event listeners...
// // //  */

// app.on('window-all-closed', () => {
//   // Respect the OSX convention of having the application in memory even
//   // after all windows have been closed
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });

// app
//   .whenReady()
//   .then(() => {
//     createWindow();
//     // initListener();
//     app.on('activate', () => {
//       // On macOS it's common to re-create a window in the app when the
//       // dock icon is clicked and there are no other windows open.
//       if (mainWindow === null) createWindow();
//     });
//   })
//   .catch(console.log);

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });

// app
//   .whenReady()
//   .then(() => {
//     createWindow();
//   })
//   .catch(console.log);

// async function createMainWindow() {
//   // const settings = {
//   //     title: "MEMENTO - Svelte, Tailwind, Electron & TypeScript"
//   // };
//   mainWindow = new MainWindow();
//   mainWindow.createWindow();
//   // const urlPage = path.join(__dirname, 'www', 'index.html');
//   // mainWindow.createWindow(urlPage);

//   // await mainWindow.setIpcMain([new GetSupplier()]);

//   // updaterInfo.initAutoUpdater(autoUpdater, mainWindow.window);
// }
app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    // mainWindow = new MainWindow();
    createWindow();
    // initListener();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) {
        // mainWindow = new MainWindow();
        createWindow();
      }
    });
  })
  .catch(console.log);
