document.addEventListener('DOMContentLoaded', () => {
  const toggleWebcamButton = document.getElementById('toggleWebcamButton');
  const webcamElement = document.getElementById('webcam');
  let webcamStream = null;
  const toggleWebcamButton2 = document.getElementById('toggleWebcamButton2');
  const webcamElement2 = document.getElementById('webcam2');
  let webcamStream2 = null;

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

  function startWebcam(videoElement, onStreamReady) {
    navigator.mediaDevices.getUserMedia({ video: true })
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
});


