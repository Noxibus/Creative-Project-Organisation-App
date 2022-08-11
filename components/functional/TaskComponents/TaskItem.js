/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useNavigation, useRoute } from "@react-navigation/native";
import Checkbox from "expo-checkbox";
import React, { useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import { TasksContext } from "../../../store/TasksContext";
import { GlobalStyles } from "../../../util/constants/styles";
import IconButton from "../ui/IconButton";

//TODO: LINK TASK ID WITH PROJECT ID SO NOT ALL TASKS APPEAR FOR EVERY PROJECT

function TaskItem({ id, taskTitle, text, isComplete, route }) {
  const navigation = useNavigation();
  //checkbox state
  const [isChecked, setChecked] = useState(false);
  //const route = useRoute();
  const tasksCtx = useContext(TasksContext);

  async function deleteTaskHandler() {
    //telling the function we're submitting data and updating local state accordingly
    setIsSendingData(true);
    await deleteTask(taskId);
    //delete project locally
    tasksCtx.deleteProject(taskId);
    //then delete on the backend
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.textTitle}>{taskTitle}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{text}</Text>
      </View>
      <View style={styles.iconContainer}>
        <IconButton
          icon="close-sharp"
          color={GlobalStyles.colors.errorRed}
          size={28}
          onPress={deleteTaskHandler}
        />
        <Checkbox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={(isChecked) => setChecked(isChecked)}
          color={
            isChecked
              ? GlobalStyles.colors.orange400
              : GlobalStyles.colors.midGrey
          }
          //TODO: ADD DELETE/MARK TASK COMPLETE LOGIC
          //  onPress={() => id.markComplete()}
        />
      </View>
    </View>
  );
}

export default TaskItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    fontSize: 12,
    padding: 4,
    fontWeight: "bold",
  },
  text: {
    color: "black",
    fontSize: 12,
    padding: 4,
    textAlign: "left",
  },
  textContainer: {
    justifyContent: "flex-end",
  },
  iconContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  checkbox: {
    marginRight: 8,
    marginTop: 12,
  },
});
