/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-vars */
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import React from "react";
import { GlobalStyles } from "../../../util/constants/styles";

//TODO: REFACTOR TO MODERN FUNCTIONAL COMPONENT

// eslint-disable-next-line react/prop-types
const AccountMenuOptions = ({ userOptions }) => {
  return (
    <ScrollView>
      {userOptions.map(({ title, subTitle, onPress }, index) => {
        return (
          <Pressable key={index.toString()}>
            <View style={styles.menuItem}>
              <Text style={styles.title}>{title}</Text>
              {subTitle && <Text style={styles.bodyText}>{subTitle}</Text>}
            </View>

            <View style={styles.container}></View>
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

export default AccountMenuOptions;

const styles = StyleSheet.create({
  container: {
    height: 0.5,
    backgroundColor: GlobalStyles.colors.midGrey,
  },
  menuItem: {
    padding: 6,
  },
  title: {
    fontSize: 18,
  },
  bodyText: {
    paddingTop: 6,
    opacity: 0.45,
  },
});
