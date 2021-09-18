import React, { Component } from "react";
import "../styles/index.css";
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

class  ForgotPassword extends Component {
    constructor(props) {
      super(props);
      this.state = {
        email: "",
        isSuccess: false,
        success: "",
        isError: false,
        error: "",
      };
    }

    
  onEmailChange(event) {
    this.setState({ email: event.target.value });
  }
  sendMessage(e) {
    e.preventDefault();
    axios({
      method: "POST",
      url: process.env.REACT_APP_API_ENDPOINT + "/resetpassword/send",
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
    this.setState({email: ""});
  }

  render() {
    return (
      <div>
        <div className="contactHeader text-center">
          <h1 className="contactTitle">Reset Password</h1>
          <span>
            If you would like to reset Password
          </span>
        </div>
        <Container className="mt-3">
          <Row className="justify-content-md-center">
            <Col xs={12} sm={7}>
              <Card>
                <Card.Body>
                  <Form id="contact-form" onSubmit={this.sendMessage.bind(this)} method="POST">
                  <Form.Group className="mb-3" controlId="email">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            // email@address.com was annoying cause .com/.edu/.net etc..
                            placeholder="Enter email address"
                            required
                            value={this.state.email}
                            onChange={this.onEmailChange.bind(this)}
                          />
                        </Form.Group>
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

export default ForgotPassword;