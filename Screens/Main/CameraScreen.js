import React, { useState, useEffect, useRef } from "react";
import { Camera } from "expo-camera";

import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";

import DownloadPhoto from "../../assets/images/downloadPhoto.svg";

const CameraScreen = ({ navigation }) => {
  const [photo, setPhoto] = useState();
  const [location, setLocation] = useState(null);
  const [cameraAllow, setCameraAllow] = useState();
  const [libraryAllow, setLibraryAllow] = useState();

  const camera = useRef();

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Unable to find location");
      }

      
      
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const libraryPermission = await MediaLibrary.requestPermissionsAsync();
      setCameraAllow(cameraPermission.status === "granted");
      setLibraryAllow(libraryPermission.status === "granted");
    })();
  }, []);

  const takePhoto = async () => {
    const newPhoto = await camera.current.takePictureAsync();
    const location = await Location.getCurrentPositionAsync();
    const coords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    setLocation(coords);  
    setPhoto(newPhoto.uri);
  };
  console.log(libraryAllow);
  

  if (photo) {
    const savePhoto = () => {
      navigation.navigate("CreatePosts", { photo, location });
    };

    return (
      <View style={styles.container}>
        <Image style={styles.preview} source={{ uri: photo }} />
        <View style={styles.buttonContainer}>
          {libraryAllow ? (
            <TouchableOpacity
              style={{ ...styles.button, marginRight: 30 }}
              onPress={savePhoto}
            >
              <Text style={styles.textButton}>Save</Text>
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity
            style={styles.button}
            onPress={() => setPhoto(null)}
          >
            <Text style={styles.textButton}>Reshoot</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <Camera ref={camera} style={styles.camera}>
        <TouchableOpacity style={styles.takeButton} onPress={takePhoto}>
          <DownloadPhoto />
        </TouchableOpacity>
      </Camera>
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "grey",
  },

  preview: {
    width: "100%",
    height: "100%",
    flex: 1,
  },

  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 100,
  },
  button: {
    width: 160,
    height: 50,
    padding: 10,
    borderRadius: 12,
    backgroundColor: "white",
    justifyContent: "center",
  },
  textButton: {
    fontSize: 20,
    textAlign: "center",
    color: "black",
  },
  camera: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  takeButton: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginBottom: 20,
  },
});
