// import { Supplier } from './backend/db/schema';

import { SupplierType } from './Supplier';

// import { channels } from './backend/IPC/channels';
declare global {
  interface Window {
    api: {
      ipcRenderer: {
        send(channel: string, arg: string): void;
        on(
          channel: string,
          func: (...args: unknown[]) => void
        ): (() => void) | undefined;
        once(channel: string, func: (...args: unknown[]) => void): void;
        getSupplier(id: string): Promise<SupplierType>;
        removeAllListeners(channel: string): void;
      };
    };
  }
}

export {};
