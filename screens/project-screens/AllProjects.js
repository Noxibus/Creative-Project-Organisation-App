/* eslint-disable react/react-in-jsx-scope */
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProjectsOutput from "../../components/functional/ProjectComponents/ProjectsOutput";
import { ProjectsContext } from "../../store/ProjectsContext";

function AllProjects() {
  //auth state for protected resources
  //ProtectedResourceFetcher();
  const projectsCtx = useContext(ProjectsContext);
  // const { projects } = useSelector((state) => state.project);
  // const dispatch = useDispatch;
  return (
    <>
      {/* //pointing to project array from context */}
      <ProjectsOutput
        projects={projectsCtx.projects}
        projectPeriod="All Projects"
        fallbackText={"No Projects"}
      />
    </>
  );
}

export default AllProjects;
