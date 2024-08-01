const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    openFileDialog: () => ipcRenderer.invoke('open-file-dialog'),
    runModel: (imagePath, deviceName) => ipcRenderer.invoke('run-model', imagePath, deviceName)
});
