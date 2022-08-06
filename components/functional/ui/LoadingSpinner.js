import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { GlobalStyles } from "../../../util/constants/styles";

function LoadingSpinner({ message }) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      <ActivityIndicator size="large" color={GlobalStyles.colors.orange100} />
    </View>
  );
}

export default LoadingSpinner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  message: {
    fontSize: 16,
    marginBottom: 12,
    color: "black",
  },
});
