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
                                        <Form.Label>First Name</Form.Label>
                                        <InputGroup className="mb-3">
                                            <Form.Control placeholder="John" />
                                        </InputGroup>
                                    </Col>
                                    <Col>
                                        <Form.Label>Last Name</Form.Label>
                                        <InputGroup className="mb-3">
                                            <Form.Control placeholder="Smith" />
                                        </InputGroup>
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