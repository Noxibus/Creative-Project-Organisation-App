import AuthContent from "../../components/auth/AuthContent";
import { useContext, useState } from "react";
import LoadingSpinner from "../../components/functional/ui/LoadingSpinner";
import { login } from "../../util/authentication/auth";
import { Alert } from "react-native";
import { AuthContext } from "../../store/auth-context";

function Login() {
  //loading state, initially set to false because we are not immediately authenticating when we load the screen
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);
  //props are some of the elements required by the request body payload from Firebase

  async function manageLogin({ email, password }) {
    //telling the system that we are now authenticating
    setIsAuthenticating(true);
    //handling login user errors
    try {
      //extracting token
      const token = await login(email, password);
      //passing token to auth context
      authCtx.authenticate(token);
    } catch (error) {
      //TODO: Match up Firebase errors with this message
      Alert.alert("Authentication failed");
    }
    //no longer authenticating
    setIsAuthenticating(false);
  }

  //if we are authenticating we want to show our loading spinner
  if (isAuthenticating) {
    return <LoadingSpinner message="Logging in" />;
  }

  return <AuthContent isLogin onAuthenticate={manageLogin} />;
}

export default Login;
