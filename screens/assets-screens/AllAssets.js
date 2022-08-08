/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  View,
  Image,
  Button,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import GalleryList from "../../components/functional/AssetsComponents/GalleryList";
import { GlobalStyles } from "../../util/constants/styles";
import Asset from "./Asset";
import IconButton from "../../components/functional/ui/IconButton";

//TODO: CENTRALISE IMAGE STATE
const Images = [
  { uri: require("./image1.jpg") },
  { uri: require("./image2.jpg") },
  { uri: require("./image3.jpg") },
  { uri: require("./image4.jpg") },
  { uri: require("./image5.jpg") },
  { uri: require("./image1.jpg") },
  { uri: require("./image2.jpg") },
  { uri: require("./image3.jpg") },
  { uri: require("./image4.jpg") },
  { uri: require("./image5.jpg") },
  { uri: require("./image1.jpg") },
  { uri: require("./image2.jpg") },
  { uri: require("./image3.jpg") },
  { uri: require("./image4.jpg") },
  { uri: require("./image5.jpg") },
];

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width - 20;
// const imageData = [
//   { key: "img1", title: "Image1", uri: "./image1.jpg" },
//   { key: "img1", title: "Image2", uri: "./image2.jpg" },
//   { key: "img1", title: "Image3", uri: "./image3.jpg" },
//   { key: "img1", title: "Image4", uri: "./image4.jpg" },
//   { key: "img1", title: "Image5", uri: "./image5.jpg" },
// ];

function AllAssets({ route, navigation }) {
  const [loadedAssets, setLoadedAssets] = useState([]);
  //returns bool
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && route.params) {
      setLoadedAssets((curAssets) => [...curAssets, route.params.asset]);
    }
  }, [isFocused, route]);

  function renderImage(itemData) {
    return <Image source={itemData.item} />;
  }

  return (
    <ScrollView>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {Images.map((image, index) => (
          <TouchableOpacity key={index} onPress={() => {}}>
            <Image source={image.uri} style={styles.imageDimesions} />
          </TouchableOpacity>
        ))}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          <Image source={Images.image1} style={styles.imageDimesions} />

          {/* <FlatList>
        data={imageData}
        renderItem={({ item }) => <Asset asset={item} />}
      </FlatList> */}
          {/* <View style={styles.alignItems}>
        <Image style={styles.imageDimesions} source={images.image1} />
        <Image style={styles.imageDimesions} source={images.image2} />
        <Image style={styles.imageDimesions} source={images.image3} />
        <Image style={styles.imageDimesions} source={images.image4} />
        <Image style={styles.imageDimesions} source={images.image5} />
      </View> */}
          {/* <GalleryList assets={loadedAssets} /> */}
        </View>
        <View style={styles.buttonContainer}>
          <IconButton
            icon="add-circle"
            size={50}
            color={GlobalStyles.colors.orange100}
            //TODO: ADD TASK FUNCTIONALITY,  FIX MODAL VIEW
            onPress={() => {
              {
                GlobalStyles.colors.orange100;
              }
              navigation.navigate("AddAsset", route.params);
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
}

export default AllAssets;

const styles = StyleSheet.create({
  imageDimesions: {
    height: deviceHeight / 5,
    width: deviceWidth / 3,
    borderRadius: 10,
    margin: 2,
  },
  imageContainer: {
    flexDirection: "row",
    flex: 1,
  },
  buttonContainer: {
    alignItems: "center",
    margin: 22,
  },
});
