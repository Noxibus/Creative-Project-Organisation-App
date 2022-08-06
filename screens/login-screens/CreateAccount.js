import { useContext, useState } from "react";
import { Alert } from "react-native";
import AuthContent from "../../components/auth/AuthContent";
import LoadingSpinner from "../../components/functional/ui/LoadingSpinner";
import { AuthContext } from "../../store/auth-context";
import { createUser } from "../../util/authentication/auth";

function CreateAccount() {
  //loading state, initially set to false because we are not immediately authenticating when we load the screen
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);
  //props are some of the elements required by the request body payload from Firebase
  async function manageAccountCreation({ email, password }) {
    //telling the system that we are now authenticating
    setIsAuthenticating(true);
    try {
      //extracting token
      const token = await createUser(email, password);
      //passing token to auth context
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert("Could not create account");
    }

    //no longer authenticating
    setIsAuthenticating(false);
  }

  //if we are authenticating we want to show our loading spinner
  if (isAuthenticating) {
    return <LoadingSpinner message="Creating Account" />;
  }

  return <AuthContent onAuthenticate={manageAccountCreation} />;
}

export default CreateAccount;
