/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { View, Button } from "react-native";
import { useContext } from "react";
import IssueList from "../../components/functional/IssueComponents/IssueList";
import { IssuesContext } from "../../store/IssuesContext";
import { GlobalStyles } from "../../util/constants/styles";
//THIS COMPONENT OUTPUTS A LIST OF Issues

//issueTitle,issueDescription,dateLogged,dateResolved,comments,

//Getting in the Issues we want to output as prop, every object in Issues array = 1 task
function IssuesOverview({ issues }) {
  const issuesCtx = useContext(IssuesContext);
  return (
    <View>
      <IssueList issues={issuesCtx.issues} />
      <Button
        title="Log issue"
        color={GlobalStyles.colors.orange100}
        //TODO: ADD ISSUE FUNCTIONALITY
        // onPress={() => {
        //   navigation.navigate("IssuesOverview", route.params);
        // }}
      />
    </View>
  );
}

export default IssuesOverview;
