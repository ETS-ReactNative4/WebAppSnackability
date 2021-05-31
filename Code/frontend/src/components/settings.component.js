import React, { Component } from 'react';

import {Jumbotron,Tab,ListGroup,Col,Row} from 'react-bootstrap';
import "../styles/settings.css"


export default class SettingsComponent extends Component {

    render() {
        return (

            <div>
                <div>
                    <Tab.Container id="list-group-tabs-example">
                        <Row>
                            <Col sm={12}>
                                <ListGroup>
                                    <ListGroup.Item action href="#link1">
                                        ❔ About Us
                                    </ListGroup.Item>
                                    <ListGroup.Item action href="#link2">
                                        ➕ Add a Snack
                                    </ListGroup.Item>
                                    <ListGroup.Item action href="#link3">
                                        🗨 Give Feedback
                                    </ListGroup.Item>
                                    <ListGroup.Item action href="#link4">
                                        🧺 Clear Search History
                                    </ListGroup.Item>
                                    <ListGroup.Item action href="#link5">
                                        ❗ Allergies
                                    </ListGroup.Item>
                                    <ListGroup.Item action href="#link6">
                                        🔧 Admin
                                    </ListGroup.Item>
                                    <ListGroup.Item action href="#link7">
                                        👋 Logout
                                    </ListGroup.Item>                                                                                                                                                                                                                       
                                </ListGroup>
                            </Col>
                        </Row>
                    </Tab.Container>
                </div>

                <Jumbotron fluid className="position-absolute w-100 text-center mt-4">
                    <h6>Contact the Product Owner</h6>
                    <p>For questions or to provide feedback in regards to the Snackability app, please email
                        Dr. Cristina Palacios:</p>
                    <p>crpalaci@fiu.edu</p>
                    <p>snackabilityapp@gmail.com</p>
                </Jumbotron>
            </div>
        );
    }
}
