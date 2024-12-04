const { app, BrowserWindow, protocol } = require('electron');
const path = require('path');
const fs = require('fs');
const url = require('url');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      webSecurity: false  // Be cautious with this in production
    }
  });

  // Use a file:// URL to load the HTML
  const htmlPath = url.format({
    pathname: path.join(__dirname, '../renderer/pages/WorkFlowEditorPage.html'),
    protocol: 'file:',
    slashes: true
  });

  mainWindow.loadURL(htmlPath).catch((err) => {
    console.error('Failed to load URL:', err);
  });

  // Open DevTools
  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Intercept and log any loading errors
  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.error('Page failed to load', errorCode, errorDescription);
  });
}

// Disable CORS for local files (use cautiously)
app.whenReady().then(() => {
  protocol.interceptFileProtocol('file', (request, callback) => {
    const url = request.url.substr(8); // strip "file://"
    callback({ path: path.normalize(`${url}`) });
  });
});

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});