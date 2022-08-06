import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../store/auth-context";

function ProtectedResourceFetcher() {
  const [fetchedMessage, setFetchedMessage] = useState("");
  const authCtx = useContext(AuthContext);
  //accessing our token to prove to Firebase we are authenticated
  const token = authCtx.token;
  useEffect(() => {
    //sending the token to Firebase to prove we are authenticated
    axios
      .get(
        "https://automist-21dd6-default-rtdb.firebaseio.com/message.json?auth=" +
          token
      )
      .then((response) => {
        setFetchedMessage(response.data);
      });
  }, [token]);
}

export default ProtectedResourceFetcher;
