/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import IssueInputForm from "../../components/functional/IssueComponents/IssueInputForm";
import { IssuesContext } from "../../store/IssuesContext";
import { GlobalStyles } from "../../util/constants/styles";

function UpdateIssue({ route, navigation }) {
  const issuesCtx = useContext(IssuesContext);
  const editedIssueId = route.params?.editedIssueId;
  const isEditing = !!editedIssueId;
  const selectedIssue = issuesCtx.issues.find(
    (issue) => issue.id === editedIssueId
  );

  function cancelHandler() {
    navigation.goBack();
  }

  function updateHandler() {
    if (isEditing) {
      issuesCtx.updateIssue(editedIssueId, {
        issueTitle: "Updated Issue",
        issueDescription: "Updated Description",
        dateLogged: new Date("2022-07-22"),
        dateResolved: new Date("2022-07-22"),
        comments: "Updated Comments",
      });
    }
    navigation.goBack();
  }
  return (
    <View style={styles.container}>
      <IssueInputForm
        onCancel={cancelHandler}
        onSubmit={updateHandler}
        defaultValues={selectedIssue}
      />
    </View>
  );
}

export default UpdateIssue;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
