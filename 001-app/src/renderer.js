document.addEventListener('DOMContentLoaded', () => {
  const toggleWebcamButton = document.getElementById('toggleWebcamButton');
  const webcamElement = document.getElementById('webcam');
  let webcamStream = null;

  toggleWebcamButton.addEventListener('click', () => {
    if (webcamStream) {
      stopWebcam();
    } else {
      startWebcam();
    }
  });

  function startWebcam() {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        webcamElement.srcObject = stream;
        webcamStream = stream;
        toggleWebcamButton.textContent = 'Stop Webcam';
      })
      .catch(error => {
        console.error('Error accessing webcam:', error);
      });
  }

  function stopWebcam() {
    webcamStream.getTracks().forEach(track => track.stop());
    webcamElement.srcObject = null;
    webcamStream = null;
    toggleWebcamButton.textContent = 'Start Webcam';
  }
});
