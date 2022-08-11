import { DUMMY_ISSUES } from "./DUMMY_ISSUES";
import { DUMMY_TASKS } from "./DUMMY_TASKS";

export const DUMMY_PROJECTS = [
  {
    id: "p1",
    title: "Screen Printing: Finalising T-Shirt Designs",
    date: "07/22/2022",
    description:
      "Client wants a series of prints and t-shirts fabricated by the technicians. Final run of t-shirt samples, client has selected final materials.",
    deadline: "08/30/2022",
    tasks: [DUMMY_TASKS],
    issues: [DUMMY_ISSUES],
  },
  {
    id: "p2",
    title: "Infographic Design",
    date: "07/14/2022",
    description:
      "We've been asked to create an infographic for 'X's ad campaign",
    deadline: "07/202022",
    tasks: [DUMMY_TASKS],
    issues: [DUMMY_ISSUES],
  },
  {
    id: "p3",
    title: "Test Proofs: Magazine Spread",
    date: "07/13/2022",
    description:
      "Client wants us to create layouts for their magazine, as well as edit their photos",
    deadline: "07/30/2022",
    tasks: [DUMMY_TASKS],
    issues: [DUMMY_ISSUES],
  },
  {
    id: "p4",
    title: "3D Modelling and Printing Job",
    date: "06/01/2022",
    description:
      "Client wants a series of 3D assets modelled and rigged for an animation, as well as a series of 3D prints made from the models for merchandise prototypes.",
    deadline: "07/30/2022",
    tasks: [DUMMY_TASKS],
    issues: [DUMMY_ISSUES],
  },
];
