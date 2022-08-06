import { createContext, useReducer } from "react";

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
  //   function resolveIssue(){
  //     //figure out how to carry out this logic
  //   }
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
