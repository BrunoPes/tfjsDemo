import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {Camera} from 'expo-camera';

import * as tf from '@tensorflow/tfjs';
import classifyImage from './helper';

const CameraFinder = (props) => {
  let cameraRef = null;
  const [isTfReady, setIsTfReady] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    const load = async () => {
      await tf.ready();
      setIsTfReady(true);
    };
    load();
    onCamReady();
  }, []);

  const onCamReady = async () => {
    console.log('TEST: ');
    const {granted} = await Camera.requestPermissionsAsync();
    setHasPermission(granted === true);
  };

  const takePicture = async () => {
    if (cameraRef && isTfReady && hasPermission) {
      const photo = await cameraRef.takePictureAsync();
      console.log('PHOTO IS:', photo);
      classifyImage(photo);
    }
  };

  return (
    <View style={{flex: 1}}>
      <Camera
        onCameraReady={(res) => console.log('Ready: ', res)}
        // captureAudio={false}
        ref={(ref) => (cameraRef = ref)}
        style={styles.preview}
        type={Camera.Constants.Type.back}
        flashMode={Camera.Constants.FlashMode.off}
      />
      <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
        <TouchableOpacity onPress={takePicture} style={styles.capture}>
          <Text style={{fontSize: 14}}>Take Picture</Text>
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
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

export default CameraFinder;
