import fs from "fs";
import {
  app,
  BrowserWindow,
  dialog,
  ipcMain,
  IpcMainInvokeEvent,
  Menu,
} from "electron";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = (): void => {
  const mainWindow = new BrowserWindow({
    height: 650,
    width: 800,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  Menu.setApplicationMenu(null);
};

async function handleFileOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog({});
  if (!canceled) {
    return await fs.promises.readFile(filePaths[0], "utf-8");
  }
}

async function handleSaveFile(event: IpcMainInvokeEvent, ...args: any[]) {
  const content = args[0];
  const { canceled, filePath } = await dialog.showSaveDialog({});
  if (!canceled) {
    await fs.promises.writeFile(filePath, content);
  }
}

app.whenReady().then(() => {
  ipcMain.handle("dialog:openFile", handleFileOpen);
  ipcMain.handle("dialog:saveFile", handleSaveFile);
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
