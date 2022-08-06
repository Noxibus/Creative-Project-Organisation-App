//managing app-wide authentication context
import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  //methods for changing authentication state
  //this will be triggered when a user has authenticated successfully
  authenticate: (token) => {},
  //clears authentication status
  logout: () => {},
});

function AuthContextProvider({ children }) {
  //NOTE: we only get a token if a user has authenticated successfully, initially undefined because when we first load the app we have no token
  const [authToken, setAuthToken] = useState();
  //getting an item from storage by its key
  useEffect(() => {
    function fetchToken() {
      //getItem returns a promise
      const storedToken = AsyncStorage.getItem("token");
      //if stored token is truthy, ie we find one
      if (storedToken) {
        //only auto-login if you find a stored token
        setAuthToken(storedToken);
      }
    }
    fetchToken();
  }, []);
  //this function should be triggered whe a user logs in successfully
  function authenticate(token) {
    //set our authorisation token to the one we are passed
    setAuthToken(token);
    //we also want to store the login token to the device using asyncStorage library: this will store the authenticated status
    AsyncStorage.setItem("token", token);
  }

  function logout() {
    //clear authentication token
    setAuthToken(null);
  }

  const value = {
    token: authToken,
    //converting truthy value
    isAuthenticated: !!authToken,
    //exposing these functions to ap wide context
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
