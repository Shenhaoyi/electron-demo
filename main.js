const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const path = require('node:path');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // preload 的资源
    },
  });

  win.loadFile('index.html');
};

async function handleFileOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog({});
  if (!canceled) {
    return filePaths[0];
  }
}

app.whenReady().then(() => {
  createWindow();

  // macOS 平台，当单击dock图标时，如果没有窗口则重新创建窗口
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  ipcMain.handle('dialog:openFile', handleFileOpen);
});
// macOS 以外的平台，当所有窗口关闭时，退出应用
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
