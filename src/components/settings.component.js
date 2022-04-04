import React, { Component } from "react";

import { Tab, ListGroup, Button, Col, Row } from "react-bootstrap";
import "../styles/settings.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faPlus,
  faHistory,
  faClinicMedical,
  faSignOutAlt,
  faAddressCard,
  faFileCsv
} from "@fortawesome/free-solid-svg-icons";

export class SettingsComponent extends Component {
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
                      <FontAwesomeIcon icon={faAddressCard} className="mr-2" />
                    </span>
                    About Us
                  </ListGroup.Item>
                  <ListGroup.Item action href="#link2">
                    <span>
                      <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    </span>
                    Add a Snack
                  </ListGroup.Item>
                  <ListGroup.Item action href="#link3">
                    <span>
                      <FontAwesomeIcon icon={faComment} className="mr-2" />
                    </span>
                    Give Feedback
                  </ListGroup.Item>
                  <ListGroup.Item action href="#link4">
                    <span>
                      <FontAwesomeIcon icon={faHistory} className="mr-2" />
                    </span>
                    Clear Search History
                  </ListGroup.Item>
                  <ListGroup.Item action href="#link5">
                    <span>
                      <FontAwesomeIcon icon={faClinicMedical} className="mr-2" />
                    </span>
                    Allergies
                  </ListGroup.Item>
                  {/* <ListGroup.Item action href="#link6">
                    <span>
                      <FontAwesomeIcon icon={faFileCsv} className="mr-2"/>
                    </span>
                    GenerateCSV
                  </ListGroup.Item> */}
                  <ListGroup.Item action href="#link7">
                    <span>
                      <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
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
