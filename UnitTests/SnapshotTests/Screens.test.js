import React from "react";
import renderer from "react-test-renderer";
import IssuesOverview from "../../screens/issue-screens/IssuesOverview";
import UpdateIssue from "../../screens/issue-screens/UpdateIssue";
import CreateAccount from "../../screens/login-screens/CreateAccount";
import Login from "../../screens/login-screens/Login";
import AllProjects from "../../screens/project-screens/AllProjects";
import EditProject from "../../screens/project-screens/EditProject";
import ManageProjects from "../../screens/project-screens/ManageProjects";
import RecentProjects from "../../screens/project-screens/RecentProjects";
import ViewProject from "../../screens/project-screens/ViewProject";
import AddTask from "../../screens/task-screens/AddTask";
import TasksOverview from "../../screens/task-screens/TasksOverview";

test("renders correctly", () => {
  const tree = renderer.create(<IssuesOverview />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("renders correctly", () => {
  const tree = renderer.create(<UpdateIssue />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("renders correctly", () => {
  const tree = renderer.create(<CreateAccount />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("renders correctly", () => {
  const tree = renderer.create(<Login />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("renders correctly", () => {
  const tree = renderer.create(<AllProjects />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("renders correctly", () => {
  const tree = renderer.create(<EditProject />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("renders correctly", () => {
  const tree = renderer.create(<ManageProjects />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("renders correctly", () => {
  const tree = renderer.create(<RecentProjects />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("renders correctly", () => {
  const tree = renderer.create(<ViewProject />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("renders correctly", () => {
  const tree = renderer.create(<AddTask />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("renders correctly", () => {
  const tree = renderer.create(<TasksOverview />).toJSON();
  expect(tree).toMatchSnapshot();
});
