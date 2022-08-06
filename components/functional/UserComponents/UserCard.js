/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
import UserAvatar from "./UserAvatar";
import { View, StyleSheet, Text } from "react-native";
import { GlobalStyles } from "../../../util/constants/styles";

function UserCard({ photo, username, email, lastSeen }) {
  return (
    <View style={styles.userContainer}>
      <UserAvatar image={photo} />
      <View style={styles.textContainer}>
        <Text style={styles.userName}>{username}</Text>

        <View style={styles.sepLine}>
          <Text>Email: {email}</Text>
          <Text>Last Seen: {lastSeen}</Text>
        </View>
      </View>
    </View>
  );
}

export default UserCard;
const styles = StyleSheet.create({
  userContainer: {
    padding: 12,
    marginHorizontal: 15,
    backgroundColor: "white",
    borderRadius: 10,
    //alignItems: "",
    flex: 1,
    marginLeft: 30,

    flexDirection: "row",
    marginTop: 15,
  },
  textContainer: {
    marginLeft: 16,
  },

  userName: {
    fontSize: 24,
    fontWeight: "bold",
    opacity: 0.75,
  },
  sepLine: {
    borderBottomColor: GlobalStyles.colors.heatherGrey,
    opacity: 0.5,
    borderTopWidth: 2,
    padding: 4,
    marginTop: 4,
    flex: 1,
  },
});
