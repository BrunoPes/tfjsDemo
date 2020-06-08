import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { fetch, decodeJpeg } from '@tensorflow/tfjs-react-native';

const mobileNetModelURI =
  'https://storage.googleapis.com/tfjs-models/savedmodel/mobilenet_v2_1.0_224/model.json';
const irisModelURI =
  'https://storage.googleapis.com/tfjs-models/tfjs/iris_v1/model.json';


const atob = (input) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  let str = input.replace(/=+$/, '');
  let output = '';

  if (str.length % 4 == 1) {
    throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
  }
  for (let bc = 0, bs = 0, buffer, i = 0;
    buffer = str.charAt(i++);

    ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
      bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
  ) {
    buffer = chars.indexOf(buffer);
  }

  return output;
}

const base64ToUint8Array = (string) => {
  const raw = atob(string);
  const rawLength = raw.length;
  const array = new Uint8Array(new ArrayBuffer(rawLength));
  for (let i = 0; i < rawLength; i += 1) {
    array[i] = raw.charCodeAt(i);
  }
  return array;
}

const classifyImage = async (imgObj) => {
  const { uri, data, base64 } = imgObj;

  const model = await mobilenet.load();
  // const model = await tf.loadLayersModel(mobileNetModelURI);

  const int8Arr = base64ToUint8Array(base64);

  // const response = await fetch(imgUri, {}, { isBinary: true });
  // const imageData = await response.arrayBuffer();
  const imageTensor = decodeJpeg(int8Arr);
  console.log('B64: ', base64, imageTensor);
  console.log('TF: ', imageTensor.shape);
  const predictResults = await model.classify(imageTensor);
  console.log('PResults: ', predictResults[0]);
  // const prediction = predictResults[0];

  // return prediction;
};

export default classifyImage;
