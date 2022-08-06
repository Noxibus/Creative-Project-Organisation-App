/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-vars */
import { View, Text, StyleSheet, Container, Touchable } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import AccountMenuOptions from "../components/functional/UserComponents/AccountMenuOptions";

//TODO: REFACTOR TO MODERN FUNCTIONAL COMPONENT
const AccountOverview = () => {
  const userOptions = [
    {
      title: "My Account",
      subTitle: "View your account",
      onPress: () => {},
    },
    {
      title: "Teams",
      subTitle: "View your teams",
      onPress: () => {},
    },
    {
      title: "My Network",
      subTitle: "View your network",
      onPress: () => {},
    },
  ];

  return <AccountMenuOptions userOptions={userOptions} />;
};

export default AccountOverview;
