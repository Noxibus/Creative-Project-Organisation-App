/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { BottomTabBarHeightCallbackContext } from "@react-navigation/bottom-tabs";
import { View, Text, TextInput, StyleSheet } from "react-native";

import { GlobalStyles } from "../../util/constants/styles";

function AuthInput({
  label,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
}) {
  return (
    <View style={styles.authInputContainer}>
      <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
        {label}
      </Text>
      <TextInput
        //TODO: FIX LIGHT TEXT ON INVALID TEXT BOX
        style={[styles.authInput, isInvalid && styles.authInputInvalid]}
        autoCapitalize="none"
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
      />
    </View>
  );
}

export default AuthInput;

const styles = StyleSheet.create({
  AuthauthInputContainer: {
    marginVertical: 10,
  },
  label: {
    color: "black",
    marginBottom: 10,
    marginTop: 10,
  },
  labelInvalid: {
    color: GlobalStyles.colors.errorRed,
  },
  authInput: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: "white",
    shadowColor: GlobalStyles.colors.midGrey,
    shadowOpacity: 0.75,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
    borderRadius: 4,
    fontSize: 16,
  },
  authInputInvalid: {
    backgroundColor: GlobalStyles.colors.errorRed,
    opacity: 0.25,
  },
});
