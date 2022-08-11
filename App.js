/* eslint-disable react/react-in-jsx-scope */
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RecentProjects from "./screens/project-screens/RecentProjects";
import AllProjects from "./screens/project-screens/AllProjects";
import ManageProjects from "./screens/project-screens/ManageProjects";
import EditProject from "./screens/project-screens/EditProject";
import { GlobalStyles } from "./util/constants/styles";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "./components/functional/ui/IconButton";
import { AntDesign } from "@expo/vector-icons";
import ProjectContextProvider from "./store/ProjectsContext";
import TasksContextProvider from "./store/TasksContext";
import Login from "./screens/login-screens/Login";
import CreateAccount from "./screens/login-screens/CreateAccount";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import { useContext } from "react";
import ViewProject from "./screens/project-screens/ProjectOverview";
import IssuesOverview from "./screens/issue-screens/IssuesOverview";
import TasksOverview from "./screens/task-screens/TasksOverview";
import AddTask from "./screens/task-screens/AddTask";
import IssuesContextProvider from "./store/IssuesContext";
import UpdateIssue from "./screens/issue-screens/UpdateIssue";
import AccountOverview from "./screens/AccountOverview.js";
import { Provider as PaperProvider } from "react-native-paper";
import ProjectInfo from "./screens/project-screens/ProjectInfo";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

//THIS FUNCTION WILL GET LOADED INTO AUTH STACK, THIS CONTAINS ALL THE PROJECT/TASK/ISSUE SCREENS A SIGNED IN USER SHOULD SEE
function ProjectsOverview() {
  const projectsCtx = useContext(ProjectContextProvider);
  const authCtx = useContext(AuthContext);
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerTintColor: GlobalStyles.colors.orange100,
        tabBarStyle: { backgroundColor: "white" },
        //TODO: WRITE LOGIC THAT HIDES HEADER WHEN ON THE PROJECT/ISSUES/TASK PAGES
        tabBarActiveTintColor: GlobalStyles.colors.orange200,
        headerLeft: ({ tintColor }) => (
          <IconButton
            icon="add"
            size={24}
            color={tintColor}
            onPress={() => {
              navigation.navigate("ManageProjects");
            }}
          />
        ),
      })}
    >
      <BottomTabs.Screen
        name="RecentProjects"
        component={RecentProjects}
        options={{
          title: "Recent Projects",
          tabBarLabel: "Recent",
          //LOGOUT BUTTON
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              size={24}
              color={tintColor}
              onPress={authCtx.logout}
            />
          ),
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="clockcircleo" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="AllProjects"
        component={AllProjects}
        options={{
          title: "All Projects",
          tabBarLabel: "Projects",
          //LOGOUT BUTTON
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              size={24}
              color={tintColor}
              onPress={authCtx.logout}
            />
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="albums" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Account"
        component={AccountOverview}
        options={{
          title: "Account Page",
          tabBarLabel: "Account",
          //LOGOUT BUTTON
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              size={24}
              color={tintColor}
              onPress={authCtx.logout}
            />
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

//where unauthenticated users will be directed
function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: GlobalStyles.colors.orange100,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} />
    </Stack.Navigator>
  );
}

//functional component to encapsulate navigation routes associated with bottom tab nested navigator
//An authenticated Stack
function ProjectsAuthenticated() {
  return (
    // <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          headerTintColor: GlobalStyles.colors.orange100,
        },
      }}
    >
      <Stack.Screen
        name="ProjectsOvervew"
        component={ProjectsOverview}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ManageProjects"
        component={ManageProjects}
        options={{
          presentation: "modal",
          headerTintColor: GlobalStyles.colors.orange100,
        }}
      />
      <Stack.Screen
        name="EditProject"
        component={EditProject}
        options={{
          presentation: "modal",
          headerTintColor: GlobalStyles.colors.orange100,
          title: "Edit Project",
        }}
      />
      <Stack.Screen
        name="IssuesOverview"
        component={IssuesOverview}
        options={{
          presentation: "modal",
          headerTintColor: GlobalStyles.colors.orange100,
          title: "Issues Overview",
        }}
      />
      <Stack.Screen
        name="UpdateIssue"
        component={UpdateIssue}
        options={{
          predentation: "modal",
          title: "Update Issue",
          headerTintColor: GlobalStyles.colors.orange100,
        }}
      />
      <Stack.Screen
        name="TasksOverview"
        component={TasksOverview}
        options={{
          presentation: "modal",
          headerTintColor: GlobalStyles.colors.orange100,
          title: "Tasks Overview",
        }}
      />
      <Stack.Screen
        name="AddTask"
        component={AddTask}
        options={{
          presentation: "modal",
          title: "Add Task",
          headerTintColor: GlobalStyles.colors.orange100,
        }}
      />
      <Stack.Screen
        name="ViewProject"
        //TODO: FIND A WAY TO MAKE THE PROJECT TITLE THE PAGE TITLE
        component={ViewProject}
        options={{
          title: "Project Overview",
          headerTintColor: GlobalStyles.colors.orange100,
        }}
      />
      <Stack.Screen
        name="ProjectInfo"
        //TODO: FIND A WAY TO MAKE THE PROJECT TITLE THE PAGE TITLE
        component={ProjectInfo}
        options={{
          title: "Project Information",
          headerTintColor: GlobalStyles.colors.orange100,
        }}
      />
    </Stack.Navigator>
  );
}

function NavigationTree() {
  //using context to control navigation logic to confitionally render authenticated and non-authenticated stacks
  const authCtx = useContext(AuthContext);
  return (
    <NavigationContainer>
      {/* if we are not authenticated go to the auth stack */}
      {!authCtx.isAuthenticated && <AuthStack />}
      {/* if we are authenticated, go to authenticated stack */}
      {authCtx.isAuthenticated && <ProjectsAuthenticated />}
    </NavigationContainer>
  );
}

//Wrapping Context providers up with one another
export default function App() {
  return (
    <>
      <PaperProvider>
        <ProjectContextProvider>
          <TasksContextProvider>
            <IssuesContextProvider>
              <AuthContextProvider>
                <NavigationTree />
              </AuthContextProvider>
            </IssuesContextProvider>
          </TasksContextProvider>
        </ProjectContextProvider>
      </PaperProvider>
      <StatusBar style="dark" />
    </>
  );
}
