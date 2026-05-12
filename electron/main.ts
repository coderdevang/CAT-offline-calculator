import { app, BrowserWindow, ipcMain, shell } from "electron";
import { join } from "node:path";
const isDev = Boolean(process.env.VITE_DEV_SERVER_URL);

let mainWindow: BrowserWindow | null = null;

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 225,
    height: 324,
    minWidth: 225,
    minHeight: 324,
    resizable: false,
    useContentSize: true,
    maximizable: false,
    minimizable: true,
    alwaysOnTop: true,
    frame: false,
    transparent: false,
    backgroundColor: "#dadada",
    show: false,
    skipTaskbar: false,
    title: "CAT On-Screen Calculator 2026",
    autoHideMenuBar: true,
    icon: join(__dirname, "../build/icon.ico"),
    webPreferences: {
      preload: join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  });

  mainWindow.setMenuBarVisibility(false);

  mainWindow.once("ready-to-show", () => {
    mainWindow?.show();
    mainWindow?.focus();
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url).catch(() => undefined);
    return { action: "deny" };
  });

  if (isDev && process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
    mainWindow.webContents.openDevTools({ mode: "detach" });
  } else {
    mainWindow.loadFile(join(__dirname, "../dist/src/index.html"));
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.handle("window:minimize", () => {
  mainWindow?.minimize();
});

ipcMain.handle("window:close", () => {
  mainWindow?.close();
});

ipcMain.handle("window:toggle-always-on-top", () => {
  if (!mainWindow) return false;

  const nextValue = !mainWindow.isAlwaysOnTop();
  mainWindow.setAlwaysOnTop(nextValue, "floating");
  return nextValue;
});

ipcMain.handle("window:is-always-on-top", () => {
  return mainWindow?.isAlwaysOnTop() ?? false;
});

ipcMain.handle("window:resize-to-content", (_event, width: number, height: number) => {
  if (!mainWindow) return;

  const safeWidth = Math.max(225, Math.min(225, Math.ceil(width)));
  const safeHeight = Math.max(324, Math.min(324, Math.ceil(height)));
  mainWindow.setContentSize(safeWidth, safeHeight);
  mainWindow.setMinimumSize(safeWidth, safeHeight);
  mainWindow.setMaximumSize(safeWidth, safeHeight);
});
