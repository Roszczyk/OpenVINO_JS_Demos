// const fs = require('node:fs').promises;
// const path = require('node:path');

// const { cv } = require('opencv-wasm');

const { getImageData } = require('./helpers');

module.exports = { runModel }

async function runModel(modelPath, imagePath, deviceName) {
    //----------------- Step 1. Initialize OpenVINO Runtime Core -----------------
    const core = new ov.Core();
  
    //----------------- Step 2. Read a model -------------------------------------
    const model = await core.readModel(modelPath);
  
    if (model.inputs.length !== 1)
      throw new Error('Sample supports only single input topologies');
  
    if (model.outputs.length !== 1)
      throw new Error('Sample supports only single output topologies');
  
    //----------------- Step 3. Set up input -------------------------------------
    // Read input image
    const imgData = await getImageData(imagePath);
  
    // Use opencv-wasm to preprocess image.
    const originalImage = cv.matFromImageData(imgData);
    const image = new cv.Mat();
    // The MobileNet model expects images in RGB format.
    cv.cvtColor(originalImage, image, cv.COLOR_RGBA2RGB);
  
    const tensorData = new Float32Array(image.data);
    const shape = [1, image.rows, image.cols, 3];
    const inputTensor = new ov.Tensor(ov.element.f32, shape, tensorData);
  
    //----------------- Step 4. Apply preprocessing ------------------------------
    const _ppp = new ov.preprocess.PrePostProcessor(model);
    _ppp.input().tensor().setShape(shape).setLayout('NHWC');
    _ppp.input().preprocess().resize(ov.preprocess.resizeAlgorithm.RESIZE_LINEAR);
    _ppp.input().model().setLayout('NCHW');
    _ppp.output().tensor().setElementType(ov.element.f32);
    _ppp.build();
  
    //----------------- Step 5. Loading model to the device ----------------------
    const compiledModel = await core.compileModel(model, deviceName);
  
    //---------------- Step 6. Create infer request and do inference synchronously
    const inferRequest = compiledModel.createInferRequest();
    inferRequest.setInputTensor(inputTensor);
  
    const startTime = performance.now()
    inferRequest.infer();
    const endTime = performance.now()
  
    const inferenceTime = endTime - startTime
  
    //----------------- Step 7. Process output -----------------------------------
    const outputLayer = compiledModel.outputs[0];
    const resultInfer = inferRequest.getTensor(outputLayer);
    const predictions = Array.from(resultInfer.data)
      .map((prediction, classId) => ({ prediction, classId }))
      .sort(({ prediction: predictionA }, { prediction: predictionB }) =>
        predictionA === predictionB ? 0 : predictionA > predictionB ? -1 : 1);
  
    console.log('Top 10 results:');
    console.log('class_id probability');
    console.log('--------------------');
    predictions.slice(0, 10).forEach(({ classId, prediction }) =>
      console.log(`${classId}\t ${prediction.toFixed(7)}`),
    );
  
    console.log(`INFERENCE TIME: ${inferenceTime.toFixed(2)} ms`)
    const topPrediction = predictions[0];
  
    return {
      topPrediction: topPrediction.prediction.toFixed(7),
      classId: topPrediction.classId,
      inferenceTime: inferenceTime.toFixed(2)
    };
  }