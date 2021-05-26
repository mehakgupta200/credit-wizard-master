import React from "react";
import axios from "axios";
import firebase from "./firebase";

export const sendAxiosHit = async (q, idToken) => {
  // if (is_loggedIn && token) {
  if (idToken) {
    try {
      const response = await axios.post(
        `https://immense-vulture-80.hasura.app/v1/graphql`,
        {
          query: q,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-hasura-admin-secret":
              "E7qOjoaTDeYc2fPDFhYKnSh6wZWjbfEbwhsyc9QyNndq9Q4jgVZ7SJFwv25GPvez",
            // Authorization: token ? "Bearer " + token : "",
            // "X-Scookie": sessionCookie,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("error IN sendAxiosHit", error.message);
      throw new Error(error.message);
    }
  } else {
    throw new Error("Person is not logged in/Not correct user");
  }
};
