import React from "react";
import renderer from "react-test-renderer";
import AuthContent from "../../components/auth/AuthContent";
import AuthForm from "../../components/auth/AuthForm";
import AuthInput from "../../components/auth/AuthInput";

test("renders correctly", () => {
  const tree = renderer.create(<AuthContent />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("renders correctly", () => {
  const tree = renderer.create(<AuthForm />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("renders correctly", () => {
  const tree = renderer.create(<AuthInput />).toJSON();
  expect(tree).toMatchSnapshot();
});
