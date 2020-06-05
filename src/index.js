import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {RNCamera} from 'react-native-camera';

import * as tf from '@tensorflow/tfjs';
import classifyImage from './helper';

// const CameraFinder = (props) => {
//   let cameraRef = null;
//   const [isTfReady, setIsTfReady] = useState(false);

//   useEffect(() => {
//     const load = async () => {
//       await tf.ready();
//       setIsTfReady(true);
//     };
//     load();
//   }, []);

//   const takePicture = async () => {
//     if (cameraRef && isTfReady) {
//       const options = {quality: 0.5, base64: true};
//       const data = await cameraRef.takePictureAsync(options);
//       console.log(data.uri);
//       classifyImage(data.uri);
//     }
//   };

//   return (
//     <View style={{flex: 1}}>
//       {/* <RNCamera
//         captureAudio={false}
//         ref={(ref) => (cameraRef = ref)}
//         style={styles.preview}
//         type={RNCamera.Constants.Type.back}
//         flashMode={RNCamera.Constants.FlashMode.on}
//         androidCameraPermissionOptions={{
//           title: 'Permission to use camera',
//           message: 'We need your permission to use your camera',
//           buttonPositive: 'Ok',
//           buttonNegative: 'Cancel',
//         }}
//       /> */}
//       <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
//         <TouchableOpacity onPress={takePicture} style={styles.capture}>
//           <Text style={{fontSize: 14}}>Take Picture</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   preview: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   capture: {
//     flex: 0,
//     backgroundColor: '#fff',
//     borderRadius: 5,
//     padding: 15,
//     paddingHorizontal: 20,
//     alignSelf: 'center',
//     margin: 20,
//   },
// });

const CameraFinder = () => {
  return (
    // <View style={{flex: 1, backgroundColor: 'blue'}} />
    <RNCamera
      // style={styles.preview}
      // ref={(ref) => (cameraRef = ref)}
      captureAudio={false}
      playSoundOnCapture={false}
      // type={RNCamera.Constants.Type.back}
      // flashMode={RNCamera.Constants.FlashMode.on}
      androidCameraPermissionOptions={{
        title: 'Permission to use camera',
        message: 'We need your permission to use your camera',
        buttonPositive: 'Ok',
        buttonNegative: 'Cancel',
      }}
      androidRecordAudioPermissionOptions={{
        title: 'Permission to use audio recording',
        message: 'We need your permission to use your audio',
        buttonPositive: 'Ok',
        buttonNegative: 'Cancel',
      }}
    />
  );
};

export default CameraFinder;
