import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [],
  //   id: "",
  //   title: "",
  //   date: "",
  //   description: "",
  //   deadline: "",
  //   tasks: [],
  //   issues: [],
  //   assets: [],
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  //reducers : everything that touches your state
  reducers: {
    ADD: (state, action) => {
      const { id, title, date, description, deadline } = action.payload;
      state.value += [action.payload, ...state];
    },
    SET: (state, action) => {
      state.value -= 1;
    },
    UPDATE: (state, action) => {
      state.value += action.payload;
    },
    DELETE: {},
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = projectSlice.actions;

export default projectSlice.reducer;
