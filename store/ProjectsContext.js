/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */
import { createContext, useReducer } from "react";

const DUMMY_TASKS = [
  {
    id: "t1",
    taskTitle: "10/03",
    text: "Wash screenprinting equipment",
    isComplete: "true",
  },
  {
    id: "t2",
    taskTitle: "12/03",
    text: "Update linked assets",
    isComplete: "false",
  },
  {
    id: "t3",
    taskTitle: "19/03",
    text: "Email client for revisions",
    isComplete: "true",
  },
  {
    id: "t4",
    taskTitle: "22/03",
    text: "3D Printing Tests",
    isComplete: "false",
  },
  {
    id: "t5",
    taskTitle: "30/03",
    text: "Edit 3D Models and Rigging",
    isComplete: "false",
  },
];

const DUMMY_ISSUES = [
  {
    id: "i1",
    issueTitle: "Awaiting client approval",
    issueDescription:
      "Requiring client approval before we can progress. No one can get a hold of the client. Assign a team member to get in touch with them",
    dateLogged: "2022-01-01",
    dateResolved: "2022-01-14",
    comments: `
    User1 (2022-01-02): Client has been emailed.

    User 1 (2022-01-07): Client has been emailed again.

    User 2 (2022-01-14): Client has contacted the department and approved the last round of changes. Work can begin again 
    `,
  },
  {
    id: "i2",
    issueTitle: "Workshop closed: Extraction unit broken",
    issueDescription:
      "The fabrication workshop has been closed due to the extraction fan breaking down, this will likely cause delays in the project turnaround. Will have to wait until this has been repaired",
    dateLogged: "2022-02-02",
    dateResolved: "2022-02-20",
    comments: `
    User 1 (2022-02-02): Repair technician has been contacted. Will come to assess damage on the 4th.

    User 1 (2022-02-04): Repairman has been, the damage is worse than we thought. Have to wait for them to recieve a part before we can have it fixed.

    User 3 (2022-02-04): Clients have been notified that fabrication based work will be delayed. We will have to outsource lasercutting, 3D printing, and screenprinting in the meantime.
     `,
  },
  {
    id: "i3",
    issueTitle: "Footage corrupted",
    issueDescription:
      "Footage from the documentation and filming of visual natrratives project has been corrupted due to technical error, all footage has been lost",
    dateLogged: "2022-03-03",
    dateResolved: "2022-04-12",
    comments: `User 4 (2022-03-06): Inhouse tech staff haven't been able to fix harddrive. Client has been notified of the loss and deadline has been ammedned. They have been offered recompense for this issue.

    User 1 (2022-03-07): Harddrive has been sent to specialist for recovery.

    User 2 (2022-03-09): Some footage has been recovered, We will reshoot and re-composite the rest. `,
  },
  {
    id: "i4",
    issueTitle: "Client witholding payment",
    issueDescription: "Client refuses to pay final total for completed work",
    dateLogged: "2022-04-04",
    dateResolved: "2022-04-04",
    comments: `User 3(2022-04-04): Client has been advised that any assets will be witheld until payment is received in full. All proofs client has been sent thusfar are watermarked`,
  },
];

//defining data shape and creating the context component
export const ProjectsContext = createContext({
  //OVERALL DEFAULT PROJECT OBJECT
  projects: [],
  addProject: ({ title, date, description, deadline, tasks, issues }) => {},
  setProjects: (projects) => {},
  deleteProject: (id) => {},
  updateProject: (
    id,
    { title, date, description, deadline, tasks, issues }
  ) => {},
  tasks: [],
  addTask: ({ taskTitle, text, isComplete }) => {},
  //TODO: update task
  deleteTask: (id) => {},
  issues: [],
  logIssues: ({
    issueTitle,
    issueDescription,
    dateLogged,
    dateResolved,
    comments,
  }) => {},
  setIssue: (issues) => {},
  //resolving issue moves it to resolved issue stack
  //need to figure out issue redolution/deletion logit
  // resolveIssue: (id) => {},
  deleteIssue: (id) => {},
  updateIssue: (
    id,
    { issueTitle, issueDescription, dateLogged, dateResolved, comments }
  ) => {},
});

//This function will always return some new state when it is executed
//state and action params provided by React
function projectsReducer(state, action) {
  switch (action.type) {
    case "ADD_PROJECT":
      //retrieving id from Firebase

      //add new state to existing data
      return [action.payload, ...state];
    case "SET_PROJECT":
      //action.payload will be the array of project items coming in from the backend
      //Firebase sorts things in chronological order, here we are undoing that
      // eslint-disable-next-line no-case-declarations
      const reverseProjectArray = action.payload.reverse();
      return reverseProjectArray;

    case "UPDATE_PROJECT":
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
    case "DELETE_PROJECT":
      //filter out project id we want to delete
      return state.filter((project) => project.id !== action.payload);
    case "ADD_TASK":
      return console.log("ADD TASK");
    case "DELETE_TASK":
      return console.log("DELETE TASK");
    case "LOG_ISSUE":
      return console.log("LOG ISSUE");
    case "UPDATE_ISSUE":
      return console.log("UPDATE ISSUE");
    case "DELETE_ISSUE":
      return console.log("UPDATE ISSUE");
    default:
      //return existing state
      return state;
  }
}

//provides context logic, wrap around jsx elements that need context
function ProjectContextProvider({ children }) {
  //dispatch = dispatch a new action to the reducer function
  //initial starting state values are retrieved from Firebase backend
  const [projectsState, dispatch] = useReducer(projectsReducer, []);

  //projectData is coming from the reducer
  function addProject(projectData) {
    //the value we dispatch here is linked to projectsReducer action
    dispatch({ type: "ADD_PROJECT", payload: projectData });
  }

  //when we fetch data from our backend we want to set it
  function setProjects(projects) {
    // dispatch a new object of type 'set' with a payload of 'projects'
    dispatch({ type: "SET_PROJECT", payload: projects });
  }

  //linked to projectsReducer
  function deleteProject(id) {
    dispatch({ type: "DELETE_PROJECT", payload: id });
  }

  //linked to projectsReducer
  function updateProject(id, projectData) {
    dispatch({
      type: "UPDATE_PROJECT",
      payload: { id: id, data: projectData },
    });
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
