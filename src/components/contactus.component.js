import React, { Component } from "react";
import "../styles/contactus.css";
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
                  <Form>
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
                  </Form>
                </Card.Body>
              </Card>
              <Col>
                <Button
                  className="m-1"
                  variant="primary"
                  //onClick={() => this.method()}
                >
                  Submit Request
                </Button>
              </Col>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default ContactUs;
