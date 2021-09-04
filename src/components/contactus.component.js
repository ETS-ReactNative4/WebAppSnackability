import React, { Component } from 'react';
import {
    Alert,
    Button,
    Card, Col, Container, Form,
    FormControl,
    FormLabel,
    InputGroup,
    Row,
} from 'react-bootstrap';

class ContactUs extends Component {

    constructor(props) {
        super(props);
        this.state = {
          firstName: '',
          lastName: '',
          email:'',
          message: ''
        }
    }

    onFirstNameChange(event) {
        this.setState({firstName: event.target.value})
    }

    onLastNameChange(event) {
        this.setState({lastName: event.target.value})
    }

    onEmailChange(event) {
        this.setState({email: event.target.value})
    }

    onMessageChange(event) {
        this.setState({message: event.target.value})
    }

    
    render() { 
        return (
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
                                            <Form.Control placeholder="John" required value={this.state.firstName} onChange={this.onFirstNameChange.bind(this)}/>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="lastName">
                                            <Form.Label>Last Name</Form.Label>
                                            <Form.Control placeholder="Smith" required value={this.state.lastName} onChange={this.onLastNameChange.bind(this)}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                 
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
        );
    }
}
 
export default ContactUs;