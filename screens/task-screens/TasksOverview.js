/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { useContext } from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import TaskList from "../../components/functional/TaskComponents/TaskList";
import { TasksContext } from "../../store/TasksContext";
import { GlobalStyles } from "../../util/constants/styles";
import { FloatingAction } from "react-native-floating-action";

//THIS IS WHERE YOU OUTPUT TASK DATA, FEED IT INTO HERE!!!!!!!!

//floating action button stuff
//www.npmjs.com/package/react-native-floating-action
//TODO: ADD FLOATING ACTION BUTTON FOR ADDING TASKS

//Getting in the tasks we want to output as prop, every object in tasks array = 1 task
function TasksOverview({ route, navigation }) {
  const tasksCtx = useContext(TasksContext);
  return (
    <View style={styles.container}>
      <TaskList tasks={tasksCtx.tasks} />
      <Button
        title="Add Task"
        color={GlobalStyles.colors.orange100}
        //TODO: ADD TASK FUNCTIONALITY,  FIX MODAL VIEW
        onPress={() => {
          navigation.navigate("AddTask", route.params);
        }}
      />
    </View>
  );
}

export default TasksOverview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
