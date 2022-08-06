/* eslint-disable react/react-in-jsx-scope */
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { GlobalStyles } from "../../../util/constants/styles";
import CustomButton from "./CustomButton";

function ErrorIndicator({ message, onConfirm }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An error has occurred.</Text>
      {/* Giving the user some sort of feedback as to what sort of error has occurred */}
      <Text style={styles.text}>{message}</Text>
      <CustomButton onPress={onConfirm}>Close</CustomButton>
    </View>
  );
}

export default ErrorIndicator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  text: {
    textAlign: "center",
    marginBottom: 8,
    color: GlobalStyles.colors.errorRed,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  message: {
    fontSize: 14,
  },
});
