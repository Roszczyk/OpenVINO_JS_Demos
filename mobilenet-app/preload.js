const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  openFileDialog: () => ipcRenderer.invoke('open-file-dialog'),
  runInference: (imagePath, device) => ipcRenderer.invoke('run-inference', imagePath, device),
  ov : ov
});
