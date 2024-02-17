import React, { useRef } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import AuthRequest from "../../APIRequest/AuthRequest";
import FormValidation from "../../helper/FormValidation";
import ToastMessage from "../../helper/ToastMessage";

const RegisterUser = () => {
  const navigate = useNavigate();

  let nameRef,
    phoneRef,
    emailRef,
    passwordRef,
    confirmPasswordRef = useRef();

  const onRegistration = (e) => {
    e.preventDefault();

    if (FormValidation.isEmpty(nameRef.value)) {
      ToastMessage.errorMessage("Name is Required");
    } else if (!FormValidation.isMobile(phoneRef.value)) {
      ToastMessage.errorMessage("Invalid Phone Number");
    } else if (!FormValidation.isEmail(emailRef.value)) {
      ToastMessage.errorMessage("Invalid Email Address");
    } else if (FormValidation.isEmpty(passwordRef.value)) {
      ToastMessage.errorMessage("Password is Required");
    } else if (FormValidation.isEmpty(confirmPasswordRef.value)) {
      ToastMessage.errorMessage("Confirm Password is Required");
    } else if (passwordRef.value !== confirmPasswordRef.value) {
      ToastMessage.errorMessage("Password And Confirm Password Not Match");
    } else {
      AuthRequest.RegisterUser({
        Name: nameRef.value,
        Phone: phoneRef.value,
        Email: emailRef.value,
        Password: passwordRef.value,
      }).then((result) => {
        if (result) {
          navigate("/verify-account-sent-otp");
        }
      });
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={10} lg={10} className="" style={{ marginTop: "100px" }}>
          <Card className="w-90 p-4">
            <Card.Body>
              <Card.Title>Sign Up</Card.Title> <hr />
              <Form onSubmit={onRegistration}>
                <Row>
                  <Col md={6} className="p-2">
                    <Form.Group className="mb-3" controlId="name">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        ref={(input) => (nameRef = input)}
                        placeholder="Name"
                        className="form-control animated fadeInUp"
                        type="text"
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6} className="p-2">
                    <Form.Group className="mb-3" controlId="phone">
                      <Form.Label>User Phone</Form.Label>
                      <Form.Control
                        ref={(input) => (phoneRef = input)}
                        placeholder="User Phone"
                        className="form-control animated fadeInUp"
                        type="number"
                        min="1"
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6} className="p-2">
                    <Form.Group className="mb-3" controlId="email">
                      <Form.Label>User Email</Form.Label>
                      <Form.Control
                        ref={(input) => (emailRef = input)}
                        placeholder="User Email"
                        className="form-control animated fadeInUp"
                        type="email"
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6} className="p-2">
                    <Form.Group className="mb-3" controlId="Password">
                      <Form.Label>User Password</Form.Label>
                      <Form.Control
                        ref={(input) => (passwordRef = input)}
                        placeholder="User Password"
                        className="form-control animated fadeInUp"
                        type="password"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="p-2">
                    <Form.Group className="mb-3" controlId="Password">
                      <Form.Label>Confirm User Password</Form.Label>
                      <Form.Control
                        ref={(input) => (confirmPasswordRef = input)}
                        placeholder="Confirm User Password"
                        className="form-control animated fadeInUp"
                        type="password"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col className="p-2">
                    <Button
                      type="submit"
                      variant="success"
                      className="w-100 animated fadeInUp float-end"
                    >
                      Registration
                    </Button>
                  </Col>
                </Row>
              </Form>
              <div className="text-center w-100">
                <Link className="text-center" to="/login">
                  Sign In
                </Link>
                <br />
                <Link className="text-center" to="/send-otp">
                  Forget Password
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterUser;
