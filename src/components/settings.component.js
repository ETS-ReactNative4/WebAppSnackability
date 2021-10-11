import React, { Component } from "react";

import { Jumbotron, Tab, ListGroup, Col, Row } from "react-bootstrap";
import "../styles/settings.css";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faPlus,
  faHistory,
  faClinicMedical,
  faSignOutAlt,
  faAddressCard,
} from "@fortawesome/free-solid-svg-icons";

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
                    <span>
                      <FontAwesomeIcon icon={faAddressCard} />
                    </span>
                    About Us
                  </ListGroup.Item>
                  <ListGroup.Item action href="#link2">
                    <span>
                      <FontAwesomeIcon icon={faPlus} />
                    </span>
                    Add a Snack
                  </ListGroup.Item>
                  <ListGroup.Item action href="#link3">
                    <span>
                      <FontAwesomeIcon icon={faComment} />
                    </span>
                    Give Feedback
                  </ListGroup.Item>
                  <ListGroup.Item action href="#link4">
                    <span>
                      <FontAwesomeIcon icon={faHistory} />
                    </span>
                    Clear Search History
                  </ListGroup.Item>
                  <ListGroup.Item action href="#link5">
                    <span>
                      <FontAwesomeIcon icon={faClinicMedical} />
                    </span>
                    Allergies
                  </ListGroup.Item>

                  <ListGroup.Item action href="#link7">
                    <span>
                      <FontAwesomeIcon icon={faSignOutAlt} />
                    </span>
                    Logout
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      </div>
    );
  }
}
