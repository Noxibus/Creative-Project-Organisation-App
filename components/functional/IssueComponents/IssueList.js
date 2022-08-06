import {
  View,
  Text,
  Keyboard,
  ScrollView,
  StyleSheet,
  FlatList,
} from "react-native";
import { GlobalStyles } from "../../../util/constants/styles";
import IssueItem from "./IssueItem";
import { useState } from "react";

function renderIssue(itemData) {
  return <IssueItem {...itemData.item} />;
}

function IssueList({ issues }) {
  return (
    <View>
      {/* summary */}
      <View></View>
      {/* summary */}
      <FlatList
        data={issues}
        //flatlists need keys
        renderItem={renderIssue}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

export default IssueList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  heading: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 20,
  },
  scrollView: {
    marginBottom: 70,
  },
  IssueContainer: {
    marginTop: 20,
  },
});
