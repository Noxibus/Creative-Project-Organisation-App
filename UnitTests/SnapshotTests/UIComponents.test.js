import React from "react";
import renderer from "react-test-renderer";
import CustomButton from "../../components/functional/ui/CustomButton";
import ErrorIndicator from "../../components/functional/ui/ErrorIndicator";
import FlatButton from "../../components/functional/ui/FlatButton";
import IconButton from "../../components/functional/ui/IconButton";
import Input from "../../components/functional/ui/Input";
import LoadingSpinner from "../../components/functional/ui/LoadingSpinner";

test("renders correctly", () => {
  const tree = renderer.create(<CustomButton />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("renders correctly", () => {
  const tree = renderer.create(<ErrorIndicator />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("renders correctly", () => {
  const tree = renderer.create(<FlatButton />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("renders correctly", () => {
  const tree = renderer.create(<IconButton />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("renders correctly", () => {
  const tree = renderer.create(<Input />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("renders correctly", () => {
  const tree = renderer.create(<LoadingSpinner />).toJSON();
  expect(tree).toMatchSnapshot();
});
