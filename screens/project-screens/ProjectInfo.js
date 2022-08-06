/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  Alert,
} from "react-native";
import { GlobalStyles } from "../../util/constants/styles";
import { useContext } from "react";

import { ProjectsContext } from "../../store/ProjectsContext";
import { useNavigation } from "@react-navigation/native";
import UserAvatar from "../../components/functional/UserComponents/UserAvatar";
import { Avatar } from "react-native-paper";
import UserCard from "../../components/functional/UserComponents/UserCard";

//TODO: FIX NAVIGATION
function ProjectInfo(route) {
  //const navigation = useNavigation();
  const projectsCtx = useContext(ProjectsContext);
  const projectId = route.params?.id;
  const navigation = useNavigation();

  //TODO: FIGURE OUT HOW TO PASS PROJECT DATA INTO HERE
  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.background}>
        <Text>{route.params?.title}</Text>
        {/* //TODO:Replace with custom buttons */}
        <Text style={styles.textTitle}>Infographic Design</Text>
        <View style={styles.sepLine}></View>
        <View style={styles.projectInnerContainer}>
          <Text style={styles.textTitle3}> Summary</Text>
          <View style={styles.sepLine2}></View>
          <View style={styles.textDate}>
            <Text>Date: 2022-07-14</Text>
            <Text>Deadline: 2022-07-29</Text>
          </View>
          <Text>
            We've been asked to create an infographic for 'X's' ad campaign
          </Text>
          {/* <View>//TODO: USER</View> */}
        </View>
        <ScrollView style={styles.userList}>
          <Text style={styles.textTitle2}>Your Team</Text>
          <View style={styles.sepLine}></View>
          <UserCard
            username={"jbloggs"}
            email={"JoeBloggs@gmail.com"}
            lastSeen={"9:15 am"}
            photo={require("./user1.jpg")}
          />
          <UserCard
            username={"M.June.Design"}
            email={"info@M.JuneDesign.com"}
            lastSeen={"10:24 am"}
            photo={require("./user2.jpg")}
          />
          <UserCard
            username={"EmmaPaints"}
            email={"ESuePaints@outlook.com"}
            lastSeen={"2.47 pm"}
            photo={require("./user3.jpg")}
          />
          <UserCard
            username={"HassanArt"}
            email={"JoeBloggs@gmail.com"}
            lastSeen={"5.50 pm"}
            photo={require("./user4.jpg")}
          />
          <View style={styles.buttonPadding}>
            <Button
              title="Manage Team"
              color={GlobalStyles.colors.heatherGrey}
            />
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <Button
            title="Edit Project"
            color={GlobalStyles.colors.heatherGrey}
            //should take you to manage project screen
            onPress={() => {
              navigation.navigate("EditProject", route.params);
            }}
          />
          <Button
            title="Delete Project"
            color={GlobalStyles.colors.errorRed}
            //should take you to manage project screen
            onPress={() => {
              Alert.alert(
                "Confirm",
                "Are you sure you wish to delete this project?",

                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel clicked"),
                  },
                  {
                    text: "Delete",
                    onPress: () => console.log("Delete clicked"),
                  },
                ]
              );
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  buttonPadding: {
    padding: 12,
    marginTop: 6,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    color: GlobalStyles.colors.orange100,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingBottom: 20,
    paddingTop: 20,
    borderColor: GlobalStyles.colors.midGrey,
    borderBottomWidth: 1,
  },
  pressed: {
    opacity: 0.75,
  },

  projectInnerContainer: {
    padding: 12,
    marginVertical: 8,
    marginBottom: 8,
    backgroundColor: "white",
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.shadows,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 4,
    shadowOpacity: 0.4,
  },
  textTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    marginBottom: 8,
  },
  textTitle2: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    marginBottom: 8,
  },
  textTitle3: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    opacity: 0.6,
    marginBottom: 8,
  },
  sepLine: {
    borderBottomColor: GlobalStyles.colors.heatherGrey,
    opacity: 0.5,
    borderTopWidth: 2,
    padding: 4,
    marginTop: 4,
    flex: 1,
  },
  sepLine2: {
    borderBottomColor: GlobalStyles.colors.lightGrey,
    opacity: 0.1,
    borderTopWidth: 1,
    padding: 4,
    marginTop: 4,
    marginBottom: 4,
    flex: 1,
  },
  textDate: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
    opacity: 0.5,
    borderColor: GlobalStyles.colors.shadows,
  },
  description: {
    color: "black",
    fontSize: 10,
    marginBottom: 4,
  },
  userList: {
    backgroundColor: GlobalStyles.colors.lightGrey,
    flex: 1,
    padding: 12,
  },
});

export default ProjectInfo;
