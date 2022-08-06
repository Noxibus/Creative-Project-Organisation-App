/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
import { View, Text, StyleSheet } from "react-native";
import GalleryList from "../../components/functional/AssetsComponents/GalleryList";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddAsset from "./AddAsset";
import AssetDetails from "./AssetDetails";
import AllAssets from "./AllAssets";
import { IconButton } from "../../components/functional/ui/IconButton";

const Stack = createNativeStackNavigator();

//output asset image gallery
function AssetsOverview() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AllAssets"
        component={AllAssets}
        title="All Assets"
        options={{
          title: "All Assets",
        }}
      />
      <Stack.Screen
        name="AddAsset"
        component={AddAsset}
        options={{ title: "Add New Asset" }}
      />
      <Stack.Screen
        name="AssetDetails"
        component={AssetDetails}
        options={{ title: "Details" }}
      />
    </Stack.Navigator>
  );
}

export default AssetsOverview;

const styles = StyleSheet.create({});

//<View>
{
  /* <GalleryList />
<Text>Hello</Text>
</View> */
}
