import React, { useState, useEffect, useContext, createContext } from "react";
import { Link, useHistory } from "react-router-dom";
import firebase from "./firebase";

const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [userY, setUserY] = useState(null);
  const [iToken, setIToken] = useState();
  const history = useHistory();

  const signInWithGoogle = () => {
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((response) => {
        console.log("Signed In with Google");
        history.push("/dashboard");
        // return response.user;
      });
  };
  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUserY(false);
        console.log("logged out");
        window.location.reload(false);
        // history.push("/");
      });
  };
  const refreshToken = () => {
    console.log("rrefresh");
    firebase.auth().currentUser.getIdToken(true);
  };

  useEffect(() => {
    async function xx() {
      const unsubscribe = firebase.auth().onIdTokenChanged(async (user) => {
        console.log("token where it should be", user);

        if (user) {
          // debugger;
          console.log("where debu");
          const idToken = await user.getIdToken();
          console.log("inside 778", idToken);
          setIToken(idToken);
          setUserY(user);
        } else {
          setUserY(false);
        }
      });
      return () => unsubscribe();
    }

    xx();

    // Subscription unsubscribe function
  }, []);

  return {
    user: userY,
    idToken: iToken,
    signout,
    signInWithGoogle,
    refreshToken,
  };
}
