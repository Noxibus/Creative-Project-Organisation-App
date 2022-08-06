/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { View, StyleSheet, Text, FlatList } from "react-native";
import AssetItem from "./AssetItem";

//assets have the same shape defined in the asset class in models folder
function GalleryList({ assets }) {
  //if we have no assets
  if (!assets || assets.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>No assets added yet!</Text>
      </View>
    );
  }
  //item id should be used as key
  return (
    <FlatList
      //passing asset items into flatlist
      data={assets}
      keyExtractor={(item) => item.id}
      //passing data into Asset Item, item will have same structure as defined in model > class
      renderItem={({ item }) => <AssetItem asset={item} />}
    />
  );
}

export default GalleryList;

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
  },
});
