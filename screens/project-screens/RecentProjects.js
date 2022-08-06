/* eslint-disable react/react-in-jsx-scope */
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import ProjectsOutput from "../../components/functional/ProjectComponents/ProjectsOutput";
import ErrorIndicator from "../../components/functional/ui/ErrorIndicator";
import LoadingSpinner from "../../components/functional/ui/LoadingSpinner";
import { ProjectsContext } from "../../store/ProjectsContext";
import { getDateMinusDays } from "../../util/date";
import { fetchProjects } from "../../util/http";

function RecentProjects() {
  //state to manage behaviour of loading spinner, set to true initially because we will always be fetching some data when we load thiis screen
  const [isFetching, setIsFetching] = useState(true);
  //error state
  const [error, setError] = useState();
  //auth state for protected resources
  //ProtectedResourceFetcher();
  const projectsCtx = useContext(ProjectsContext);

  //useEffect function and promises don't mix wrell so nested function has been implemented
  useEffect(() => {
    async function getProjects() {
      setIsFetching(true);
      //try:catch for error handling
      try {
        //fetchProjects === yields a promise
        const projects = await fetchProjects();
        projectsCtx.setProjects(projects);
      } catch (error) {
        //TODO: Have this reflect messages being provided by Firebase
        setError("Could not fetch projects");
      }
      //once we have fetched projects we no longer have to fetch
      setIsFetching(false);
    }
    //this will update local state
    getProjects();
  }, []);

  function confirmError() {
    //set error back to null to remove error icon
    setError(null);
  }

  if (error && !isFetching) {
    //if we have an error and are not fetching data show error component
    return <ErrorIndicator message={error} onConfirm={confirmError} />;
  }

  if (isFetching) {
    //if we are fetching something from the backend, return this JSX code instead of the other JSX below
    return <LoadingSpinner message="Wating on server response" />;
  }

  //determine which projects are recent
  const recentProjects = projectsCtx.projects.filter((project) => {
    const today = new Date();
    const date30DaysAgo = getDateMinusDays(today, 30);
    return project.date >= date30DaysAgo && project.date <= today;
  });
  return (
    <>
      <ProjectsOutput
        projects={recentProjects}
        projectPeriod={"Last 30 Days"}
        fallbackText="No Projects in the Last 30 Days"
      />
    </>
  );
}

export default RecentProjects;
