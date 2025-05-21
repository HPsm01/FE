import { Camera, CameraType } from 'expo-camera';
import { useEffect, useState, useRef } from "react";
import { AppState, Pressable, Text, View, StyleSheet, Alert, Platform } from "react-native";
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

export default function ExercisePaper() {
  const [type, setType] = useState(CameraType.back);
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        // 카메라 권한 요청
        const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
        console.log('Camera permission status:', cameraStatus);

        // 오디오 권한 요청
        const { status: audioStatus } = await Camera.requestMicrophonePermissionsAsync();
        console.log('Audio permission status:', audioStatus);

        // 미디어 라이브러리 권한 요청
        const { status: mediaStatus } = await MediaLibrary.requestPermissionsAsync();
        console.log('Media library permission status:', mediaStatus);

        // 이미지 피커 권한 요청
        const { status: imagePickerStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        console.log('Image picker permission status:', imagePickerStatus);

        setHasPermission(
          cameraStatus === 'granted' &&
          audioStatus === 'granted' &&
          mediaStatus === 'granted' &&
          imagePickerStatus === 'granted'
        );
      } catch (error) {
        console.error('Permission request error:', error);
        Alert.alert('권한 오류', '권한을 요청하는 중 문제가 발생했습니다.');
      }
    })();

    const appStateListener = AppState.addEventListener(
      "change",
      async (state) => {
        console.log(`App state: ${state}`);
        if (state === "active") {
          // 앱이 활성화될 때 권한 다시 확인
          const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
          const { status: audioStatus } = await Camera.requestMicrophonePermissionsAsync();
          const { status: mediaStatus } = await MediaLibrary.requestPermissionsAsync();
          const { status: imagePickerStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();

          setHasPermission(
            cameraStatus === 'granted' &&
            audioStatus === 'granted' &&
            mediaStatus === 'granted' &&
            imagePickerStatus === 'granted'
          );
        }
      }
    );

    return () => {
      appStateListener.remove();
    };
  }, []);

  const pickVideo = async () => {
    try {
      // 권한 재확인
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('권한 필요', '갤러리 접근 권한이 필요합니다.');
        return;
      }

      // 비디오 선택
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        quality: 1,
        videoQuality: 1,
      });

      console.log('Picker result:', result);

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const videoAsset = result.assets[0];
        await uploadVideo(videoAsset);
      }
    } catch (err) {
      console.error('비디오 선택 오류:', err);
      Alert.alert('오류', '비디오를 선택하는 중 문제가 발생했습니다.');
    }
  };

  const uploadVideo = async (videoAsset) => {
    try {
      console.log('Uploading video:', videoAsset);
      const formData = new FormData();
      
      // 안드로이드의 경우 file:// URI를 처리
      const uri = Platform.OS === 'android' ? videoAsset.uri : videoAsset.uri.replace('file://', '');
      
      formData.append('video', {
        uri: uri,
        type: 'video/mp4',
        name: 'video.mp4'
      });

      const response = await fetch('http://13.209.67.129:8000/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Upload response status:', response.status);

      if (response.ok) {
        Alert.alert('성공', '비디오가 성공적으로 업로드되었습니다.');
      } else {
        const errorData = await response.text();
        console.error('서버 응답:', errorData);
        throw new Error('업로드 실패');
      }
    } catch (error) {
      console.error('업로드 오류:', error);
      Alert.alert('오류', '비디오 업로드 중 문제가 발생했습니다.');
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>권한을 확인하는 중입니다...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>카메라 및 미디어 라이브러리 권한이 필요합니다.</Text>
        <Pressable
          onPress={async () => {
            try {
              const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
              const { status: audioStatus } = await Camera.requestMicrophonePermissionsAsync();
              const { status: mediaStatus } = await MediaLibrary.requestPermissionsAsync();
              const { status: imagePickerStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();

              setHasPermission(
                cameraStatus === 'granted' &&
                audioStatus === 'granted' &&
                mediaStatus === 'granted' &&
                imagePickerStatus === 'granted'
              );
            } catch (error) {
              console.error('Permission request error:', error);
              Alert.alert('권한 오류', '권한을 요청하는 중 문제가 발생했습니다.');
            }
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>권한 요청</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera 
        ref={cameraRef}
        style={styles.camera} 
        type={type}
      >
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.button}
            onPress={() => {
              setType(type === CameraType.back ? CameraType.front : CameraType.back);
            }}>
            <Text style={styles.buttonText}>카메라 전환</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={pickVideo}>
            <Text style={styles.buttonText}>갤러리에서 선택</Text>
          </Pressable>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  }
});