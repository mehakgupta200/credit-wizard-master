import React, { useState, useEffect } from "react";
import { sendAxiosHit } from "../utils";
import { useAuth } from "../auth";
import "bootstrap/dist/css/bootstrap.min.css";
import "./card-style.css";
import Form from "react-bootstrap/Form";

export default function Card(props) {
  const { item, auth, getCustomers } = props;
  const [bal, setBal] = useState();
  console.log("me");
  const [paidAmount, setPaidAmount] = useState(item.amount_paid);
  console.log("item and aurt and getCustomers", item, auth, getCustomers);

  async function updateCustomer(value) {
    const UPDATE_CUSTOMER = `mutation{
        update_customers_by_pk(
          pk_columns:{id:${item.id}}
          _set:{amount_paid:${value},
        balance:${item.credit - value}}
        ){
          id
          name
           email
                credit
                amount_paid
                is_completed
                merchant_id
                balance
        }
      }`;

    try {
      const response = await sendAxiosHit(UPDATE_CUSTOMER, auth.idToken);
      console.log("user deets", response);
      if (response.errors && response.errors.length !== 0) {
        console.log("fb expire error");
      } else if (response?.data?.update_customers_by_pk) {
        console.log("in update if ", response);
        // calculateBalance(value);
        window.location.reload(false);
      }
      return response;
    } catch (error) {
      console.log("Error?????", error);
      return { error: error };
    }
  }

  return (
    <div className="card">
      <div className="card-body text-dark">
        <Form>
          <Form.Group>
            <Form.Label>name</Form.Label>
            <Form.Control type="text" value={item.name} readOnly />

            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" value={item.email} readOnly />

            <Form.Label>Credit</Form.Label>
            <Form.Control
              type="text"
              //   placeholder="Enter credit amount"
              value={item.credit}
              readOnly
            />

            <Form.Label>Paid amount</Form.Label>
            <Form.Control
              type="text"
              defaultValue={item.amount_paid}
              onChange={(e) => {
                setPaidAmount(e.target.value);
              }}
            />
            <Form.Label>Balance</Form.Label>
            <Form.Control type="text" value={item.balance} readOnly />
          </Form.Group>
        </Form>
        <br></br>
        <button
          type="button"
          class="btn btn-outline-success"
          onClick={() => {
            console.log("paidAmount", paidAmount);
            updateCustomer(paidAmount);
          }}
        >
          Add Transaction
        </button>
        <button
          type="button"
          class="btn btn-outline-success"
          onClick={() => {
            console.log("paidAmount", paidAmount);
          }}
        >
          Delete Customer
        </button>
      </div>
    </div>
  );
}
