import React, { Component, useContext } from 'react';
import SnackDetailsStyles from '../styles/snack-details.module.css';
import { fetchCSVFiles, fetchSnackByIDUSDA } from '../services/snack.service.js';
import { Button, ButtonGroup, Card, Col, Container, Dropdown, Form, Modal, Row, Table, OverlayTrigger, Tooltip, Alert, Spinner} from 'react-bootstrap';
import foodPic from '../images/foodinfo.png';

import { postSnackScore } from '../services/score.service.js';
import { AuthContext } from '../utils/auth';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faTimes, faCheck, faMinus } from '@fortawesome/free-solid-svg-icons';

let feedbackJSON = require('../utils/feedback');
let feedBackMessage = "";
let feedBackNutritionMessage = "";

const firstIngredientCsvFile = './excelfiles/first_ing_list.csv';
const processedFoodCsvFile = './excelfiles/processed_food.csv';

const units = {
    Grams: 'g',
    Tablespoon: 'tbsp',
    TeaSpoon: 'tsp',
    Ounces: 'oz',
    Kilogram: 'kg',
    Pounds: 'lbs',
};

function generateDataTable(score) {

    function generateIcon(tempScore, maxScore) {
        if(tempScore === 0)
        {
            return faTimes;
        }
        else if (tempScore === maxScore)
        {
            return faCheck;
        }
        else
        {
            return faMinus;
        }
    }

    return [
        {
            firstIcon: <FontAwesomeIcon icon={faInfoCircle}/>,
            criteria: 'First Ingredient',
            score: score.firstIngredient,
            maxscore: '2',
            lastIcon: <FontAwesomeIcon icon={generateIcon(score.firstIngredient,2)}/>,
            message: 'Points if it is a fruit, vegetables, dairy, protein, or whole grain.'
        },
        {
            firstIcon: <FontAwesomeIcon icon={faInfoCircle}/>,
            criteria: 'Total Calories',
            score: score.calorieScore,
            maxscore: '2',
            lastIcon: <FontAwesomeIcon icon={generateIcon(score.calorieScore,2)}/>,
            message: '2 Points if < 200 kcal.'
        },
        {
            firstIcon: <FontAwesomeIcon icon={faInfoCircle}/>,
            criteria: 'Fat',
            score: score.totalFat,
            maxscore: '1',
            lastIcon: <FontAwesomeIcon icon={generateIcon(score.totalFat,1)}/>,
            message: '1 Point if < 35% kcal from fat.'
        },
        {
            firstIcon: <FontAwesomeIcon icon={faInfoCircle}/>,
            criteria: 'Saturated Fat',
            score: score.satFat,
            maxscore: '1',
            lastIcon: <FontAwesomeIcon icon={generateIcon(score.satFat,1)}/>,
            message: '1 Point if < 10% kcal from fat.'
        }, {
            firstIcon: <FontAwesomeIcon icon={faInfoCircle}/>,
            criteria: 'TransFat',
            score: score.transFat,
            maxscore: '1',
            lastIcon: <FontAwesomeIcon icon={generateIcon(score.transFat,1)}/>,
            message: '1 Point if 0g.'
        }, {
            firstIcon: <FontAwesomeIcon icon={faInfoCircle}/>,
            criteria: 'Sodium',
            score: score.sodium,
            maxscore: '1',
            lastIcon: <FontAwesomeIcon icon={generateIcon(score.sodium,1)}/>,
            message: '1 Point if < 200 mg.'
        }, {
            firstIcon: <FontAwesomeIcon icon={faInfoCircle}/>,
            criteria: 'Sugar',
            score: score.sugar,
            maxscore: '2',
            lastIcon: <FontAwesomeIcon icon={generateIcon(score.sugar,2)}/>,
            message: '2 Points if < 35%.'
        },
        {
            firstIcon: <FontAwesomeIcon icon={faInfoCircle}/>,
            criteria: 'Processed',
            score: score.processed,
            maxscore: '1',
            lastIcon: <FontAwesomeIcon icon={generateIcon(score.processed,1)}/>,
            message: '+1 Point if not processed.'
        }
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

export default class SnackDetailsComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            snack: null,
            isLoading: false,
            unit: 'Grams',
            portion: 100.0,
            score: {
                gRatio: 0.0,
                totalScore: 0.0,
                firstIngredient: 0,
                calories: 0.0,
                calorieScore: 0.0,
                totalFat: 0.0,
                satFat: 0.0,
                transFat: 0.0,
                sodium: 0.0,
                sugar: 0.0,
                processed: 0.0,
                userGramsConverted: 0.0
            },
            showResults: false
        };
        this._toggle = this._toggle.bind(this);
    }

    setPortion(portion) {
        this.setState({portion: portion});
    }

    setScoreState(score) {
        this.setState({score: score});
    }

    setShowResults(showResults) {
        this.setState({showResults: showResults});
    }

    setUnit(unit) {
        this.setState({unit: unit});
    }

    componentDidMount() {
        this.fetchSnackUSDA();
    }

    fetchSnackUSDA() {
        this.setState({isLoading: true});
        fetchSnackByIDUSDA(this.props.match.params.snack_id).then(response => response.data).then((snack) => {
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

    getPortionInGrams() {

        const unit = units[this.state.unit]

        if (unit !== units.Grams) {

            switch (unit) {
                case units.Kilogram:
                    return this.state.portion * 1000;
                case units.Ounces:
                    return this.state.portion * 28.35;
                case units.Tablespoon:
                    return this.state.portion * 17.07;
                case units.TeaSpoon:
                    return this.state.portion * 5.69;
                case units.Pounds:
                    return this.state.portion * 453.6;
                default:
                    return 'ERROR';
            }

        } else {
            return this.state.portion / 100;
        }

    }

    calculate() {
        /* Initialization. */
        let searchedSugar = 0;
        let searchedCalories = 0;
        let searchedSodium = 0;
        let searchedSatFat = 0;
        let searchedTransFat = 0;
        let searchedFat = 0;

        /* Searching in the result USDA Array to look food ingredients since they are not returned in the same order. */
        for (let index = 0; index < this.state.snack.foodNutrients.length; index++) {
            /* Calories - Energy */
            if (this.state.snack.foodNutrients[index].nutrient.id === 1008) {
                searchedCalories = this.state.snack.foodNutrients[index].amount;
            }

            /* Sugar */
            if (this.state.snack.foodNutrients[index].nutrient.id === 1235) {
                searchedSugar = this.state.snack.foodNutrients[index].amount;
            }

            /* Sodium */
            if (this.state.snack.foodNutrients[index].nutrient.id === 1093) {
                searchedSodium = this.state.snack.foodNutrients[index].amount;
            }

            /* Fat */
            if (this.state.snack.foodNutrients[index].nutrient.id === 1004) {
                searchedFat = this.state.snack.foodNutrients[index].amount;
            }

            /* Trans Fat */
            if (this.state.snack.foodNutrients[index].nutrient.id === 1257) {
                searchedTransFat = this.state.snack.foodNutrients[index].amount;
            }

            /* Sat Fat */
            if (this.state.snack.foodNutrients[index].nutrient.id === 1258) {
                searchedSatFat = this.state.snack.foodNutrients[index].amount;
            }
        }

        /* Getting Unit calculation to setup on the page. */
        let portion = this.state.portion;
        let score = {
            gRatio: 0,
            totalScore: 0,
            firstIngredient: 0,
            calories: 0,
            calorieScore: 0,
            totalFat: 0,
            satFat: 0,
            transFat: 0,
            sodium: 0,
            sugar: 0,
            processed: 0,
            servingSize: 0
        };

        score.servingSize = portion;

        score.gRatio = this.getPortionInGrams();

        // First ingredient.
        this.firstIngredientCalculation(this.state.snack.ingredients, score);

        // Calories.
        score.calories = score.gRatio * searchedCalories;
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

        // Total Fat [FORMULA]. FAT = ((fat * 9) /  calories) * 100
        if (score.calories !== 0) {
            score.totalFat = (((searchedFat * score.gRatio) * 9) / score.calories) * 100;
        } else {
            score.totalFat = 0;
        }

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

        // Saturated Fat [FORMULA]. SATFAT = ((saturatedFat * 9) /  calories) * 100
        if (score.calories !== 0) {
            score.satFat = (((searchedSatFat * score.gRatio) * 9) / score.calories) * 100;
        } else {
            score.satFat = 0;
        }

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
        if ((searchedTransFat * score.gRatio) > 0) {
            score.transFat = 0;
        } else if ((searchedTransFat * score.gRatio) === 0) {
            score.transFat = 1;
        } else {
            console.log('Error transFat');
        }

        // Sodium.
        score.sodium = score.gRatio * searchedSodium;

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

        //+++++++++++++++ Sugar (35% Weight).
        score.sugar = ((searchedSugar * score.gRatio) / this.state.portion) * 100;

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

        // Food Process classification
        this.processedFoodCalculation(this.state.snack.ingredients, score);

        score.totalScore = score.firstIngredient + score.calorieScore + score.totalFat + score.satFat + score.transFat + score.sodium + score.sugar + score.processed;
        this.setScoreState(score);
        this.setShowResults(true);

    }

    firstIngredientCalculation(ingredients, score) {

        let category = 'other';

        let [ingredient] = ingredients
            .toLowerCase()
            .split(',')
            .map(item =>
                item.replace(/[^0-9a-z%]/gi, ' ')
                    .replace(/  +/g, ' ')
                    .replace(/\s*$/, '')
                    .replace('.', '')
                    .trim()
            );

        fetchCSVFiles(firstIngredientCsvFile)
            .then(response => response.data)
            .then((dataCSV) => {

                dataCSV
                    .toString()
                    .toLowerCase()
                    .split('\n')
                    .forEach(item => {
                        const food = item.split(',')[1];
                        if(ingredient.indexOf(food) !== -1) {
                            category = item.split(',')[0];
                        }
                    });

                switch (category) {
                    case 'dairy':
                    case 'proteins-nut':
                    case 'whole grains':
                    case 'vegetables':
                    case 'fruits':
                    case 'proteins':
                        score.firstIngredient = 2;
                        break;
                    case 'other':
                        score.firstIngredient = 0;
                        break;
                    case 'none':
                        score.firstIngredient = 0;
                        break;
                    default:
                        score.firstIngredient = 0;
                }

                score.totalScore += score.firstIngredient;

        }).catch(error => {
            console.error(error);
            this.setState({isLoading: false});
        });

    }

    processedFoodCalculation(ingredients, score) {

        fetchCSVFiles(processedFoodCsvFile)
            .then(response => response.data)
            .then((dataCSV) => {

                let additives = dataCSV
                    .toString()
                    .toLowerCase()
                    .split('\n')
                    .map(item => item.replace('\r',''));
                    

                // const splitCSVRegex = /,((?![^(]*\))(?!\d))/g;
                const splitCSVRegex = /,((?!\d))/g;

                let ingredientsList = ingredients
                    .toLowerCase()
                    .split(splitCSVRegex)
                    .map(item => item.replace('ingredients: ', '')
                                     .replace('raising agents', '')
                                     .replace('(', '')
                                     .replace(')', '')
                                     .replace('.', '')
                                     .trim()
                    );

                let total = additives.reduce((total, additive) => {
                    if(ingredientsList.includes(additive)) {
                        total++;
                    }
                    
                    return total;
                }, 0);

                if (total <= 0) {
                    score.processed = 1;
                } else if (total === 1) {
                    score.processed = 0.5;
                } else if (total <= 3) {
                    score.processed = 0;
                } else if (total <= 5) {
                    score.processed = -0.5;
                } else if (total > 5) {
                    score.processed = -1;
                }

                score.totalScore += score.processed;

                this.setScoreState(score);
                feedBackMessage = this.processScoreFeedBack(score);
                feedBackNutritionMessage = this.processNutritionFeedback(score);
                this.setState({isLoading: false});

            }).catch(error => {
            console.error(error);
            this.setState({isLoading: false});
        });

    }

    consumeSnack(){
        postSnackScore(this.state.snack.fdcId,this.state.score.totalScore).then(response => response.data).then((score) => {
            this.props.history.push({
                pathname:'/snacksgraph'
            });
            console.log(score);
        }).catch(error => {
            console.error(error);
            this.setState({isLoading: false});
        });
    }

    processScoreFeedBack(score) {
        var result = void 0;
        score = this.state.score.totalScore;

        switch (true) {
            case score < 6:
                return feedbackJSON.scoreFeedback.feedback1to5[Math.floor(Math.random() * feedbackJSON.scoreFeedback.feedback1to5.length)];
            case score >= 6 && score < 8:
                return feedbackJSON.scoreFeedback.feedback6to7[Math.floor(Math.random() * feedbackJSON.scoreFeedback.feedback6to7.length)];
            case score >= 8 && score < 10:
                return feedbackJSON.scoreFeedback.feedback8to9[Math.floor(Math.random() * feedbackJSON.scoreFeedback.feedback8to9.length)];
            default:
                return feedbackJSON.scoreFeedback.feedback10to11[Math.floor(Math.random() * feedbackJSON.scoreFeedback.feedback10to11.length)];
        }
    };

    processNutritionFeedback(score) {
        let name = void 0;

        if (this.state.score.totalScore === 0 || this.state.score.totalScore === 0.0) {
            name = "calScore";
        } else if (this.state.score.processed === -1) {
            name = "processedScore";
        } else {
            let scoreList = {
                "calScore": this.state.score.totalScore,
                "fatScore": this.state.score.totalFat,
                "satScore": this.state.score.satFat,
                "tranScore": this.state.score.transFat,
                "sodiumScore": this.state.score.sodium,
                "sugarScore": this.state.score.sugar,
                "processedScore": this.state.score.processed,
            };


            //get sorted list of scores
            let min = Object.keys(scoreList).sort(function (a, b) {
                return scoreList[a] - scoreList[b];
            });
            //get first one - the smallest score - to get pick which nutrition message to return
            name = min[0];
        }

        switch (true) {
            case name === "calScore":
                return feedbackJSON.nutritionFeedback.calScore[Math.floor(Math.random() * feedbackJSON.nutritionFeedback.calScore.length)];
            case name === "fatScore":
                return feedbackJSON.nutritionFeedback.fatScore[Math.floor(Math.random() * feedbackJSON.nutritionFeedback.fatScore.length)];
            case name === "satScore":
                return feedbackJSON.nutritionFeedback.satScore[Math.floor(Math.random() * feedbackJSON.nutritionFeedback.satScore.length)];
            case name === "tranScore":
                return feedbackJSON.nutritionFeedback.tranScore[Math.floor(Math.random() * feedbackJSON.nutritionFeedback.tranScore.length)];
            case name === "sodiumScore":
                return feedbackJSON.nutritionFeedback.sodiumScore[Math.floor(Math.random() * feedbackJSON.nutritionFeedback.sodiumScore.length)];
            case name === "processedScore":
                return feedbackJSON.nutritionFeedback.processedScore[Math.floor(Math.random() * feedbackJSON.nutritionFeedback.processedScore.length)];
            case name === "sugarScore":
                return feedbackJSON.nutritionFeedback.sugarScore[Math.floor(Math.random() * feedbackJSON.nutritionFeedback.sugarScore.length)];
            default:
                console.log('A score type is somehow missing? Fix it!!!');
                break;
        }
    };


    _toggle() {
        this.setState((prevState) => ({
            modal: !prevState.modal,
        }));
    }

    render() {

        return (
            <Container className="mt-4">
                <Row className="text-center" style={{display: this.state.showResults ? 'none' : ''}}>
                    <Col>
                        <Card>
                            <Card.Body>

                                <Card.Title>Snack Calculator Score</Card.Title>

                                <Form.Group style={{width: '300px', margin: '10px auto'}}>
                                    <Form.Label>Portion Size {this.state.unit}:</Form.Label>
                                    <Form.Control type="number"
                                                  placeholder={ `${this.state.portion} ${units[this.state.unit]}` }
                                                  onChange={(e) => this.setPortion(e.target.value)}/>
                                </Form.Group>

                                <div>
                                    <Button variant="link" onClick={this._toggle}>Not sure how much? ❓</Button>
                                </div>

                                <Modal show={this.state.modal} onHide={this._toggle}>
                                    <Modal.Header closeButton="true"/>
                                    <Modal.Body>
                                        <img style={{width: '460px'}} src={foodPic} alt=""/>
                                    </Modal.Body>
                                </Modal>
                                <OverlayTrigger placement={'right'} overlay={<Tooltip id="tooltip-disabled">Change units measures here</Tooltip>}>
                                    <Dropdown as={ButtonGroup}>
                                        <Button
											variant='primary'
											onClick={() => this.calculate()}
											hidden={this.state.isLoading}
										>
											Calculate 📱
										</Button>
										<Button
											variant='primary'
											disabled
											hidden={!this.state.isLoading}
										>
											<Spinner
												as='span'
												animation='border'
												size='sm'
												role='status'
												aria-hidden='true'
											/>
											&nbsp;Loading...
										</Button>

                                        <Dropdown.Toggle split variant="primary" id="dropdown-split-basic">
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu id="dropdown-units-button" title="Units">
                                            <Dropdown.Item href="" onClick={() => {
                                                this.setUnit('Grams');
                                            }}>Grams</Dropdown.Item>
                                            <Dropdown.Item href="" onClick={() => {
                                                this.setUnit('Tablespoon');
                                            }}>Tablespoon</Dropdown.Item>
                                            <Dropdown.Item href="" onClick={() => {
                                                this.setUnit('TeaSpoon');
                                            }}>Tea Spoon</Dropdown.Item>
                                            <Dropdown.Item href="" onClick={() => {
                                                this.setUnit('Ounces');
                                            }}>Ounces</Dropdown.Item>
                                            <Dropdown.Item href="" onClick={() => {
                                                this.setUnit('Kilogram');
                                            }}>Kilograms</Dropdown.Item>
                                            <Dropdown.Item href="" onClick={() => {
                                                this.setUnit('Pounds');
                                            }}>Pounds</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </OverlayTrigger>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <br></br>
                <Alert variant={'primary'} style={{display: this.state.showResults ? '' : 'none'}}>
                    {feedBackMessage}
                </Alert>

                <Row className="mt-4" style={{width: '1350px',margin: '30px auto',display: this.state.showResults ? '' : 'none'}}>
                    <Col xs={24} md={10}>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    <center>
                                        <p>
                                            <strong>Score Breakdown</strong>
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
                                            <th></th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {this.getScoreBreakdown()}
                                        <tr>
                                            <td></td>
                                            <th>Total Score</th>
                                            <td>{this.state.score.totalScore}</td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <br></br>
                <Alert variant={'primary'} style={{display: this.state.showResults ? '' : 'none'}}>
                    {feedBackNutritionMessage}
                </Alert>

                <Row className="text-center mt-4" style={{display: this.state.showResults ? '' : 'none'}}>
                    <Col>
                        <Button className="m-1" variant="primary" onClick={() => this.consumeSnack()}>Consume 🍴</Button>
                        <Button className="m-1" variant="secondary" href="/snacks">Return to search</Button>
                    </Col>
                </Row>

            </Container>
        );
    }
}
