import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import firebase from "../firebase";

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
    <section className="login">
      <div className="loginContainer">
        {/* <label>Username</label>
        <input
          type="text"
          required
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          required
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /> */}
        <div className="btnContainer">
          <button className="googleButton" onClick={handleSignup}>
            Sign In with Google
          </button>
        </div>
      </div>
    </section>
  );
};

export default SigninPage;
