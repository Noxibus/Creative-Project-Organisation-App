/* eslint-disable no-case-declarations */
//MIGHT HAVE TO LINK PROJECTS/ISSUES/TASKS CONTEXTS LATER SOMEHOW

//PARAMS: id, taskTitle, text, isComplete
import { createContext, useReducer } from "react";

import { DUMMY_TASKS } from "./dummy-data/DUMMY_TASKS";

export const TasksContext = createContext({
  tasks: [],
  addTask: ({ taskTitle, text, isComplete }) => {},
  //TODO: update task
  deleteTask: (id) => {},
});

//recieves state and action params automatically
function tasksReducer(state, action) {
  switch (action.type) {
    case "ADD":
      //pseudorandom temp ID
      const id = new Date().toString + Math.random().toString;
      //action.payload = new task we are adding, ...state = existing tasks
      return [{ ...action.payload, id: id }, ...state];
    case "DELETE":
      return state.filter((task) => task.id !== action.payload);
    default:
      return state;
  }
}

//holds task context logic
function TasksContextProvider({ children }) {
  //dispatch function used to manipulate state
  const [tasksState, dispatch] = useReducer(tasksReducer, DUMMY_TASKS);

  function addTask(taskData) {
    //identifying the type of action we want to handle with this function
    dispatch({ type: "ADD", payload });
  }

  function deleteTask(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  const value = {
    tasks: tasksState,
    addTask: addTask,
    deleteTask: deleteTask,
  };

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
}

export default TasksContextProvider;
