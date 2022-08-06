import { Pressable, View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../../util/constants/styles";

function CustomButton({ children, onPress, mode, style }) {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={[styles.button, mode === "flat" && styles.flat]}>
          <Text style={[styles.buttonText, mode === "flat" && styles.flatText]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,
    //TODO: I want to be able to pass colour props to this
    backgroundColor: GlobalStyles.colors.midGrey,
  },
  flat: {
    backgroundColor: GlobalStyles.colors.errorRed,

    borderRadius: 4,
  },
  buttonText: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
  flatText: {
    color: "white",
    fontSize: 20,
  },
  pressed: {
    opacity: 0.75,
    borderRadius: 4,
  },
});
