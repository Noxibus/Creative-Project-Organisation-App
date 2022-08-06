/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
//allows us to define an asset

import { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TextInput,
  StyleSheet,
  Button,
} from "react-native";
import { Asset } from "../../../models/asset";
import { GlobalStyles } from "../../../util/constants/styles";
import ImagePicker from "./ImagePicker";

function AssetForm({ onCreateAsset }) {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  function changeTitleHandler(enteredText) {
    setEnteredTitle(enteredText);
  }

  function imageTakenHandler(imageUri) {
    setSelectedImage(imageUri);
  }

  function saveImageHandler() {
    const assetData = new Asset(enteredTitle, selectedImage);
    onCreateAsset(assetData);
  }

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeTitleHandler}
          value={enteredTitle}
        />
      </View>
      <ImagePicker onTakeImage={imageTakenHandler} />
      <Button
        style={styles.button}
        onPress={saveImageHandler}
        title="Add Image"
        color={GlobalStyles.colors.orange100}
      >
        Add Image
      </Button>
    </ScrollView>
  );
}

export default AssetForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 12,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  input: {
    marginVertical: 8,
    padding: 12,
    backgroundColor: "white",
    shadowColor: GlobalStyles.colors.midGrey,
    shadowOffset: { width: 4, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  button: {
    padding: 12,
  },
});
