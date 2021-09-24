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
      isSuccess: false,
      success: "",
      isError: false,
      error: "",
      selectedOption: "User",
      value: "",
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

  onUserChange(event) {
    this.setState({ selectedOption: event.target.value });
  }

  // onPasswordChange = (event) => {
  //   this.setState({ password: event.target.value });
  // }

  resetForm() {
    this.setState({ firstName: "", lastName: "", email: "", password: "" });
  }

  getPassword(pass) {
    this.setState({ password: pass });
  }

  validateAndSend(e) {
    e.preventDefault();
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(this.state.email)) {
      this.setState({
        isError: true,
        isSuccess: false,
        error: "Email Invalid!",
      });
    } else if (this.state.password.length < 6) {
      this.setState({
        isError: true,
        isSuccess: false,
        error: "No password!",
      });
    } else {
      this.setState({
        isError: false,
        isSuccess: false,
        error: "No password!",
      });
      this.accountCreation();
    }
  }

  accountCreation() {
    const params = new URLSearchParams();
    params.append("name", this.state.firstName + this.state.lastName);
    params.append("email", this.state.email);
    params.append("password", this.state.password);
    params.append("role", this.state.selectedOption);

    axios({
      method: "POST",
      Header: "Content-Type: application/x-www-form-urlencoded",
      url: process.env.REACT_APP_API_ENDPOINT + "/user/create",
      data: {
        params: {
          name: "name",
          email: "email",
          password: "password",
          role: "role",
        },
      },
    }).then((response) => {
      if (response.status === "200") {
        this.setState({
          isSuccess: true,
          isError: false,
          success: "Account created!",
        });
        this.resetForm();
      } else if (response.status === "400" || response.status === "500") {
        this.setState({
          isError: true,
          isSuccess: false,
          error: "Failed to create account! Verify information and try again.",
        });
      }
    });
  }

  render() {
    return (
      <div>
        <div className="createAccountHeader text-center">
          <h1 className="createAccountTitle">Create Account</h1>
        </div>
        <Container className="mt-3">
          <Form
            id="createAccount-form"
            //create account method
            onSubmit={this.validateAndSend.bind(this)}
            method="POST"
          >
            <Row className="justify-content-md-center">
              <Col xs={12} sm={7}>
                <Card>
                  <Card.Body>
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
                    Select Role
                    <Col>
                      <label>
                        <input
                          type="radio"
                          value="User"
                          checked={this.state.selectedOption === "User"}
                          onChange={this.onUserChange.bind(this)}
                        />
                        User
                      </label>
                    </Col>
                    <Col>
                      <label>
                        <input
                          type="radio"
                          value="Admin"
                          checked={this.state.selectedOption === "Admin"}
                          onChange={this.onUserChange.bind(this)}
                        />
                        Admin
                      </label>
                    </Col>
                    <RandomPassword getPass={this.getPassword.bind(this)} />
                    <Alert variant="success" show={this.state.isSuccess}>
                      {" "}
                      {this.state.success}{" "}
                    </Alert>
                    <Alert variant="danger" show={this.state.isError}>
                      {" "}
                      {this.state.error}{" "}
                    </Alert>
                  </Card.Body>
                </Card>
                <Button
                  className="m-1"
                  variant="primary"
                  type="submit"
                  //onClick={this.validateAndSend.bind(this)}
                >
                  Create account as {this.state.selectedOption}
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    );
  }
}

export default CreateAccount;
