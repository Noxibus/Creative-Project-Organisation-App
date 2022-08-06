import { View, Text, StyleSheet, Pressable } from "react-native";
import { GlobalStyles } from "../../../util/constants/styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import Checkbox from "expo-checkbox";
import IconButton from "../ui/IconButton";
import { TasksContext } from "../../../store/TasksContext";

//TODO: ADD DELETE/MARK TASK COMPLETE LOGIC

//TODO: LINK TASK ID WITH PROJECT ID SO NOT ALL TASKS APPEAR FOR EVERY PROJECT

//might have to change props to task, or project

function TaskItem({ id, taskTitle, text, isComplete }) {
  const navigation = useNavigation();
  //checkbox state
  const [isChecked, setChecked] = useState(false);
  const route = useRoute();
  const tasksCtx = useContext(TasksContext);

  function deleteTask(id) {
    tasksCtx.deleteTask(id);
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
          onPress={deleteTask}
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
