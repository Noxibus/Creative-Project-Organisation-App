import React from "react";
import renderer from "react-test-renderer";
import IssueInputForm from "../../components/functional/IssueComponents/IssueInputForm";
import IssueItem from "../../components/functional/IssueComponents/IssueItem";
import IssueList from "../../components/functional/IssueComponents/IssueList";

test("renders correctly", () => {
  const tree = renderer.create(<IssueInputForm />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("renders correctly", () => {
  const tree = renderer.create(<IssueItem />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("renders correctly", () => {
  const tree = renderer.create(<IssueList />).toJSON();
  expect(tree).toMatchSnapshot();
});
