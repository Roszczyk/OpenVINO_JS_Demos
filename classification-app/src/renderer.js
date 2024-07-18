const { ipcRenderer } = require('electron');

const uploadButton = document.getElementById('uploadButton');
const viewButton = document.getElementById('viewButton');
const imageElement = document.getElementById('image');

let uploadedFilePath = null;

uploadButton.addEventListener('click', async () => {
  const result = await ipcRenderer.invoke('open-file-dialog');
  if (!result.canceled && result.filePaths.length > 0) {
    uploadedFilePath = result.filePaths[0];
    viewButton.style.display = 'inline';
  }
});

viewButton.addEventListener('click', () => {
  if (uploadedFilePath) {
    imageElement.src = `file://${uploadedFilePath}`;
    imageElement.style.display = 'block';
  }
});
