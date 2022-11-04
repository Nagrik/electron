import { contextBridge, ipcRenderer } from 'electron';

// export type Channels = 'ipc-example';

contextBridge.exposeInMainWorld('api', {
  removeAllListeners(channel: string) {
    ipcRenderer.removeAllListeners(channel);
  },

  setUrl(url: string) {
    ipcRenderer.send('setUrl', url);
  },

  getUrl() {
    ipcRenderer.send('getUrl');
    return new Promise((resolve) => {
      ipcRenderer.once('getUrl', (event, url: string) => {
        resolve(url);
      });
    });
  },

  suppliers: {
    getSupplier(id: string) {
      ipcRenderer.send('getSupplier', id);

      return new Promise((resolve) => {
        ipcRenderer.once('getSupplier', (event, data) => {
          return resolve(data);
        });
      });
    },
    getSupplierPage(page: number) {
      ipcRenderer.send('getSupplierPage', page);

      return new Promise((resolve) => {
        ipcRenderer.once('getSupplierPage', (event, data) => {
          return resolve(data);
        });
      });
    },
  },

  customers: {
    getCustomer(id: string) {
      ipcRenderer.send('getCustomer', id);

      return new Promise((resolve) => {
        ipcRenderer.once('getCustomer', (event, data) => {
          return resolve(data);
        });
      });
    },
    getCustomerPage(page: number) {
      ipcRenderer.send('getCustomerPage', page);

      return new Promise((resolve) => {
        ipcRenderer.once('getCustomerPage', (event, data) => {
          return resolve(data);
        });
      });
    },
    searchCustomer(search: string) {
      ipcRenderer.send('searchCustomer', search);

      return new Promise((resolve) => {
        ipcRenderer.once('searchCustomer', (event, data) => {
          return resolve(data);
        });
      });
    },
  },

  products: {
    getProduct(id: string) {
      ipcRenderer.send('getProduct', id);

      return new Promise((resolve) => {
        ipcRenderer.once('getProduct', (event, data) => {
          return resolve(data);
        });
      });
    },
    getProductPage(page: number) {
      ipcRenderer.send('getProductPage', page);

      return new Promise((resolve) => {
        ipcRenderer.once('getProductPage', (event, data) => {
          return resolve(data);
        });
      });
    },
    searchProduct(search: string) {
      ipcRenderer.send('searchProduct', search);

      return new Promise((resolve) => {
        ipcRenderer.once('searchProduct', (event, data) => {
          return resolve(data);
        });
      });
    },
  },

  employees: {
    getEmployee(id: string) {
      ipcRenderer.send('getEmployee', id);

      return new Promise((resolve) => {
        ipcRenderer.once('getEmployee', (event, data) => {
          return resolve(data);
        });
      });
    },
    getEmployeePage(page: number) {
      ipcRenderer.send('getEmployeePage', page);

      return new Promise((resolve) => {
        ipcRenderer.once('getEmployeePage', (event, data) => {
          return resolve(data);
        });
      });
    },
  },

  orders: {
    getOrder(id: string) {
      ipcRenderer.send('getOrder', id);

      return new Promise((resolve) => {
        ipcRenderer.once('getOrder', (event, data) => {
          return resolve(data);
        });
      });
    },
    getOrderPage(page: number) {
      ipcRenderer.send('getOrderPage', page);

      return new Promise((resolve) => {
        ipcRenderer.once('getOrderPage', (event, data) => {
          return resolve(data);
        });
      });
    },
  },
});
