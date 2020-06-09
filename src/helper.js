import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import {fetch, decodeJpeg} from '@tensorflow/tfjs-react-native';

import RNFS from 'react-native-fs';

export const getModel = async () => {
  const model = await mobilenet.load();
  return model;
};

const mobileNetModelURI =
  'https://storage.googleapis.com/tfjs-models/savedmodel/mobilenet_v2_1.0_224/model.json';
const irisModelURI =
  'https://storage.googleapis.com/tfjs-models/tfjs/iris_v1/model.json';

const atob = (input) => {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  let str = input.replace(/=+$/, '');
  let output = '';

  if (str.length % 4 == 1) {
    throw new Error(
      "'atob' failed: The string to be decoded is not correctly encoded.",
    );
  }
  for (
    let bc = 0, bs = 0, buffer, i = 0;
    (buffer = str.charAt(i++));
    ~buffer && ((bs = bc % 4 ? bs * 64 + buffer : buffer), bc++ % 4)
      ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
      : 0
  ) {
    buffer = chars.indexOf(buffer);
  }

  return output;
};

const base64ToUint8Array = (string) => {
  const raw = atob(string);
  const rawLength = raw.length;
  const array = new Uint8Array(new ArrayBuffer(rawLength));
  for (let i = 0; i < rawLength; i += 1) {
    array[i] = raw.charCodeAt(i);
  }
  return array;
};

const classifyImage = async (model, imgObj) => {
  const {uri, data} = imgObj;

  // const model = await tf.loadLayersModel(mobileNetModelURI);
  // const response = await fetch(uri, {}, {isBinary: true});
  // const imageData = await response.arrayBuffer();

  const base64 = await RNFS.readFile(uri, 'base64');
  const int8Buffer = base64ToUint8Array(base64);
  const imageTensor = decodeJpeg(int8Buffer);
  const predictResults = await model.classify(imageTensor);
  const prediction = predictResults[0];
  console.log('Predictions: ', predictResults);

  return prediction;
};

export default classifyImage;
