/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { Text, View, StyleSheet, FlatList } from "react-native";
import { GlobalStyles } from "../../../util/constants/styles";
import ProjectList from "./ProjectsList";
import ProjectSummary from "./ProjectsSummary";

//incoming prop: project items we should output information about. Array of objects, where an object = a project item
//Also passing in project period as a prop as we get this from the screen components
function ProjectsOutput({ projects, projectPeriod, fallbackText }) {
  let content = <Text style={styles.infoText}>{fallbackText}</Text>;
  // ProtectedResourceFetcher;

  if (projects.length > 0) {
    content = <ProjectList projects={projects} />;
  }
  return (
    <View style={styles.container}>
      {/* <Text>{ProtectedResourceFetcher.fetchedMessages}</Text> */}
      <ProjectSummary projects={projects} periodName={projectPeriod} />
      {content}
    </View>
  );
}

export default ProjectsOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
    paddingTop: 14,
    paddingBottom: 0,
  },
  infoText: {
    color: GlobalStyles.colors.orange200,
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
