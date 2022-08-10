//Redux state management
import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "../features/projectSlice";

export default configureStore({
  //this is where all of our different reducers will go
  reducer: {
    project: projectReducer,
  },
});
