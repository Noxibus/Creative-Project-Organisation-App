/* eslint-disable react/react-in-jsx-scope */
import {
  View,
  Text,
  Keyboard,
  ScrollView,
  StyleSheet,
  FlatList,
} from "react-native";
import { GlobalStyles } from "../../../util/constants/styles";
import TaskItem from "./TaskItem";
import { useState } from "react";

//rendering task item, returning JSX that should be returned for every item
function renderTask(itemData) {
  return <TaskItem {...itemData.item} />;
}

function TaskList({ tasks }) {
  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={tasks}
          //flatlists need keys
          renderItem={renderTask}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}

// function TaskList() {
//   const [tasks, setTasks] = useState([]);

//   const addTask = (task) => {
//     if (task == null) return;
//     setTasks([...tasks, task]);
//     Keyboard.dismiss();
//   };
//   const deleteTask = (deleteIndex) => {
//     setTasks(tasks.filter((value, index) => index != deleteIndex));
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Tasks</Text>
//       <ScrollView style={styles.scrollView}>
//         {tasks.map((task, index) => {
//           return (
//             <View key={index} style={styles.taskContainer}>
//               <TaskItem
//                 index={index + 1}
//                 task={task}
//                 deleteTask={() => deleteTask(index)}
//               />
//             </View>
//           );
//         })}
//       </ScrollView>
//       <TaskItem addTask={addTask} />
//     </View>
//   );
// }

export default TaskList;

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  heading: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 20,
  },
  scrollView: {
    marginBottom: 70,
  },
  taskContainer: {
    marginTop: 20,
  },
});
