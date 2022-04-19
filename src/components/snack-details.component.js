import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faInfoCircle, faMinus, faTimes, faUtensils } from '@fortawesome/free-solid-svg-icons';
import { Alert, Button, ButtonGroup, Card, Col, Container, Dropdown, Form, Modal, Row, Spinner, Table } from 'react-bootstrap';

import { calculateSnackScore, postSnackScore } from '../services/score.service.js';
import { fetchSnackByIDUSDA } from '../services/snack.service.js';

import foodPic from '../images/foodinfo.png';

function generateDataTable(score) {

    function generateIcon(tempScore, maxScore) {
        if (tempScore <= 0) {
            return faTimes;
        } else if (tempScore === maxScore) {
            return faCheck;
        } else {
            return faMinus;
        }
    }

    return [
        {
            firstIcon: <FontAwesomeIcon icon={faInfoCircle}/>,
            criteria: 'First Ingredient',
            score: score.firstIngredient,
            maxscore: '2',
            lastIcon: (
                <FontAwesomeIcon icon={ generateIcon(score.firstIngredient, 2) }/>
            ),
            message: 'Points if it is a fruit, vegetables, dairy, protein, or whole grain.',
        },
        {
            firstIcon: <FontAwesomeIcon icon={faInfoCircle}/>,
            criteria: 'Total Calories',
            score: score.calories,
            maxscore: '2',
            lastIcon: <FontAwesomeIcon icon={ generateIcon(score.calories, 2) }/>,
            message: '2 Points if < 200 kcal.',
        },
        {
            firstIcon: <FontAwesomeIcon icon={faInfoCircle}/>,
            criteria: 'Fat',
            score: score.totalFat,
            maxscore: '1',
            lastIcon: <FontAwesomeIcon icon={ generateIcon(score.totalFat, 1) }/>,
            message: '1 Point if < 35% kcal from fat.',
        },
        {
            firstIcon: <FontAwesomeIcon icon={faInfoCircle}/>,
            criteria: 'Saturated Fat',
            score: score.satFat,
            maxscore: '1',
            lastIcon: <FontAwesomeIcon icon={ generateIcon(score.satFat, 1) }/>,
            message: '1 Point if < 10% kcal from fat.',
        },
        {
            firstIcon: <FontAwesomeIcon icon={faInfoCircle}/>,
            criteria: 'TransFat',
            score: score.transFat,
            maxscore: '1',
            lastIcon: <FontAwesomeIcon icon={ generateIcon(score.transFat, 1) }/>,
            message: '1 Point if 0g.',
        },
        {
            firstIcon: <FontAwesomeIcon icon={faInfoCircle}/>,
            criteria: 'Sodium',
            score: score.sodium,
            maxscore: '1',
            lastIcon: <FontAwesomeIcon icon={ generateIcon(score.sodium, 1) }/>,
            message: '1 Point if < 200 mg.',
        },
        {
            firstIcon: <FontAwesomeIcon icon={faInfoCircle}/>,
            criteria: 'Sugar',
            score: score.sugar,
            maxscore: '2',
            lastIcon: <FontAwesomeIcon icon={ generateIcon(score.sugar, 2) }/>,
            message: '2 Points if < 35%.',
        },
        {
            firstIcon: <FontAwesomeIcon icon={faInfoCircle}/>,
            criteria: 'Processed',
            score: score.processed,
            maxscore: '1',
            lastIcon: <FontAwesomeIcon icon={ generateIcon(score.processed, 1) }/>,
            message: '+1 Point if not processed.',
        },
    ];
}

const ScoreRow = ({data}) => {
    return (
        <tr>
            <td title={data.message}>{data.firstIcon}</td>
            <td>{data.criteria}</td>
            <td>{data.score}</td>
            <td>{data.maxscore}</td>
            {<td>{data.lastIcon}</td>}
        </tr>
    );
};

export function SnackDetailsComponent(props) {

    const [snack, setSnack] = useState({});
    const [score, setScore] = useState({});
    const [portion, setPortion] = useState('100');
    const [unit, setUnit] = useState('g');
    const [isLoading, setIsLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [modal, setModal] = useState(false);

    useEffect(async () => {
        _toggle = _toggle.bind(this);
        fetchSnackUSDA();
    }, []);


    function fetchSnackUSDA() {
        setIsLoading(true);
        fetchSnackByIDUSDA(props.match.params.snack_id)
            .then((response) => response.data)
            .then((snack) => {
                setSnack(snack);
                setIsLoading(false);
            })
            .catch((error) => {
                setIsLoading(false);
            });
    }

    function calculateScore() {
        setIsLoading(true);
        console.log(snack);
        calculateSnackScore(snack.fdcId, portion, unit)
            .then(response => response.data)
            .then(score => {
                setScore(score);
                setShowResults(true);
                setIsLoading(false);
            })
            .catch(error => {
                console.error(error);
                setIsLoading(false);
            })
    }

    function consumeSnack() {
        postSnackScore(snack.fdcId, score, snack.description, snack.brandName, portion, unit)
            .then((response) => response.data)
            .then((score) => {
                props.history.push({
                    pathname: '/snacks-graph',
                });
            })
            .catch((error) => {
                setIsLoading(false);
            });
    }

    function getScoreBreakdown() {
        const dataTable = generateDataTable(score);
        return dataTable.map((item, i) => <ScoreRow data={item} key={i}/>);
    }

    function _toggle() {
        setModal(!modal);
    }

    return (
        <Container className="mt-4">
            <Row className="text-center" style={{ display: showResults ? 'none' : '' }}>
                <Col>
                    <Card>
                        <Card.Body>

                            <Card.Title>Snack Calculator Score</Card.Title>

                            <Form.Group style={{width: '300px', margin: '10px auto'}}>
                                <Form.Label>Portion Size ({ unit }):</Form.Label>
                                <Row>
                                    <Col xs={12} md={8}>
                                        <Form.Control
                                            type="number"
                                            placeholder={`${ portion } ${ unit }`}
                                            onChange={(e) => setPortion(e.target.value)}
                                        />
                                    </Col>
                                    <Col>
                                        <Dropdown as={ButtonGroup}>
                                            <Button size="sm">Unit</Button>
                                            <Dropdown.Toggle split variant="primary" id="dropdown-split-basic"></Dropdown.Toggle>
                                            <Dropdown.Menu id="dropdown-units-button" title="Units">
                                                <Dropdown.Item onClick={() => {setUnit('g');}}>Grams</Dropdown.Item>
                                                <Dropdown.Item onClick={() => {setUnit('tbsp');}}>Tablespoon</Dropdown.Item>
                                                <Dropdown.Item onClick={() => {setUnit('tsp');}}>Tea Spoon</Dropdown.Item>
                                                <Dropdown.Item onClick={() => {setUnit('oz');}}>Ounces</Dropdown.Item>
                                                <Dropdown.Item onClick={() => {setUnit('kg');}}>Kilograms</Dropdown.Item>
                                                <Dropdown.Item onClick={() => {setUnit('lbs');}}>Pounds</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </Col>
                                </Row>

                                <div>
                                    <Button variant="link" onClick={ _toggle }>
                                        Not sure how much?
                                    </Button>
                                </div>
                            </Form.Group>

                            <Modal show={ modal } onHide={ _toggle }>
                                <Modal.Header closeButton="true"/>
                                <Modal.Body>
                                    <img style={{width: '460px'}} src={foodPic} alt=""/>
                                </Modal.Body>
                            </Modal>

                            <Button variant="primary" onClick={ () => calculateScore() } hidden={ isLoading }>
                                Calculate Score
                            </Button>
                            <Button variant="primary" disabled hidden={ !isLoading }>
                                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>&nbsp;Loading...
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <br></br>

            <Alert variant={'primary'} style={{display: showResults ? '' : 'none'}}>
                { score && score.scoreFeedback }
            </Alert>

            <Row className="mt-4" style={{
                width: '1350px',
                margin: '30px auto',
                display: showResults ? '' : 'none',
            }}>
                <Col xs={24} md={10}>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                <center>
                                    <p>
                                        <strong>Score Breakdown for {snack ? snack.description : ''}</strong>
                                    </p>
                                </center>
                            </Card.Title>

                            <Table striped hover>
                                <thead>
                                <tr>
                                    <th></th>
                                    <th>Criteria</th>
                                    <th>Score</th>
                                    <th>Max Score</th>
                                </tr>
                                </thead>

                                <tbody>
                                    { score && getScoreBreakdown() }
                                    <tr>
                                        <th></th>
                                        <th>Total Score</th>
                                        <td colSpan="3">{ score && score.total }</td>
                                    </tr>

                                </tbody>

                            </Table>
                            <p style={{ color: 'grey' }}>
                                Ingredients: {snack ? snack.ingredients : ''}
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <br></br>
{/*
            <Alert variant={'primary'} style={{display: showResults ? '' : 'none'}}>
                { score && score.nutritionFeedback }
            </Alert> */}

            <Row className="text-center" style={{ display: showResults ? '' : 'none' }}>
                <Col>
                    <Button className="m-1" variant="primary" onClick={ () => consumeSnack() }>
                        Consume <FontAwesomeIcon icon={faUtensils} />
                    </Button>
                    <Button className="m-1" variant="secondary" href="/snacks">
                        Return to search
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}
