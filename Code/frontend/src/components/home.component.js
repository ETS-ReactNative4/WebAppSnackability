import React, { Component } from 'react';

import { Card, Col, Container, Jumbotron, Row } from 'react-bootstrap';
import "../styles/home.css"


export default class HomeComponent extends Component {

    render() {
        return (

            <div>

                <div className="header text-center">
                    <h1 className="title">Welcome to Snackability</h1>
                    <span>
                        The goal of Snackability app is to help you identify healthy
                        snacks <br/> providing a score from 0 (not healthy) to 10 (very healthy) to each snack searched in
                        our app.
                    </span>
                </div>

                <Container fluid className="mt-4">

                    <Row className="text-center">
                        <Col>
                            <h3>Project Management</h3>
                        </Col>
                    </Row>

                    <Row className="mt-4">
                        <Col xs={12} sm={6} md={6} lg={{offset: 4, span: 2}}>
                            <Card>
                                <Card.Body className="text-center">
                                    <Card.Img variant="top" src="https://i.imgur.com/WeG8mAm.png" alt="Cristina Palacios"/>
                                    <Card.Title className="mt-3">
                                        <strong>Cristina Palacios</strong> <br/>
                                        <small><i>Associate Professor</i></small>
                                    </Card.Title>
                                    <Card.Text>
                                        <span>Florida International University</span>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col xs={12} sm={6} md={6} lg={{offset: 0, span: 2}}>
                            <Card>
                                <Card.Body className="text-center">
                                    <Card.Img variant="top" src="https://i.imgur.com/B1Imo2h.png" alt="Lukkamol Prapkre"/>
                                    <Card.Title className="mt-3">
                                        <strong>Lukkamol Prapkre</strong><br/>
                                        <small><i>PhD Student</i></small>
                                    </Card.Title>
                                    <Card.Text>
                                        <span>Florida International University</span>
                                    </Card.Text>

                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                </Container>

                <Jumbotron fluid className="position-absolute w-100 text-center mt-4">
                    <h6>Contact the Product Owner</h6>
                    <s>For questions or to provide feedback in regards to the Snackability app, please email Dr. Cristina Palacios:</s>
                    <p>crpalaci@fiu.edu</p>
                    <p>snackabilityapp@gmail.com</p>
                </Jumbotron>

            </div>
        );
    }
}
