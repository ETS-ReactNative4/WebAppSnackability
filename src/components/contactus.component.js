import React, { Component } from "react";
import "../styles/contactus.css";
import axios from "axios";
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

class ContactUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
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

  onMessageChange(event) {
    this.setState({ message: event.target.value });
  }

  sendMessage(e) {
    e.preventDefault();
    axios({
      method: "POST",
      url: process.env.REACT_APP_API_ENDPOINT + "/send",
      data: this.state,
    }).then((response) => {
      if (response.data.status === "success") {
        this.setState({isSuccess:true, isError: false, success:"Message Sent!"});
        this.resetForm();
      } else if (response.data.status === "fail") {
        this.setState({isError:true, isSuccess: false, error:"Message Failed to Send!"});
      }
    });
  }

  resetForm() {
    this.setState({ firstName: "", lastName: "", email: "", message: "",});
  }

  render() {
    return (
      <div>
        <div className="contactHeader text-center">
          <h1 className="contactTitle">Contact Us</h1>
          <span>
            If you would like to request an account
            <br /> or experience any issues while using this app,
            <br /> fill out the form below for assistance.
          </span>
        </div>
        <Container className="mt-3">
          <Row className="justify-content-md-center">
            <Col xs={12} sm={7}>
              <Card>
                <Card.Body>
                  <Form id="contact-form" onSubmit={this.sendMessage.bind(this)} method="POST">
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
                    <Alert variant="success" show={this.state.isSuccess}> {this.state.success} </Alert>
                    <Alert variant="danger" show={this.state.isError}> {this.state.error} </Alert>
                    <Button
                      className="m-1"
                      variant="primary"
                      type="submit"
                      //onClick={() => this.method()}
                    >
                      Submit Request
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
              <Col></Col>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default ContactUs;
