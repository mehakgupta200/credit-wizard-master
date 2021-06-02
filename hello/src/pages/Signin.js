import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import firebase from "../firebase";
import Navbar from '../components/NavBar'
import { Button } from "../components/ButtonElement";

const SigninPage = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSignup = () => {
    firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((response) => {
        console.log("Signed In with Google");
        history.push("/dashboard");
        // return response.user;
      });
  };

  return (
    <>
    <section className="login">
      <div className="loginContainer">
        <div className="btnContainer">
          <Button onClick={handleSignup}>
            Sign In with Google
          </Button>
        </div>
      </div>
    </section>
    </>
  );
};

export default SigninPage;
