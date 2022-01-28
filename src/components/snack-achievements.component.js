import React from "react";
import { Card, Col, Container, Row, Table } from "react-bootstrap";
import { defaults } from "react-chartjs-2";
import "../styles/achievements.css";
import achievement_red_warrior from "../images/achievements/achievement-red-warrior.png";

defaults.plugins.legend.position = "top";
defaults.plugins.legend.title = {
  display: true,
  text: "Average Points Earned Daily",
  font: {
    size: 22,
  },
};

defaults.plugins.legend.labels.boxWidth = 0;

function SnackAchievements() {
  return (
    <Container className="mt-3" id="achievements">
      <Row className="justify-content-md-center m-0">
        <Card className="w-100">
          <div className="achievements-table-header text-center">
            <h4 className="m-3">Achievements</h4>
          </div>
          <Table hover className="mb-0">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Level</th>
                <th scope="col">Last Updated</th>
              </tr>
            </thead>
            <tbody>
              <tr className="achievement-row">
                <th
                  scope="row"
                  className="achievement-title-row d-flex flex-row align-items-center text-center"
                >
                  <img src={achievement_red_warrior} />
                  <div className="achievement-name m-3">Red Warrior</div>
                </th>
                <td>12</td>
                <td>01-28-2022</td>
              </tr>
              <tr className="achievement-row">
                <th
                  scope="row"
                  className="achievement-title-row d-flex flex-row align-items-center text-center"
                >
                  <img src={achievement_red_warrior} />
                  <div className="achievement-name m-3">Elite Warrior</div>
                </th>
                <td>12</td>
                <td>01-28-2022</td>
              </tr>
            </tbody>
          </Table>
        </Card>
      </Row>
    </Container>
  );
}

export default SnackAchievements;
