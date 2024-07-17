const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
    }
  });

  mainWindow.loadFile('src/index.html');
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on('save-photo', (event, buffer) => {
  console.log('Received photo buffer to save.');

  const directory = path.join(__dirname, 'photos');
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
  }

  let photoNumber = 1;
  let filePath = path.join(directory, `photo_${photoNumber}.png`);
  while (fs.existsSync(filePath)) {
    photoNumber++;
    filePath = path.join(directory, `photo_${photoNumber}.png`);
  }

  fs.writeFile(filePath, buffer, (err) => {
    if (err) {
      console.error('Error saving photo:', err);
    } else {
      console.log(`Photo saved: ${filePath}`);
    }
  });
});