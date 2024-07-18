const { contextBridge, ipcRenderer } = require('electron');
// const { addon: ov } = require('openvino-node');
const { performance } = require('perf_hooks');
// const { cv } = require('opencv-wasm');
const { getImageData } = require('./helpers.js');


contextBridge.exposeInMainWorld('electron', {
  selectImage: () => ipcRenderer.invoke('select-image'),
  // ov,
  performance,
  // cv,
  getImageData
});