import { contextBridge, ipcRenderer } from "electron";

export type CatCalculatorApi = {
  minimize: () => Promise<void>;
  close: () => Promise<void>;
  toggleAlwaysOnTop: () => Promise<boolean>;
  isAlwaysOnTop: () => Promise<boolean>;
  resizeToContent: (width: number, height: number) => Promise<void>;
};

const api: CatCalculatorApi = {
  minimize: () => ipcRenderer.invoke("window:minimize"),
  close: () => ipcRenderer.invoke("window:close"),
  toggleAlwaysOnTop: () => ipcRenderer.invoke("window:toggle-always-on-top"),
  isAlwaysOnTop: () => ipcRenderer.invoke("window:is-always-on-top"),
  resizeToContent: (width, height) => ipcRenderer.invoke("window:resize-to-content", width, height)
};

contextBridge.exposeInMainWorld("catCalculator", api);
