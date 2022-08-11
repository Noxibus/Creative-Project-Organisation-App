/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
//when a user clicks on a project they will be directed here
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import { GlobalStyles } from "../../util/constants/styles";
import IssuesOverview from "../issue-screens/IssuesOverview";
import TasksOverview from "../task-screens/TasksOverview";
import CheckBox from "@react-native-community/checkbox";
import { useContext } from "react";
import { TasksContext } from "../../store/TasksContext";
import { IssuesContext } from "../../store/IssuesContext";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import IconButton from "../../components/functional/ui/IconButton";
import ProjectInfo from "./ProjectInfo";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AssetsOverview from "../assets-screens/AssetsOverview";
import { FontAwesome5 } from "@expo/vector-icons";

//would be nice if you could swipe between tasks and issues

//SCREEN TO VIEW AN INDIVIDUAL PROJECT ITEM, FROM HERE USERS CAN MANAGE THE PROJECT, ADD TASKS/ISSUES ETC

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ProjectOverview({ route, navigation, id }) {
  return (
    <BottomTabs.Navigator
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
          // headerRight: ({ tintColor }) => (
          //   <IconButton
          //     icon="exit"
          //     size={24}
          //     color={tintColor}
          //     onPress={authCtx.logout}
          //   />
          // ),
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
          //headerRight: ({ tintColor }) => (
          //TODO: CONNECT LOGOUT BUTTONS
          // <IconButton
          //   icon="exit"
          //   size={24}
          //   color={tintColor}
          //   onPress={authCtx.logout}
          // />
          //),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="checkbox-outline" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="IssuesOverview"
        component={IssuesOverview}
        options={{
          title: "IssuesOverview",
          tabBarLabel: "Issues",
          headerShown: false,
          // headerRight: ({ tintColor }) => (
          // <IconButton
          //   icon="exit"
          //   size={24}
          //   color={tintColor}
          //   onPress={authCtx.logout}
          // />
          // ),
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
          // headerRight: ({ tintColor }) => (
          //   <IconButton
          //     icon="exit"
          //     size={24}
          //     color={tintColor}
          //     onPress={authCtx.logout}
          //   />
          // ),
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
