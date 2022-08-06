/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { View, Text, Button, StyleSheet, Pressable, Alert } from "react-native";
import { GlobalStyles } from "../../../util/constants/styles";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { IssuesContext } from "../../../store/IssuesContext";
import { useRoute } from "@react-navigation/native";

//TODO: LINK ISSUE ID WITH PROJECT ID SO NOT ALL ISSUES APPEAR FOR EVERY PROJECT

//TODO: FIX STATE AND CONTEXT WITH DELETE/EDIT FUNCTION

//might have to change props to task, or project
////issueTitle,issueDescription,dateLogged,dateResolved,comments,
function IssueItem({
  id,
  issueTitle,
  issueDescription,
  dateLogged,
  dateResolved,
  comments,
}) {
  const navigation = useNavigation();
  const route = useRoute();
  const issuesCtx = useContext(IssuesContext);
  const editedIssueId = route.params?.editedIssueId;
  const isEditing = !!editedIssueId;

  function deleteIssueHandler(editedIssueId) {
    issuesCtx.deleteIssue(editedIssueId);
  }

  return (
    <View>
      <View style={styles.container}>
        <View>
          <Text style={styles.textTitle}>{issueTitle}</Text>
          <View style={styles.dateRow}>
            <Text style={styles.text}>{dateLogged}</Text>
            <Text style={styles.text}>{dateResolved}</Text>
          </View>
          <Text style={styles.descriptionTextBox}>{issueDescription}</Text>
          <Text style={styles.descriptionTextBox}>{comments}</Text>
          <View style={styles.buttonContainer}>
            <Button
              title="Update"
              color={GlobalStyles.colors.orange100}
              onPress={() => {
                navigation.navigate("UpdateIssue", route.params);
              }}
            />
            <Button
              title="Delete"
              color={GlobalStyles.colors.orange100}
              onPress={() => {
                Alert.alert(
                  "Confirm",
                  "Are you sure you wish to delete this issue log?",

                  [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel clicked"),
                    },
                    {
                      text: "Delete",
                      onPress: () => console.log("Delete clicked"),
                    },
                  ]
                );
              }}
            />
            <Button title="Resolve" color={GlobalStyles.colors.orange100} />
          </View>
        </View>
      </View>
    </View>
  );
}

export default IssueItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 12,
    flexDirection: "row",
    flex: 1,
    minHeight: 30,
    marginVertical: 8,
    padding: 12,
    elevation: 3,
    shadowColor: GlobalStyles.colors.midGrey,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 4,
    shadowOpacity: 0.7,
  },
  textTitle: {
    color: "black",
    fontSize: 24,
    padding: 6,
    fontWeight: "bold",
  },
  text: {
    color: "black",
    fontSize: 12,
    padding: 6,
  },
  dateRow: {
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  descriptionTextBox: {
    padding: 12,
    borderRadius: 12,
    shadowOpacity: 0.9,
    shadowColor: GlobalStyles.colors.midGrey,
    minWidth: "100%",
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 1.5,
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 14,
    borderRadius: 16,
    shadowColor: GlobalStyles.colors.midGrey,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.75,
    shadowRadius: 3,
    shadowRadius: 4,
  },
});
