import React, { Component } from "react";
import "../styles/forgotpassword.css";
import axios from "axios";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
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

  validateAndSend(e){
    e.preventDefault();
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if ( !re.test(this.state.email) ) {
      this.setState({isError:true, isSuccess: false, error:"Email Invalid!"});
    }
    else {
      this.setState({isError:false, isSuccess: false, error:""});
      this.sendMessage();
    }
  };

  sendMessage() {
    axios({
      method: "POST",
      url: process.env.REACT_APP_API_ENDPOINT + "/resetpassword/send",
      data: this.state,
    }).then((response) => {
        this.setState({isSuccess:true, isError: false, success:"Password reset email sent!"});
        this.resetForm();
    }).catch(error => {
      console.log(error);
      this.setState({isError:true, isSuccess: false, error: error.response.data.error});
    })
  }

  resetForm() {
    this.setState({email: ""});
  }

  render() {
    return (
      <div>
        <div className="forgotHeader text-center">
          <h1 className="forgotTitle">Forgot Password</h1>
        </div>
        <Container className="mt-3">
          <Row className="justify-content-md-center">
            <Col xs={12} sm={7}>
              <Card>
                <Card.Body>
                  <Form id="contact-form" onSubmit={this.validateAndSend.bind(this)} method="POST">
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