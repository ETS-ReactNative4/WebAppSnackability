import React, { Component } from 'react';

import {/* Card, Col, Container, */Jumbotron/*, Row */} from 'react-bootstrap';
import "../styles/home.css"


export default class HomeComponent extends Component {

    render() {
        return (

            <div>
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
