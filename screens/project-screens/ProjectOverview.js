/* eslint-disable no-unused-vars */
//when a user clicks on a project they will be directed here
import { Entypo, Ionicons, AntDesign, FontAwesome5 } from "@expo/vector-icons";
import CheckBox from "@react-native-community/checkbox";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";

import { GlobalStyles } from "../../util/constants/styles";
import AssetsOverview from "../assets-screens/AssetsOverview";
import IssuesOverview from "../issue-screens/IssuesOverview";
import TasksOverview from "../task-screens/TasksOverview";
import ProjectInfo from "./ProjectInfo";

//SCREEN TO VIEW AN INDIVIDUAL PROJECT ITEM, FROM HERE USERS CAN MANAGE THE PROJECT, ADD TASKS/ISSUES ETC

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ProjectOverview({ route, navigation, id }) {
  return (
    <BottomTabs.Navigator
      //INITIALISING BOTTOM TAB NAVIGATOR
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.orange100 },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: "white" },
        tabBarActiveTintColor: GlobalStyles.colors.orange200,
        //headerShown: false,
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="person-circle"
            size={24}
            color={tintColor}
            onPress={() => {
              navigation.navigate("Account");
            }}
          />
        ),
      })}
    >
      <BottomTabs.Screen
        //PROJECT INFO TAB
        name="ProjectInformation"
        component={ProjectInfo}
        options={{
          title: "Project Information",
          tabBarLabel: "Info",
          headerShown: false,
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="person-circle"
              size={24}
              color={tintColor}
              onPress={() => {
                navigation.navigate("Account");
              }}
            />
          ),
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="infocirlce" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        //TASKS TAB
        name="TasksOverview"
        component={TasksOverview}
        options={{
          title: "Tasks Overview",
          tabBarLabel: "Tasks",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="checkbox-outline" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        //ISSUES OVERVIEW TAB
        name="IssuesOverview"
        component={IssuesOverview}
        options={{
          title: "IssuesOverview",
          tabBarLabel: "Issues",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Entypo name="list" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        //PROJECT INFO TAB
        name="ProjectAssets"
        component={AssetsOverview}
        options={{
          title: "Assets Overview",
          tabBarLabel: "Assets",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="photo-video" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default ProjectOverview;

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },

  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    color: GlobalStyles.colors.orange100,
  },
  underline: {
    borderBottomColor: GlobalStyles.colors.orange100,
    borderBottomWidth: 3,
    borderBottomRightRadius: 80,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingBottom: 24,
  },
});
