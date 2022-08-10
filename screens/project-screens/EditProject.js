/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
//need to know what project id we're editing

import { useContext, useLayoutEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import IconButton from "../../components/functional/ui/IconButton";
import { GlobalStyles } from "../../util/constants/styles";
import { ProjectsContext } from "../../store/ProjectsContext";
import ProjectInputForm from "../../components/functional/ProjectComponents/ProjectInputForm";
import { storeProject, updateProject, deleteProject } from "../../util/http";
import LoadingSpinner from "../../components/functional/ui/LoadingSpinner";
import ErrorIndicator from "../../components/functional/ui/ErrorIndicator";

//TODO: CANCEL VALIDATION LOGIC FOR EDITING PROJECTS

//project item has ID => add project || already has an ID => edit screen
//'route' prop to extract ID
function EditProject({ route, navigation }) {
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
    navigation.setOptions({
      title: "Edit Project",
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
        submitButtonLabel={"Update"}
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

export default EditProject;

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
