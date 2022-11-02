import path from 'path';
import { app, BrowserWindow, shell } from 'electron';
import debug from 'electron-debug';
import install, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import { resolveHtmlPath } from '../../main/util';
import AppUpdater from './AppUpdater';
// import connect from './db/db';

export default class MainWindow {
  public mainWindow: BrowserWindow | null;

  private readonly isDebug: boolean;

  constructor() {
    this.mainWindow = null;
    this.isDebug =
      process.env.NODE_ENV === 'development' ||
      process.env.DEBUG_PROD === 'true';

    if (this.isDebug) {
      debug();
    }
  }

  installExtensions = async () => {
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    const extensions = [REACT_DEVELOPER_TOOLS];

    return install(extensions, forceDownload).catch(console.log);
  };

  createWindow = async () => {
    // console.log(this.isDebug);
    if (this.isDebug) {
      await this.installExtensions();
    }

    const RESOURCES_PATH = app.isPackaged
      ? path.join(process.resourcesPath, 'assets')
      : path.join(__dirname, '../../assets');

    const getAssetPath = (...paths: string[]): string => {
      return path.join(RESOURCES_PATH, ...paths);
    };

    this.mainWindow = new BrowserWindow({
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

    this.mainWindow.loadURL(resolveHtmlPath('index.html'));

    this.mainWindow.on('ready-to-show', () => {
      if (!this.mainWindow) {
        throw new Error('"this.mainWindow" is not defined');
      }
      if (process.env.START_MINIMIZED) {
        this.mainWindow.minimize();
      } else {
        this.mainWindow.show();
      }
    });

    this.mainWindow.on('closed', () => {
      this.mainWindow = null;
    });

    // Open urls in the user's browser
    this.mainWindow.webContents.setWindowOpenHandler((edata) => {
      shell.openExternal(edata.url);
      return { action: 'deny' };
    });

    // Remove this if your app does not use auto updates
    // eslint-disable-next-line
    new AppUpdater();
  };

  // setIpcMain = async (handlers: any[]) => {
  //   handlers.forEach(async (el) => {
  //     await el.initIpcMain(ipcMain, this.mainWindow);
  //   });
  // };

  // initWindow = () => {

  // run = () => {
  // this.initWindow();
  // this.initEventListeners();
  // };
}
