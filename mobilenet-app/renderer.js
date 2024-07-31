let imagePath = null;

document.getElementById('uploadButton').addEventListener('click', async () => {
    const filePath = await window.electronAPI.openFileDialog();
    if (filePath) {
        //   document.getElementById('imagePath').innerText = filePath;
        imagePath = filePath
        document.getElementById('imagePreview').src = filePath;
    }
});

document.getElementById('infButton').addEventListener('click', async () => {
    document.getElementById('output').style.display = 'none';
    document.getElementById('preoutput').style.display = 'block';
    const device = document.getElementById('deviceSelect').value;
    if (imagePath) {
        // const { output } = await window.electronAPI.runInference(imagePath, device);
        // document.getElementById('output').innerText = output;
        // document.getElementById('preoutput').style.display = 'none';
        // document.getElementById('output').style.display = 'block';

        document.getElementById('imgpath').innerText = imagePath;
        document.getElementById('imgpath').style.display = 'block';
        const { output } = await window.electronAPI.runModel(imagePath, device);
        const text_result = `Class: ${output.classId}\nProbability: ${output.topPrediction} \nInference time: ${output.inferenceTime}`
        document.getElementById('output').innerText = text_result;
        document.getElementById('preoutput').style.display = 'none';
        document.getElementById('output').style.display = 'block';
    }
});