/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */
import { createContext, useReducer } from "react";
import { DUMMY_PROJECTS } from "./dummy-data/DUMMY_PROJECTS";

//defining data shape
export const ProjectsContext = createContext({
  //OVERALL PROJECT OBJECT
  projects: [],
  addProject: ({ title, date, description, deadline }) => {},
  setProjects: (projects) => {},
  deleteProject: (id) => {},
  updateProject: (id, { title, date, description, deadline }) => {},
  //TODO: IMPORT TASKS CONTEXT
});

//This function will always return some new state when it is executed
//state and action params provided by React
function projectsReducer(state, action) {
  switch (action.type) {
    case "ADD":
      //retrieving id from Firebase

      //add new state to existing data
      return [action.payload, ...state];
    case "SET":
      //action.payload will be the array of project items coming in from the backend
      //Firebase sorts things in chronological order, here we are undoing that
      // eslint-disable-next-line no-case-declarations
      const reverseProjectArray = action.payload.reverse();
      return reverseProjectArray;

    case "UPDATE":
      //return true if the updated id matches existing item id
      const updateableProjectIndex = state.findIndex(
        (project) => project.id === action.payload.id
      );
      const updateableProject = state[updateableProjectIndex];
      const updatedItem = { ...updateableProject, ...action.payload.data };
      const updatedProjects = [...state];
      //overwrite item in index with uodated item
      updatedProjects[updateableProjectIndex] = updatedItem;
      return updatedProjects;
    case "DELETE":
      //filter out project id we want to delete
      return state.filter((project) => project.id !== action.payload);
    default:
      //return existing state
      return state;
  }
}

//provides context logic, wrap around jsx elements that need context
function ProjectContextProvider({ children }) {
  //dispatch = dispatch a new action to the reducer function
  //initial starting state values are retrieved from Firebase backend
  // const [projectsState, dispatch] = useReducer(projectsReducer, []);
  //Starting vals coming from DUMMY_PROJECTS
  const [projectsState, dispatch] = useReducer(projectsReducer, DUMMY_PROJECTS);

  //projectData is coming from the reducer
  function addProject(projectData) {
    //the value we dispatch here is linked to projectsReducer action
    dispatch({ type: "ADD", payload: projectData });
  }

  //when we fetch data from our backend we want to set it
  function setProjects(projects) {
    // dispatch a new object of type 'set' with a payload of 'projects'
    dispatch({ type: "SET", payload: projects });
  }

  //linked to projectsReducer
  function deleteProject(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  //linked to projectsReducer
  function updateProject(id, projectData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: projectData } });
  }

  const value = {
    projects: projectsState,
    addProject: addProject,
    setProjects: setProjects,
    deleteProject: deleteProject,
    updateProject: updateProject,
  };

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
}

export default ProjectContextProvider;
