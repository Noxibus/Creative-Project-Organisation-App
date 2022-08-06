import axios from "axios";

//API Key for the Automist database on Firebase
const API_KEY = "AIzaSyBhsajuLOmuoC_mlEixbVcpK5PMEph206E";

//params are request body payload for firebase
async function authenticate(mode, email, password) {
  //dynamically generating URL
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
  const response = await axios.post(url, {
    //request body payload
    email: email,
    password: password,
    //rerutnSecureToken should always be true
    returnSecureToken: true,
  });
  //looking for signs of life
  console.log(response.data);
  //
  //extracting token, response and data are axios variables. idToken comes from firebase, we can find it in authentication responses from the log above
  //idToken is a oaram from Firebase response payload
  const token = response.data.idToken;
  return token;
}

//CreateUser and Login share the same logic from authenticate ^^^

//will always return a promise and a token
export function createUser(email, password) {
  //'signUp' comes from Firebase endpoint url
  return authenticate("signUp", email, password);
}

//returning token and promise
export function login(email, password) {
  //'signUpWithPassword' comes from Firebase endpoint url
  return authenticate("signInWithPassword", email, password);
}
