/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { useContext, useLayoutEffect, useState } from "react";
import { View, StyleSheet } from "react-native";

import ProjectInputForm from "../../components/functional/ProjectComponents/ProjectInputForm";
import IconButton from "../../components/functional/ui/IconButton";
import { ProjectsContext } from "../../store/ProjectsContext";
import { GlobalStyles } from "../../util/constants/styles";
import { storeProject, updateProject, deleteProject } from "../../util/http";

//project item has ID => add project || already has an ID => edit screen
//'route' prop to extract ID
function ManageProjects({ route, navigation }) {
  const [isSendingData, setIsSendingData] = useState();
  //error state
  const [error, setError] = useState();
  const projectsCtx = useContext(ProjectsContext);
  //id used to fetch project items
  const editedId = route.params?.id;
  //convert to bool
  const isEditing = !!editedId;
  //find a specific project, return true if the project is the one we are looking for
  const selectedProject = projectsCtx.projects.find(
    (project) => project.id === editedId
  );

  useLayoutEffect(() => {
    //set title dynamically
    navigation.setOptions({
      title: isEditing ? "Edit Project" : "Add Project",
    });
  }, [navigation, isEditing]);

  async function deleteProjectHandler() {
    //telling the function we're submitting data and updating local state accordingly
    setIsSendingData(true);
    try {
      await deleteProject(editedId);
      //delete project locally
      projectsCtx.deleteProject(editedId);
      //then delete on the backend
      navigation.goBack();
    } catch (error) {
      setError("Unable to delete project");
      setIsSendingData(false);
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  //passing user data to the context when we hit confirm
  async function confirmHandler(projectData) {
    //we will either be sending add or update data when we click 'confirm'
    setIsSendingData(true);
    try {
      if (isEditing) {
        //update an existing project locally
        projectsCtx.updateProject(editedId, projectData);
        //then update on backend
        await updateProject(editedId, projectData);
      } else {
        //add a project to database and local
        //getting the ID associated with the add promise
        const id = await storeProject(projectData);
        projectsCtx.addProject({ ...projectData, id: id });
      }
      navigation.goBack();
    } catch (error) {
      setError("Could not connect to database");
    }
  }

  //if we have an error and cannot send data:
  if (error && !isSendingData) {
    return <ErrorIndicator message={error} />;
  }

  if (isSendingData) {
    //if we are in the process of sending data, show this component
    return <LoadingSpinner message="Waiting on server response." />;
  }

  return (
    <View style={styles.container}>
      <ProjectInputForm
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        submitButtonLabel={isEditing ? "Update" : "Add"}
        defaultValues={selectedProject}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash-outline"
            color={GlobalStyles.colors.errorRed}
            size={36}
            onPress={deleteProjectHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageProjects;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    // borderTopWidth: 2,
    // borderTopColor: GlobalStyles.colors.orange300,
    alignItems: "center",
  },
});
