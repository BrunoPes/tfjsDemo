import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Button,
  Text,
  Alert,
  ActivityIndicator,
  Modal,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {Camera} from 'expo-camera';

import * as tf from '@tensorflow/tfjs';
import classifyImage, {getModel} from './helper';

const CameraFinder = (props) => {
  let cameraRef = null;
  const [model, setModel] = useState(null);
  const [isTfReady, setIsTfReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    const load = async () => {
      await tf.ready();
      setIsTfReady(true);
      const model = await getModel();
      setModel(model);
      console.log('Model load: ', model);
    };
    load();
    onCamReady();
  }, []);

  const onCamReady = async () => {
    const {granted} = await Camera.requestPermissionsAsync();
    setHasPermission(granted === true);
  };

  const takePicture = async () => {
    if (cameraRef && isTfReady && hasPermission && model) {
      setIsLoading(true);
      const photo = await cameraRef.takePictureAsync();
      const prediction = await classifyImage(model, photo);
      setIsLoading(false);
      const {className, probability} = prediction || {};
      if (className && probability) {
        const predictionLabel = `This is "${className}" with a chance of ${parseFloat(
          probability * 100,
        ).toFixed(3)}%!!`;
        return Alert.alert('Prediction Result!', predictionLabel);
      } else {
        return Alert.alert('Something gone wrong :(', 'Please, try again!');
      }
    }
  };

  return (
    <View style={{flex: 1}}>
      <Camera
        onCameraReady={() => console.log('Android Camera is Ready!')}
        // captureAudio={false}
        ref={(ref) => (cameraRef = ref)}
        style={styles.preview}
        type={Camera.Constants.Type.back}
        flashMode={Camera.Constants.FlashMode.off}
      />
      <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
        <TouchableOpacity
          disabled={isLoading}
          onPress={takePicture}
          style={styles.capture}>
          <Text style={{fontSize: 14, color: '#fff', textAlign: 'center'}}>
            {!isLoading ? 'SHOT' : 'Processing...'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    borderRadius: 5,
    padding: 15,
    marginHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
    width: '90%',
    backgroundColor: 'rgb(76, 148, 98)',
  },
});

export default CameraFinder;
