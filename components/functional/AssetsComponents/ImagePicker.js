/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
import { Alert, Button, View, Text, Image, StyleSheet } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { useState } from "react";
import IconButton from "../ui/IconButton";
import { GlobalStyles } from "../../../util/constants/styles";

function ImagePicker({ onTakeImage }) {
  //storing state pertaining to image path on device
  const [pickedImage, setPickedImage] = useState();
  //IOS Permissions
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  //function to check if we already have permission to use camera
  //promise returns true/false based on if permission is granted or not
  async function verifyPermissions() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      //async function
      const permissionResponse = await requestPermission();
      //returns true if permission has been granted, false if not
      return permissionResponse.granted;
    }
    //Alert to notify user that they cannot use camera function if access has been denied
    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert("Permission denied, unable to access camera");
      //false = telling function permissions are denied
      return false;
    }
    //return true if permissions have been granted
    return true;
  }

  async function takeImageHandler() {
    //IOS Permissions, returns true: permission granted / false: permission denied
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      //if we don't have permission cancel execution of this function
      return;
    }
    //returns promise, passing in config object
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      //if you don't limit camera quality sometimes image files can become very large
      quality: 0.5,
    });
    setPickedImage(image.uri);
    //passing uri back to AssetForm
    onTakeImage(image.uri);
  }

  let imagePreview = <Text>No images taken yet</Text>;

  if (pickedImage) {
    imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
  }

  return (
    <View>
      <View style={styles.imagepreview}>{imagePreview}</View>
      <View style={styles.button}>
        <IconButton
          icon="camera"
          color={GlobalStyles.colors.orange200}
          size={40}
          onPress={takeImageHandler}
        />
      </View>
    </View>
  );
}

export default ImagePicker;

const styles = StyleSheet.create({
  imagepreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
});
