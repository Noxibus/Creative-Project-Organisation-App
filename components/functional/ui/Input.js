import { Text, View, TextInput, StyleSheet } from "react-native";
import { GlobalStyles } from "../../../util/constants/styles";

//this component takes an object of keyboard properties as a prop
function Input({ label, invalid, style, textInputConfig }) {
  const inputStyles = [styles.input];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }
  if (invalid) {
    inputStyles.push(styles.invalidInput);
  }
  return (
    //using an array of styles, merging style with incoming style via props
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.title, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    marginBottom: 4,
    fontWeight: "bold",
    marginRight: 6,
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  input: {
    color: "black",
    backgroundColor: GlobalStyles.colors.brightOrange,
    padding: 6,
    fontSize: 16,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
    backgroundColor: "white",
  },
  invalidLabel: {
    color: GlobalStyles.colors.errorRed,
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.errorRed,
    opacity: 0.5,
  },
});
