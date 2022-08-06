/* eslint-disable react/react-in-jsx-scope */
import { View, Text, Image } from "react-native";

function Asset(title, uri) {
  return (
    <View>
      <Text>{title}</Text>
      <Image style={{ width: 150, height: 150 }} source={{ uri: uri }} />
    </View>
  );
}

export default Asset;
