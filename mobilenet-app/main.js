const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const { runModel, detectDevices } = require('./jobs');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
        preload: path.join(__dirname, 'preload.js')
    }
});

    win.loadFile('index.html');
}

app.on('ready', createWindow);

ipcMain.handle('open-file-dialog', async () => {
    const result = await dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [{ name: 'Images', extensions: ['jpg', 'png', 'jpeg'] }]
    });
    return result.filePaths[0];
});

ipcMain.handle('run-model', async(event, imagePath, deviceName) => {
    const modelPath = path.join(__dirname, 'models', 'mobilenet-ssd.xml');
    const result = runModel(modelPath, imagePath, deviceName);
    return result;
});

ipcMain.handle('detect-devices', async () => {
    const devices = detectDevices();
    return devices;
});
