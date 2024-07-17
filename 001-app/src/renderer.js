// const { contextBridge, ipcRenderer } = require('electron');

// contextBridge.exposeInMainWorld('electron', {
//   ipcRenderer: ipcRenderer
// });

// const { ipcRenderer } = require('electron');

document.addEventListener('DOMContentLoaded', () => {
  const toggleWebcamButton = document.getElementById('toggleWebcamButton');
  const webcamElement = document.getElementById('webcam');
  let webcamStream = null;
  
  const toggleWebcamButton2 = document.getElementById('toggleWebcamButton2');
  const webcamElement2 = document.getElementById('webcam2');
  let webcamStream2 = null;

  const takePhotoButton = document.getElementById('takePhotoButton');
  const takePhotoButton2 = document.getElementById('takePhotoButton2');

  const photoElement1 = document.getElementById('photo1');
  const photoElement2 = document.getElementById('photo2');

  toggleWebcamButton.addEventListener('click', () => {
    if (webcamStream) {
      stopWebcam(webcamElement, webcamStream, toggleWebcamButton, "1");
      webcamStream = null;
    } else {
      startWebcam(webcamElement, stream => {
        webcamStream = stream;
        toggleWebcamButton.textContent = 'Stop Webcam 1';
      });
    }
  });

  toggleWebcamButton2.addEventListener('click', () => {
    if (webcamStream2) {
      stopWebcam(webcamElement2, webcamStream2, toggleWebcamButton2, "2");
      webcamStream2 = null;
    } else {
      startWebcam(webcamElement2, stream => {
        webcamStream2 = stream;
        toggleWebcamButton2.textContent = 'Stop Webcam 2';
      });
    }
  });

  takePhotoButton.addEventListener('click', () => {
    takePhoto(webcamElement, photoElement1);
  });

  takePhotoButton2.addEventListener('click', () => {
    takePhoto(webcamElement2, photoElement2);
  });

  function startWebcam(videoElement, onStreamReady) {
    navigator.mediaDevices.getUserMedia({ video: true , audio : false })
      .then(stream => {
        videoElement.srcObject = stream;
        onStreamReady(stream);
      })
      .catch(error => {
        console.error('Error accessing webcam:', error);
      });
  }

  function stopWebcam(videoElement, stream, buttonElement, number) {
    stream.getTracks().forEach(track => track.stop());
    videoElement.srcObject = null;
    buttonElement.textContent = 'Start Webcam ' + number;
  }

  function takePhoto(videoElement, photoElement) {
    const canvas = document.createElement('canvas');
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(blob => {
      const url = URL.createObjectURL(blob);
      photoElement.src = url;
    }, 'image/png');
  }
});


