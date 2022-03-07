import React, { useState, useEffect } from "react";
import { Card, Col, Container, Row, Table } from "react-bootstrap";
import { defaults } from "react-chartjs-2";
import "../styles/achievements.css";
import achievement_red_apples from "../images/achievements/achievement-red-apples.png";
import achievement_golden_apples from "../images/achievements/achievement-golden-apples.png";
import achievement_paleo from "../images/achievements/achievement-paleo.png";
import achievement_saltbae from "../images/achievements/achievement-saltbae.png";
import achievement_sugar from "../images/achievements/achievement-sugar.png";
import achievement_red_warrior from "../images/achievements/achievement-red-warrior-3.png";
import achievement_golden_warrior from "../images/achievements/achievement-golden-warrior.png";
import achievement_doubleXP_warrior from "../images/achievements/achievement-double-xp-warrior.png";
import { fetSnackScore, fetUserData } from "../services/score.service.js";

const Achievement = ({ name, image, desc, level, date }) => (
  <tr className="achievement-row">
    <th
      scope="row"
      className="achievement-title-row d-flex flex-row align-items-center text-center"
    >
      <img className="achievement-image" src={image} />
      <div className="achievement-name m-3">{name}</div>
      {/* Achievement description template goes here, changes to achievements.css may be necessary. */}
    </th>
    <td className="achievement-level">
      <p>{level}</p>
    </td>
    <td className="achievement-date">
      <p>{date}</p>
    </td>
  </tr>
);

function SnackAchievements() {
  const [redApples, setRedApples] = useState(0);
  const [goldenApples, setGoldenApples] = useState(0);
  const [paleoLvl, setPaleoLvl] = useState(0);
  const [saltbaeLvl, setSaltbaeLvl] = useState(0);
  const [sugarLvl, setSugarLvl] = useState(0);

  const getAchievement = () => {
    fetUserData()
      .then((response) => response.data)
      .then((user_data) => {
        console.log(user_data[0]);
        setRedApples(user_data[0].red_apples);
        setGoldenApples(user_data[0].golden_apples);
        setPaleoLvl(user_data[0].achievements.paleo);
        setSaltbaeLvl(user_data[0].achievements.saltbae);
        setSugarLvl(user_data[0].achievements.sugar);
      });
  };

  useEffect(() => {
    getAchievement();
  }, []);

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
                name="Red Apples"
                image={achievement_red_apples}
                level={redApples}
                date="XX-XX-XXXX"
              />
              <Achievement
                name="Golden Apples"
                image={achievement_golden_apples}
                level={goldenApples}
                date="XX-XX-XXXX"
              />
              <Achievement
                name="Paleo"
                image={achievement_paleo}
                level={paleoLvl}
                date="XX-XX-XXXX"
              />
              <Achievement
                name="Saltbae"
                image={achievement_saltbae}
                level={saltbaeLvl}
                date="XX-XX-XXXX"
              />
              <Achievement
                name="Sugar Fighter"
                image={achievement_sugar}
                level={sugarLvl}
                date="XX-XX-XXXX"
              />
              {/* <Achievement
                name="Red Warrior"
                image={achievement_red_warrior}
                level={paleoLvl}
                date="01-31-2022"
              />
              <Achievement
                name="Golden Warrior"
                image={achievement_golden_warrior}
                level="26"
                date="01-25-2022"
              />
              <Achievement
                name="Double XP Warrior"
                image={achievement_doubleXP_warrior}
                level="12"
                date="01-28-2022"
              /> */}
            </tbody>
          </Table>
        </Card>
      </Row>
    </Container>
  );
}

export default SnackAchievements;
