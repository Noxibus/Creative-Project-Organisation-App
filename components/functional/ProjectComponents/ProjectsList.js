/* eslint-disable react/react-in-jsx-scope */
import { FlatList, Text } from "react-native";
import ProjectItem from "./ProjectItem";

function renderProjectItem(itemData) {
  return <ProjectItem {...itemData.item} />;
}

function ProjectList({ projects }) {
  return (
    <FlatList
      data={projects}
      renderItem={renderProjectItem}
      //using ID property in dummy project objects as key
      keyExtractor={(item) => item.id}
    />
  );
}

export default ProjectList;
