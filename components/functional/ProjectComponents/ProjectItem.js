/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { Pressable, View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../../util/constants/styles";
import { getFormattedDate } from "../../../util/date";
import { useNavigation } from "@react-navigation/native";

function ProjectItem({
  id,
  title,
  date,
  description,
  deadline,
  users,
  //array of tasks
  tasks,
  //array of issues
  issues,
}) {
  //screens don't get navigation prop so we have to call this method on components
  const navigation = useNavigation();

  function projectPressHandler() {
    //id route parameters to pass to manage project screens. In App.js the project item does not yet have an ID because it hasn't been made yet
    //press to go to manage projects
    //navigation.navigate("ManageProjects", { id: id });
    navigation.navigate("ViewProject", { id: id });
  }

  return (
    <Pressable
      style={({ pressed }) => pressed && styles.pressed}
      onPress={projectPressHandler}
    >
      <View style={styles.projectItem}>
        <View>
          <View>
            <Text style={styles.textTitle}>{title}</Text>
          </View>
          <View style={styles.textDate}>
            <Text>Date: {getFormattedDate(date)}</Text>
            <Text>Deadline: {getFormattedDate(deadline)}</Text>
          </View>
        </View>
        <Text style={styles.description}>{description}</Text>
      </View>
    </Pressable>
  );
}

export default ProjectItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },

  projectItem: {
    padding: 12,
    marginVertical: 8,
    marginBottom: 8,
    backgroundColor: "white",
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.shadows,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 4,
    shadowOpacity: 0.4,
  },
  textTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    marginBottom: 8,
  },

  textDate: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
    opacity: 0.5,
    borderColor: GlobalStyles.colors.shadows,
  },
  description: {
    color: "black",
    fontSize: 10,
    marginBottom: 4,
  },
});
