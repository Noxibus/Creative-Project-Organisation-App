import React from "react";
import renderer from "react-test-renderer";
import ProjectInputForm from "../../components/functional/ProjectComponents/ProjectInputForm";
import ProjectItem from "../../components/functional/ProjectComponents/ProjectItem";
import ProjectList from "../../components/functional/ProjectComponents/ProjectsList";
import ProjectsOutput from "../../components/functional/ProjectComponents/ProjectsOutput";
import ProjectSummary from "../../components/functional/ProjectComponents/ProjectsSummary";

//Checking Project components render correctly
test("renders correctly", () => {
  const tree = renderer.create(<ProjectInputForm />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("renders correctly", () => {
  const tree = renderer.create(<ProjectItem />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("renders correctly", () => {
  const tree = renderer.create(<ProjectList />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("renders correctly", () => {
  const tree = renderer.create(<ProjectSummary />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("renders correctly", () => {
  const tree = renderer.create(<ProjectsOutput />).toJSON();
  expect(tree).toMatchSnapshot();
});
