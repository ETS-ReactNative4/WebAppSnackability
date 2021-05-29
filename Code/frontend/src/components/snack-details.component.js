import React, { Component } from 'react';
import { fetchSnackByID } from '../services/snack.service.js';
import SnackDetailsStyles from '../styles/snack-details.module.css';

import { Dropdown, Button, ButtonGroup, Card, Col, Container, Row, Table, Form } from 'react-bootstrap';

function  generateDataTable(score) {
    return [
        {
            criteria: 'First Ingredient',
            score: score.firstIngredient,
            maxscore: '2'
        },
        {
            criteria: 'Total Calories',
            score: score.calorieScore,
            maxscore: '2'
        },
        {
            criteria: 'Fat',
            score: score.totalFat,
            maxscore: '1'
        },
        {
            criteria: 'Saturated Fat',
            score: score.satFat,
            maxscore: '1'
        }, {
            criteria: 'TransFat',
            score: score.transFat,
            maxscore: '1'
        }, {
            criteria: 'Sodium',
            score: score.sodium,
            maxscore: '1'
        }, {
            criteria: 'Sugar',
            score: score.sugar,
            maxscore: '2'
        },
        {
            criteria: 'Processed',
            score: score.processed,
            maxscore: '1'
        }
    ];
}

const ScoreRow = ({data}) => {
    return (
        <tr>
            <td>{data.criteria}</td>
            <td>{data.score}</td>
            <td>{data.maxscore}</td>
        </tr>
    );
};

export default class SnackDetailsComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            snack: null,
            isLoading: false,
            unitCalc: "Grams",
            unit: "100 g",
            score: {
                gRatio: 0.0,
                totalScore: 0.0,
                firstIngredient: '',
                calories: 0.0,
                calorieScore: 0.0,
                totalFat: 0.0,
                satFat: 0.0,
                transFat: 0.0,
                sodium: 0.0,
                sugar: 0.0,
                processed: 0.0,
            },
            showResults: false
        };
    }    

    setScoreState(score) {
        this.setState({score: score});
    }

    setShowResults(showResults) {
        this.setState({showResults: showResults});
    }

    componentDidMount() {
        this.fetchSnack();
    }

    fetchSnack() {
        this.setState({isLoading: true});
        fetchSnackByID(this.props.match.params.snack_id).then(response => response.data).then((snack) => {
            this.setState({snack: snack, isLoading: false});
        }).catch(error => {
            console.error(error);
            this.setState({isLoading: false});
        });
    }

    getScoreBreakdown() {
        const dataTable = generateDataTable(this.state.score);
        return dataTable.map((item, i) => (
            <ScoreRow data={item} key={i}/>
        ));
    }

    calculate() {
        //this should be moved to the backend
        let gInputUser = +document.getElementById('portion').value;

        let score = {
            gRatio: 0.0,
            totalScore: 0.0,
            firstIngredient: '',
            calories: 0.0,
            calorieScore: 0.0,
            totalFat: 0.0,
            satFat: 0.0,
            transFat: 0.0,
            sodium: 0.0,
            sugar: 0.0,
            processed: 0.0,
            servingSize: 0
        };

        score.servingSize = gInputUser;

        // If the gram unit is not the same as the one on the snack database.
        if (gInputUser !== this.state.snack.serving_size) {
            // Calculating the gRatio.
            score.gRatio = gInputUser / this.state.snack.serving_size;
        }

        // First ingredient.
        switch (this.state.snack.first_ingredient) {
            case 'dairy':
                score.firstIngredient = 2;
                break;
            case 'fruit':
                score.firstIngredient = 2;
                break;
            case 'fruits':
                score.firstIngredient = 2;
                break;
            case 'nuts':
                score.firstIngredient = 2;
                break;
            case 'protein':
                score.firstIngredient = 2;
                break;
            case 'vegetable':
                score.firstIngredient = 2;
                break;
            default:
                score.firstIngredient = 0;
        }

        // If the gram unit is not the same as the one on the snack database.
        if (gInputUser !== this.state.snack.serving_size) {
            // Calories.
            score.calories = score.gRatio * this.state.snack.calories;
        } else {
            // Calories.
            score.calories = this.state.snack.calories;
        }

        // Classify calories.
        if (score.calories >= 1.0 && score.calories <= 50) {
            score.calorieScore = 2;
        } else if (score.calories >= 50.1 && score.calories <= 100) {
            score.calorieScore = 1.5;
        } else if (score.calories >= 100.1 && score.calories <= 150) {
            score.calorieScore = 1;
        } else if (score.calories >= 150.1 && score.caloriescalories <= 200) {
            score.calorieScore = 0.5;
        } else if (score.calories >= 200.1) {
            score.calorieScore = 0;
        } else {
            console.log('Error calories');
        }

        // Total Fat. (35% of  Calories)
        score.totalFat = (score.calories * 35) / 100;

        // Classify totalFat.
        if (score.totalFat >= 0 && score.totalFat <= 20) {
            score.totalFat = 1;
        } else if (score.totalFat >= 20.1 && score.totalFat <= 35) {
            score.totalFat = 0.5;
        } else if (score.totalFat >= 35.1) {
            score.totalFat = 0;
        } else {
            console.log('Error totalFat');
        }

        // Saturated Fat. (10% of  Calories)
        score.satFat = (score.calories * 10) / 100;

        // Classify satFat.
        if (score.satFat >= 0 && score.satFat <= 4.9) {
            score.satFat = 1;
        } else if (score.satFat >= 5.0 && score.satFat <= 9.9) {
            score.satFat = 0.5;
        } else if (score.satFat >= 10) {
            score.satFat = 0;
        } else {
            console.log('Error satFat');
        }

        // Classify transFat.
        if (this.state.snack.trans_fat > 0) {
            score.transFat = 0;
        } else if (this.state.snack.trans_fat === 0) {
            score.transFat = 1;
        } else {
            console.log('Error transFat');
        }

        // If the gram unit is not the same as the one on the snack database.
        if (gInputUser !== this.state.snack.serving_size) {
            // Sodium.
            score.sodium = score.gRatio * window.localStorage.getItem('sodium_score'); // In case that quantity is not the same as the db, adjust it.
        } else {
            // Sodium.
            score.sodium = window.localStorage.getItem('sodium_score');
        }

        // Classify Sodium.
        if (score.sodium >= 0 && score.sodium <= 140) {
            score.sodium = 1;
        } else if (score.sodium >= 140.1 && score.sodium <= 170) {
            score.sodium = 0.5;
        } else if (score.sodium >= 170.1 && score.sodium <= 200) {
            score.sodium = 0.25;
        } else if (score.sodium >= 200.1) {
            score.sodium = 0;
        } else {
            console.log('Error Sodium');
        }

        // Sugar (35% Weight).
        score.sugar = (gInputUser * 35) / 100;

        // Classify Sugar.
        if (score.sugar >= 0 && score.sugar <= 14.9) {
            score.sugar = 2;
        } else if (score.sugar >= 15 && score.sugar <= 19.9) {
            score.sugar = 1.5;
        } else if (score.sugar >= 20 && score.sugar <= 24.9) {
            score.sugar = 1;
        } else if (score.sugar >= 25 && score.sugar <= 35) {
            score.sugar = 0.5;
        } else if (score.sugar >= 35.1) {
            score.sugar = 0;
        } else {
            console.log('Error Sugar');
        }


        // Food Process clasisfication
        if (this.state.snack.processed.toLowerCase() === 'yes') {
            score.processed = -1;
        } else if (this.state.snack.processed.toLowerCase() === 'no') {
            score.processed = 0;
        } else {
            console.log('Error clasisfication');
        }

        score.totalScore = score.firstIngredient + score.calorieScore + score.totalFat + score.satFat + score.transFat + score.sodium + score.sugar + score.processed;
        this.setScoreState(score);
        this.setShowResults(true);
    }

    setUnitCalculation(unitCalc) {
        this.setState({unitCalc: unitCalc});
    }

    setUnit(unit) {
        this.setState({unit: unit});
    }

    getUnitCalculation() {        
        return this.state.unitCalc;
    }

    getUnit() {        
        return this.state.unit;
    }

    

    render() {

        return (
            <Container className="mt-4">
                <Row className="text-center">
                    <Col>
                        <Card>
                            <Card.Body>

                                <Card.Title>Snack Calculator Score</Card.Title>

                                <Form.Group controlId="formControlPortion" style={{width: "300px", margin: "10px auto"}}>
                                    <Form.Label>Portion Size {this.getUnitCalculation()}:</Form.Label>
                                    <Form.Control id="portion" type="text" placeholder={this.getUnit()} />
                                </Form.Group>

                                <div>
                                    <Button variant="link">Not sure how much? ❓</Button>
                                </div>

                                <Dropdown as={ButtonGroup}>

                                    <Button variant="primary" onClick={() => this.calculate()}>
                                        Calculate 📱
                                    </Button>                                  
                                    
                                    <Dropdown.Toggle split variant="primary" id="dropdown-split-basic">
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu id="dropdown-units-button" title="Units">
                                        <Dropdown.Item href="" onClick={() => {this.setUnitCalculation("Grams"); this.setUnit("100 g");}}>Grams</Dropdown.Item>                                        
                                        <Dropdown.Item href="" onClick={() => {this.setUnitCalculation("Tablespoon"); this.setUnit("100 tbsp");}}>Tablespoon</Dropdown.Item>                                    
                                        <Dropdown.Item href="" onClick={() => {this.setUnitCalculation("Tea Spoon"); this.setUnit("100 tsp");}}>Tea Spoon</Dropdown.Item>                                          
                                        <Dropdown.Item href="" onClick={() => {this.setUnitCalculation("Ounces"); this.setUnit("100 oz");}}>Ounces</Dropdown.Item>                                      
                                        <Dropdown.Item href="" onClick={() => {this.setUnitCalculation("Kilogram"); this.setUnit("100 kg");}}>Kilograms</Dropdown.Item>                                       
                                        <Dropdown.Item href="" onClick={() => {this.setUnitCalculation("Pounds"); this.setUnit("100 lbs");}}>Pounds</Dropdown.Item>                                      
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row className="mt-4" style={{display: this.state.showResults ? '' : 'none'}}>
                    <Col xs={12} md={6}>
                        <Card>
                            <Card.Body>
                                <Card.Title>{this.state.snack && this.state.snack.product}</Card.Title>

                                <p className={SnackDetailsStyles.snackname2}>
                                    Serving size : { this.state.score.servingSize } grams
                                </p>
                                <Table striped hover>
                                    <tbody>
                                    <tr>
                                        <th>Total Score</th>
                                        <td>{this.state.score.totalScore}</td>
                                    </tr>
                                    <tr>
                                        <th>First Ingredient Score</th>
                                        <td>{this.state.score.firstIngredient}</td>
                                    </tr>
                                    <tr>
                                        <th>Total Calories Score</th>
                                        <td>{this.state.score.calorieScore}</td>
                                    </tr>
                                    <tr>
                                        <th>Fat Score</th>
                                        <td>{this.state.score.totalFat}</td>
                                    </tr>
                                    <tr>
                                        <th>Saturated Fat Score</th>
                                        <td>{this.state.score.satFat}</td>
                                    </tr>
                                    <tr>
                                        <th>Trans Fat Score</th>
                                        <td>{this.state.score.transFat}</td>
                                    </tr>
                                    <tr>
                                        <th>Sodium Score</th>
                                        <td>{this.state.score.sodium}</td>
                                    </tr>
                                    <tr>
                                        <th>Sugar Score</th>
                                        <td>{this.state.score.sugar}</td>
                                    </tr>
                                    <tr>
                                        <th>Processed Score</th>
                                        <td>{this.state.score.processed}</td>
                                    </tr>
                                    </tbody>
                                </Table>

                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={6}>
                        <Card>
                            <Card.Body>

                                <Card.Title>Score Breakdown</Card.Title>

                                <Table striped hover>
                                    <thead>
                                    <tr>
                                        <th>Criteria</th>
                                        <th>Score</th>
                                        <th>Max Score</th>
                                    </tr>
                                    </thead>
                                    <tbody>{this.getScoreBreakdown()}</tbody>
                                </Table>

                            </Card.Body>

                        </Card>
                    </Col>
                </Row>

                <Row className="text-center mt-4" style={{display: this.state.showResults ? '' : 'none'}}>
                    <Col>
                        <Button className="m-1" variant="primary" href="/snacksgraph">Consume 🍴</Button>
                        <Button className="m-1" variant="secondary" href="/snacks">Return to search</Button>
                    </Col>
                </Row>

            </Container>
        );
    }
}
