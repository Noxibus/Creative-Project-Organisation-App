/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-vars */
import { View, Text, StyleSheet } from "react-native";
import ProtectedResourceFetcher from "../../../util/authentication/ProtectedResourceFetcher";

import { GlobalStyles } from "../../../util/constants/styles";

//TODO: CONFUGURE PROTECTED PROJECTS AND RESOURCES

function ProjectSummary({ projects, periodName }) {
  // ProtectedResourceFetcher();
  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      {/* <Text>{ProtectedResourceFetcher.fetchedMessages}</Text> */}
    </View>
  );
}

export default ProjectSummary;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: GlobalStyles.colors.orange300,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  period: {
    fontSize: 16,
    color: "white",
  },
});
