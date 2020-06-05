import * as tf from '@tensorflow/tfjs';
import {fetch, decodeJpeg} from '@tensorflow/tfjs-react-native';

const mobileNetModelURI =
  'https://storage.googleapis.com/tfjs-models/savedmodel/mobilenet_v2_1.0_224/model.json';
const irisModelURI =
  'https://storage.googleapis.com/tfjs-models/tfjs/iris_v1/model.json';

const classifyImage = async (imgUri) => {
  const model = await tf.loadLayersModel(irisModelURI);

  const response = await fetch(imgUri, {}, {isBinary: true});
  const imageData = await response.arrayBuffer();
  console.log('Data res: ', response);
  // const imageTensor = decodeJpeg(imageData);

  // const predictResults = await model.predict(imageTensor);
  // const prediction = predictResults[0];

  // console.log('Prediction: ', predictResults, prediction);
  // return prediction;
};

export default classifyImage;
