import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

// export type Channels = 'ipc-example';

contextBridge.exposeInMainWorld('api', {
  ipcRenderer: {
    send(channel: string, arg: string) {
      ipcRenderer.send(channel, arg);
    },
    on(channel: string, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: string, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
    removeAllListeners(channel: string) {
      ipcRenderer.removeAllListeners(channel);
    },
    getSupplier(id: string) {
      // return 1
      // const connection = await connect();
      // console.log(connection);
      // // return 1;
      // const data = await connection.query(
      //   'SELECT * FROM suppliers WHERE suppliers."SupplierID"=$1',
      //   [id]
      // );
      // await connection.end();
      // return data.rows[0];
      ipcRenderer.send('getSupplier', id);
      // return new Promise((resolve) => {
      return new Promise((resolve) =>
        ipcRenderer.once('getSupplier', (event, data) => {
          return resolve(data);
        })
      );
      // );
      // return ipcRenderer.once('getSupplier', (event, data) => {
      //   return data;
      // });
      // });
    },
  },
});
