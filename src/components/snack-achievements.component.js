import React from "react";
import { Card, Col, Container, Row, Table } from "react-bootstrap";
import { defaults } from "react-chartjs-2";
import "../styles/achievements.css";
import achievement_red_warrior from "../images/achievements/achievement-red-warrior.png";

const Achievement = ({ name, image, level, date }) => (
  <tr className="achievement-row">
    <th
      scope="row"
      className="achievement-title-row d-flex flex-row align-items-center text-center"
    >
      <img className="achievement-image" src={image} />
      <div className="achievement-name m-3">{name}</div>
    </th>
    <td className="achievement-level">
      <p>{level}</p></td>
    <td className="achievement-date"><p>{date}</p></td>
  </tr>
);

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
              <Achievement
                name="Red Warrior"
                image={achievement_red_warrior}
                level="99"
                date="01-31-2022"
              />
              <Achievement
                name="Golden Warrior"
                image={achievement_red_warrior}
                level="26"
                date="01-25-2022"
              />
              <Achievement
                name="Elite Warrior"
                image={achievement_red_warrior}
                level="12"
                date="01-28-2022"
              />
            </tbody>
          </Table>
        </Card>
      </Row>
    </Container>
  );
}

export default SnackAchievements;
