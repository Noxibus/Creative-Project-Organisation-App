import React from "react";
import renderer from "react-test-renderer";
import AddTaskInput from "../../components/functional/TaskComponents/AddTaskInputForm";
import TaskItem from "../../components/functional/TaskComponents/TaskItem";
import TaskList from "../../components/functional/TaskComponents/TaskList";

test("renders correctly", () => {
  const tree = renderer.create(<AddTaskInput />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("renders correctly", () => {
  const tree = renderer.create(<TaskItem />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("renders correctly", () => {
  const tree = renderer.create(<TaskList />).toJSON();
  expect(tree).toMatchSnapshot();
});
