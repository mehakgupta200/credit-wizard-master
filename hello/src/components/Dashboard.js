import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import firebase from "../firebase";
import { sendAxiosHit } from "../utils";
import { useAuth } from "../auth";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "./CardUI";
import "./card-style.css";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Sidebar from "../components/Sidebar";
import {
  Nav,
  NavbarContainer,
  NavLogo,
  MobileIcon,
  NavMenu,
  NavItem,
  NavLinks,
  NavBtn,
  NavBtnLink,
  NavBtnLinkTwo,
} from "../components/NavBar/NavbarElements";
import { Navbar } from "react-bootstrap";

export default function Dashboard(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const [change, setChange] = useState(false);
  const auth = useAuth();
  console.log("dashboard auth", auth);
  const [show, setShow] = useState(false);
  const [customerArray, setCustomerArray] = useState([]);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [credit, setCredit] = useState();
  const [paid, setPaid] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function getCustomers() {
    const GET_CUSTOMERS = `query{
      customers{
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
      const response = await sendAxiosHit(GET_CUSTOMERS, auth.idToken);
      console.log("user deets", response);
      if (response.errors && response.errors.length !== 0) {
        console.log("fb expire error");
      } else if (
        response?.data?.customers &&
        response.data.customers.length !== 0
      ) {
        console.log("in if ", response);
        setCustomerArray(response.data.customers);
      }
      return response;
    } catch (error) {
      console.log("Error?????", error);
      return { error: error };
    }
  }

  async function enterCustomer() {
    handleClose();
    console.log("mehekk1");
    let balance = credit - paid;
    const ADD_CUSTOMER = `mutation{
    insert_customers_one(
      object:{
        name:"${name}",
        email:"${email}",
        credit:${credit},
        amount_paid:${paid},
        is_completed:false,
        merchant_id:"${auth.idToken}",
        balance:${balance}
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

    try {
      console.log("mehekk2");
      const response = await sendAxiosHit(ADD_CUSTOMER, auth.idToken);
      console.log("user deets", response);
      if (response.errors && response.errors.length !== 0) {
        console.log("fb expire error");
      } else if (
        response?.data?.customers &&
        response.data.customers.length !== 0
      ) {
        console.log("in if ", response);
        // setCustomerArray(response.data.customers);
      }
      window.location.reload(false);
      return response;
    } catch (error) {
      console.log("Error?????", error);
      return { error: error };
    }
  }

  useEffect(() => {
    if (auth && auth.user) {
      console.log("unique sa", auth.user, auth.user.displayName);
      getCustomers();
    }
  }, [auth, change]);

  console.log("customer arry", customerArray);

  return (
    <>
      {auth && auth.idToken ? (
        <>
          <Sidebar isOpen={isOpen} toggle={toggle} />
          <Navbar toggle={toggle} />
          <div>
            <Row>
              <Col md={6}>
                <div
                  className="home-hero justify-content-center"
                  style={{ padding: 40 }}
                >
                  <h1 className="text-center">
                    Welcome {auth.user.displayName}
                  </h1>
                </div>
              </Col>
            </Row>
          </div>
          <div className="container-fluid d-flex justify-content">
            <div className="row">
              {customerArray.length !== 0 &&
                customerArray.map((item) => (
                  <div className="col">
                    <Card item={item} auth={auth} getCustomers={getCustomers} />
                  </div>
                ))}
            </div>
            <div className="footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleShow}
              >
                ADD CUSTOMER
              </button>
            </div>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>ADD CUSTOMER</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group>
                    <Form.Label>name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter name"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Credit</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter credit amount"
                      onChange={(e) => {
                        setCredit(e.target.value);
                      }}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Paid amount</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="0"
                      onChange={(e) => {
                        setPaid(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Button
                      onClick={() => {
                        console.log("hewwo uwu");
                        enterCustomer();
                      }}
                    >
                      Save
                    </Button>
                  </Form.Group>
                </Form>
              </Modal.Body>
            </Modal>
          </div>
        </>
      ) : (
        <div> Not Logged In</div>
      )}
    </>
  );

  // return (
  //   <>
  //     {auth && auth.user ? (
  //       <div>
  //         <button
  //           onClick={() => {
  //             sendAxiosHit("q", auth.idToken);
  //           }}
  //         >
  //           hello {auth.idToken}
  //         </button>
  //       </div>
  //     ) : (
  //       <div> Not Logged In</div>
  //     )}
  //   </>
  // );
}
