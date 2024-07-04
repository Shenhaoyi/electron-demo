const { app, BrowserWindow } = require('electron');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  win.loadFile('index.html');
};

app.whenReady().then(() => {
  createWindow();

  // macOS 平台，当单击dock图标时，如果没有窗口则重新创建窗口
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
// macOS 以外的平台，当所有窗口关闭时，退出应用
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
