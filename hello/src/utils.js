import React from "react";
import axios from "axios";
import firebase from "./firebase";

export const sendAxiosHit = async (q, idToken) => {
  const ADD_CUSTOMER = `mutation{
        insert_customers_one(
          object:{
            name:"mehak",
            email:"mehek@gmail.com",
            credit:2000,
            amount_paid:0,
            is_completed:false
            merchant_id:${idToken}
          }
        ) {
          id
          name
          email
          credit
          amount_paid
          is_completed
          merchant_id
        }
      }
      `;

  const GET_CUSTOMERS = `query{
        customers{
          id
          name
          email
          credit
          amount_paid
          is_completed
          merchant_id

        }
      }`;

  const UPDATE_CUSTOMER = `mutation{
        update_customers_by_pk(
          pk_columns:{id:2}
          _set:{name:"mehak2",amount_paid:"100"}
        ){
          id
          name
           email
                credit
                amount_paid
                is_completed
                merchant_id
        }
      }`;

  // if (is_loggedIn && token) {
  if (idToken) {
    try {
      const response = await axios.post(
        `https://immense-vulture-80.hasura.app/v1/graphql`,
        {
          query: GET_CUSTOMERS,
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
