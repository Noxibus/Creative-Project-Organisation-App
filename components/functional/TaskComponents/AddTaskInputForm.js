/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import {
  KeyboardAvoidingView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  TurboModuleRegistry,
} from "react-native";
import { GlobalStyles } from "../../../util/constants/styles";
import { useState } from "react";
import IconButton from "../ui/IconButton";
import Input from "../ui/Input";

//TODO: ADD KEYBOARD AVOIDING VIEW TO EVERY SCREEN WITH TEXT INPU
//taskTitle, text, isComplete
function AddTaskInput({
  onCancel,
  onSubmitTask,
  submitButtonLabel,
  defaultValues,
}) {
  const [tasks, setTasks] = useState({
    taskTitle: {
      value: defaultValues ? defaultValues.taskTitle.toString() : "",
      isValid: true,
    },
    text: {
      value: defaultValues ? defaultValues.text.toString() : "",
    },
    isComplete: {
      //default value : not complete
      value: defaultValues ? defaultValues.isComplete : false,
    },
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setTasks((curTasks) => {
      //targeting whatver value is in inputIdentifier
      return {
        ...curTasks,
        //when we enter something, we initially assume it is valid then apply checks later
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitTaskHandler() {
    const taskData = {
      taskTitle: tasks.taskTitle.value,
      text: tasks.text.value,
      isCompletw: tasks.isComplete.value,
    };

    //validation constants, all we care about for task is that is has a valid title
    const taskTitleIsValid = taskData.taskTitle.trim().length > 0;

    if (!taskTitleIsValid) {
      setTasks((curTasks) => {
        return {
          taskTitle: {
            value: curTasks.taskTitle.value,
            isValid: taskTitleIsValid,
          },
          text: { value: curTasks.text.value },
          isComplete: { value: curTasks.isComplete.value },
        };
      });
      return;
    }
    onSubmitTask(taskData);
  }
  return (
    <KeyboardAvoidingView>
      <View>
        <Input
          label="TaskTitle"
          invalid={!tasks.taskTitle.isValid}
          textInputConfig={{
            keyboardType: "default",
            autoCapitalize: "words",
            onChangeText: inputChangedHandler.bind(this, "taskTitle"),
            //two way binding:
            value: tasks.taskTitle.value,
          }}
        />
      </View>
      <View>
        <Input
          label="Text"
          textInputConfig={{
            keyboardType: "default",
            autoCapitalize: "words",
            onChangeText: inputChangedHandler.bind(this, "text"),
            //two way binding:
            value: tasks.text.value,
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <IconButton
          icon="close-circle-outline"
          color={GlobalStyles.colors.midGrey}
          size={28}
          onPress={onCancel}
        />
        <IconButton
          icon="md-add-circle-sharp"
          color={GlobalStyles.colors.orange200}
          size={28}
          onPress={submitTaskHandler}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
// function AddTaskInput({ props }) {
//   const [task, setTask] = useState;

//   const addTask = (value) => {
//     props.addTask(value);
//     setTask(null);
//   };
//   //TODO: Figure out what behaviour Keyboard Avoiding View needs
//   return (
//     <KeyboardAvoidingView>
//       <Pressable onPress={() => addTask(task)}>
//         <View>
//           <MaterialIcons name="keyboard-arrow-up" size={24} color="black" />
//         </View>
//       </Pressable>
//     </KeyboardAvoidingView>
//   );
// }

export default AddTaskInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  inputContainer: {
    flexDirection: "row",
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 24,
    // borderTopColor: GlobalStyles.colors.orange300,
    // borderTopWidth: 2,
  },
  textInput: {
    fontSize: 20,
    backgroundColor: "white",
    width: 300,
    marginRight: 20,
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
  },
  addTaskButton: {
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: GlobalStyles.colors.orange200,
    borderRadius: 50,
  },
});
