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

export default function Dashboard(props) {
  const auth = useAuth();
  console.log("dashboard auth", auth);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div>
        <Row>
          <Col md={6}>
            <div
              className="home-hero justify-content-center"
              style={{ padding: 40 }}
            >
              <h1 className="text-center">Welcome Mehak</h1>
            </div>
          </Col>
        </Row>
      </div>
      <div className="container-fluid d-flex justify-content">
        <div className="row">
          <div className="col-md-4">
            <Card />
          </div>
          <div className="col-md-4">
            <Card />
          </div>
          <div className="col-md-4">
            <Card />
          </div>
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
                <Form.Control type="text" placeholder="Enter name" />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <Form.Group>
                <Form.Label>Credit</Form.Label>
                <Form.Control type="text" placeholder="Enter credit amount" />
              </Form.Group>

              <Form.Group>
                <Form.Label>Paid amount</Form.Label>
                <Form.Control type="text" placeholder="0" />
              </Form.Group>
              <Form.Group>
                <Button variant="primary" type="submit">
                  Save
                </Button>
              </Form.Group>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
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
