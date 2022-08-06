import axios from "axios";

const DB_ROOT_URL = "https://automist-21dd6-default-rtdb.firebaseio.com/";

export async function storeProject(projectData) {
  //adding a project node to database via post request
  const response = await axios.post(DB_ROOT_URL + "projects.json", projectData);
  //Firebase's ID is refered to using the 'name' property. Retrieving firebase ID
  const id = response.data.name;
  return id;
}

//this function will yield a promise:  fetching project items from the database
export async function fetchProjects() {
  const response = await axios.get(DB_ROOT_URL + "projects.json");
  //this will only execute once we get a response from the server
  const projects = [];
  //console.log(response.data);
  //looping through all the response keys
  for (const key in response.data) {
    //create a new object based on data associated with Firebase ID key
    const projectObj = {
      id: key,
      title: response.data[key].title,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
      deadline: new Date(response.data[key].deadline),
    };
    //push incoming project object onto array of existing projects
    projects.push(projectObj);
  }
  //return projects with new obj from database
  return projects;
}

//project item ID and its data as params
export function updateProject(id, projectData) {
  //sending put request to send data, baking firebase ID for project item into DB URL
  //NOTE: Make sure projectData doesn't contain any ID's or keys
  return axios.put(DB_ROOT_URL + `/projects/${id}.json`, projectData);
}

export function deleteProject(id) {
  //sending delete request to a specified URL, targeting specified object
  return axios.delete(DB_ROOT_URL + `/projects/${id}.json`);
}
