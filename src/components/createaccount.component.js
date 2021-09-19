import React, { Component } from "react";
import "../styles/createaccount.css";
import axios from "axios";
import RandomPassword from "./RandomPassword";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  FormControl,
  FormLabel,
  InputGroup,
  Row,
} from "react-bootstrap";

class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      message: "",
      isSuccess: false,
      success: "",
      isError: false,
      error: "",
    };
  }

  onFirstNameChange(event) {
    this.setState({ firstName: event.target.value });
  }

  onLastNameChange(event) {
    this.setState({ lastName: event.target.value });
  }

  onEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  onPasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  resetForm() {
    this.setState({ firstName: "", lastName: "", email: "", password: "" });
  }

  render() {
    return (
      <div>
        <div className="createAccountHeader text-center">
          <h1 className="createAccountTitle">Create Account</h1>
        </div>
        <Container className="mt-3">
          <Row className="justify-content-md-center">
            <Col xs={12} sm={7}>
              <Card>
                <Card.Body>
                  <Form
                    id="createAccount-form"
                    //create account method
                    // onSubmit={this.accountCreation.bind(this)}
                    // method="POST"
                  >
                    <Row>
                      <Col>
                        <Form.Group className="mb-3" controlId="firstName">
                          <Form.Label>First Name</Form.Label>
                          <Form.Control
                            placeholder="John"
                            required
                            value={this.state.firstName}
                            onChange={this.onFirstNameChange.bind(this)}
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group className="mb-3" controlId="lastName">
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control
                            placeholder="Smith"
                            required
                            value={this.state.lastName}
                            onChange={this.onLastNameChange.bind(this)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <Form.Group className="mb-3" controlId="email">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            placeholder="Enter email address"
                            required
                            value={this.state.email}
                            onChange={this.onEmailChange.bind(this)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <RandomPassword />
                    <Alert variant="success" show={this.state.isSuccess}>
                      {" "}
                      {this.state.success}{" "}
                    </Alert>
                    <Alert variant="danger" show={this.state.isError}>
                      {" "}
                      {this.state.error}{" "}
                    </Alert>
                  </Form>
                </Card.Body>
              </Card>
              <Button
                className="m-1"
                variant="primary"
                type="submit"
                //onClick={() => this.method()}
              >
                Create account
              </Button>
            </Col>
          </Row>
          <RandomPassword />
        </Container>
      </div>
    );
  }
}

export default CreateAccount;
