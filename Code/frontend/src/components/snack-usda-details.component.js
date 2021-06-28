import React, { Component } from 'react';
import SnackDetailsStyles from '../styles/snack-details.module.css';
import { fetchCSVFiles, fetchSnackByIDUSDA } from '../services/snack.service.js';
import { Button, ButtonGroup, Card, Col, Container, Dropdown, Form, Modal, Row, Table } from 'react-bootstrap';
import foodPic from '../images/foodinfo.png';

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
        // Initialization.
        let category = 'other';

        // regex to break down to first ingredient and set to lower case
        let regex = ingredients.replace(/\s+/g, ' ').toLowerCase();

        // split items at a comma, in order to get first ingredient
        regex = regex.split(',');

        //we only want first ingredient
        regex = regex[0];

        // remove every character that is not a number, letter or a percentage sign
        regex = regex.replace(/[^0-9a-z%]/gi, ' ');

        // if there is more than one space between words, remove it
        regex = regex.replace(/  +/g, ' ');

        // remove all spaces at the end, if any
        regex = regex.replace(/\s*$/, '');

        let combinations = regex.split(' ');

        let n = combinations.length;

        regex = '';

        // make all possible combinations of the words of the first ingredient
        for (let i = 0; i < n; i++) {
            for (let j = 0; j <= i; j++) {
                regex += (combinations.slice(j, n - i + j).join('') + ',');
            }
        }

        // remove the comma at the end due to for loop
        regex = regex.toString().replace(/,$/, '');
        regex = regex.split(',');

        var test1 = regex.length;
        var test2 = regex.length;
        var test3 = '';

        // check for both singular and plural of the first ingredient
        for (let i = 0; i < test1; i++) {
            try {
                throw i;
            } catch (ii) {
                test3 = regex[ii].slice(-1);

                if (test3 === 's') {
                    regex[test2] = regex[ii].substring(0, regex[ii].length - 1);
                    test2++;
                } else {
                    regex[test2] = regex[ii] + 's';
                    test2++;
                }
            }
        }

        // read first ing from csv file, set all to lowercase and split at ,
        //var dataCSV = fs.readFileSync(firstIngredientCsvFile, {"encoding": "utf8"});
        //var dataCSV = "fruits,apples,fruits,apricots,fruits,bananas,fruits,cherries,fruits,Coconut,fruits,Coconut Flakes";

        fetchCSVFiles(firstIngredientCsvFile).then(response => response.data).then((dataCSV) => {
            let first_ing = dataCSV.toString().toLowerCase().replace(/\n/g, ',').split(',');

            // loop thru all combinations of the first ingredient
            regex.forEach(function (snack, i) {

                //console.log('All combinations of first ingredient: ' + snack)
                first_ing.forEach(function (item, j) {

                    if (j + 1 < first_ing.length) {

                        item = first_ing[j + 1];
                        item = item.replace(/\s/g, '');

                        if (item === snack) {
                            category = first_ing[j];
                        }
                    }
                });
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
                /*
                case 'They are Secret!':
                    if(!isLocal && name.toLowerCase().replace("Yogurt").length > 0) score.firstIngredient = 2;
                    score.firstIngredient = 0;
                    break;
                */
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
                    .split('\n');

                let ingredientsList = ingredients
                    .toLowerCase()
                    .split(',')
                    .map(item => item.replace('.', '').trim());

                let total = additives.reduce((total, additive) => {
                    return total + ingredientsList.includes(additive);
                }, 0);

                if (total <= 0) {
                    score.processed = 1;
                } else if (total === 1) {
                    score.processed = 0.5;
                } else if (total === 2 || total === 3) {
                    score.processed = 0;
                } else if (total === 4 || total === 5) {
                    score.processed = -0.5;
                } else if (total > 5) {
                    score.processed = -1;
                }

                score.totalScore += score.processed;

                this.setScoreState(score);
                this.setState({isLoading: false});

            }).catch(error => {
            console.error(error);
            this.setState({isLoading: false});
        });

    }


    _toggle() {
        this.setState((prevState) => ({
            modal: !prevState.modal,
        }));
    }

    render() {

        return (
            <Container className="mt-4">
                <Row className="text-center">
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

                                <Dropdown as={ButtonGroup}>

                                    <Button variant="primary" onClick={() => this.calculate()} disabled={this.state.isLoading}>
                                        Calculate 📱
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
                                    Serving size : {this.state.score.servingSize} {this.state.unit}
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
