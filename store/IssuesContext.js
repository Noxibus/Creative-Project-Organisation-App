/* eslint-disable no-case-declarations */
import { createContext, useReducer } from "react";

import { DUMMY_ISSUES } from "./dummy-data/DUMMY_ISSUES";

export const IssuesContext = createContext({
  //ISSUES WITHIN A PROJECT
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

//look at tasks and projects for notes
function issuesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString + Math.random().toString;
      return [{ ...action.payload, id: id }, ...state];
    case "UPDATE":
      const updateableIsssueIndex = state.findIndex(
        (issue) => issue.id === action.payload.id
      );
      const updateableIssue = state[updateableIsssueIndex];
      // eslint-disable-next-line no-unused-vars
      const updatedItem = { ...updateableIssue, ...action.payload.data };
      const updatedIssues = [...state];
      updatedIssues[updateableIsssueIndex] = updatedItemreturn;
      return updatedIssues;
    case "DELETE":
      return state.filter((issue) => issue.id !== action.payload);
    default:
      return state;
  }
}

function IssuesContextProvider({ children }) {
  const [issuesState, dispatch] = useReducer(issuesReducer, DUMMY_ISSUES);

  function addIssue(issueData) {
    dispatch({ type: "ADD", payload });
  }

  function deleteIssue(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function resolveIssue() {
    setResolved((currentIssues) => currentIssues.filter());
  }
  function updateIssue(id, issueData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: issueData } });
  }

  const value = {
    issues: issuesState,
    addIssue: addIssue,
    deleteIssue: deleteIssue,
    updateIssue: updateIssue,
  };

  return (
    <IssuesContext.Provider value={value}>{children}</IssuesContext.Provider>
  );
}
export default IssuesContextProvider;
