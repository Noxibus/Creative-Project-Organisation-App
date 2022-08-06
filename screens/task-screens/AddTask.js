/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-vars */
//Screen for adding task
import { useContext, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import AddTaskInput from "../../components/functional/TaskComponents/AddTaskInputForm";
import IconButton from "../../components/functional/ui/IconButton";
import { TasksContext } from "../../store/TasksContext";
import { GlobalStyles } from "../../util/constants/styles";

function AddTask({ route, navigation }) {
  const [isSendingTaskData, setIsSendingTaskData] = useState();
  const tasksCtx = useContext(TasksContext);
  const editedTaskID = route.params?.editedTaskID;
  const isEditing = !!editedTaskID;
  const selectedTask = tasksCtx.tasks.find((task) => task.id === editedTaskID);

  //these functions should close modal
  function cancelHandler() {
    navigation.goBack();
  }

  function addTaskHandler() {
    navigation.goBack();
  }

  function deleteTaskHandler() {
    //write delete task hanler with http and promises later
  }

  function submitHandler() {
    //TODO: Add promise and http logic for submitting task to firebase later
    console.log("Submitted");
  }

  return (
    <View style={styles.container}>
      <AddTaskInput
        onCancel={cancelHandler}
        onSubmitTask={submitHandler}
        defaultValues={selectedTask}
      />
      <View style={styles.buttons}>
        {/* <IconButton
          icon="close-circle-outline"
          color={GlobalStyles.colors.midGrey}
          size={28}
          onPress={cancelHandler}
        />
        <IconButton
          icon="md-add-circle-sharp"
          color={GlobalStyles.colors.orange200}
          size={28}
          onPress={addTaskHandler}
        /> */}
      </View>
    </View>
  );
}

export default AddTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
