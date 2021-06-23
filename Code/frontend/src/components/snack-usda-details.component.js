import React, { Component } from 'react';
import SnackDetailsStyles from '../styles/snack-details.module.css';
import {fetchSnackByIDUSDA,fetchCSVFiles} from '../services/snack.service.js'; 
import { Dropdown, Button, ButtonGroup, Card, Col, Container, Row, Table, Form } from 'react-bootstrap';
var firstIngredientCsvFile = './excelfiles/first_ing_list.csv';
var processedFoodCsvFile = './excelfiles/processed_food.csv';

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
    }    

    setScoreState(score) {
        this.setState({score: score});
    }

    setShowResults(showResults) {
        this.setState({showResults: showResults});
    }

    componentDidMount() {
        this.fetchSnackUSDA();
    }

    fetchSnackUSDA()
    {
        this.setState({isLoading: true});
        fetchSnackByIDUSDA(this.props.match.params.snack_id).then(response => response.data).then((snack) => {
            this.setState({snack: snack, isLoading: false});
            console.log(this.state.snack);
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

    formatUnitCalculation(unitCalculationUser)
    {
        switch (unitCalculationUser) 
        {
            case 'Grams':
                return "g";
            case 'Tablespoon':
                return "tbsp";
            case 'Tea Spoon':
                return "tsp";
            case 'Ounces':
                return "oz";
            case 'Kilogram':
                return "kg";
            case 'Pounds':
                return "lbs";
            default:
                return "ERROR";
        }
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

    checkInput (gInputUser) {
        const input = gInputUser;
        const numberCheck = /\d/g;

        if(!numberCheck.test(input) || input === 0 || input < 0){
            alert('Please enter a number !!');
            window.location.reload();
        }    
    }

    adjustUserInput(gInputUser, uInputUser) {
        if(gInputUser === "100" && uInputUser === "g") {
            return this.getRatio(gInputUser, uInputUser);
        }
        else if(gInputUser !== "100" && uInputUser === "g") {
            return this.getRatio(gInputUser, uInputUser);
        }
        else if(uInputUser !== "g") {
            switch (uInputUser) {
                case 'kg':
                    return this.getRatio(gInputUser * 1000, "g");
                case 'Ounces':
                    return this.getRatio(gInputUser * 28.35, "g");
                case 'tbsp':                    
                    return this.getRatio(gInputUser * 17.07, "g");
                case 'Tea Spoon':
                    return this.getRatio(gInputUser * 5.69, "g");
                case 'Pounds':
                    return this.getRatio(gInputUser * 453.6, "g");
                default:
                    return "ERROR";
            }         
        }
    }

    getRatio(gInputUser, uInputUser) {
        if(uInputUser === "g") {
            this.state.score.userGramsConverted = gInputUser;
            let ratio = gInputUser / 100;
            return ratio;
        }
        else {
            return "ERROR";
        }        
    }
    
    calculate() {
        /*LOGGGGGG*/
        console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
        /* Sugar */
        console.log('this.state.snack.foodNutrients[2].nutrient.name: ' + this.state.snack.foodNutrients[2].nutrient.name);
        console.log('this.state.snack.foodNutrients[2].amount: ' + this.state.snack.foodNutrients[2].amount);
        console.log('-----------');        
        /* Calories */
        console.log('this.state.snack.foodNutrients[4].nutrient.name: ' + this.state.snack.foodNutrients[4].nutrient.name);
        console.log('this.state.snack.foodNutrients[4].amount: ' + this.state.snack.foodNutrients[4].amount);
        console.log('-----------');  
        /* Sodium */
        console.log('this.state.snack.foodNutrients[5].nutrient.name: ' + this.state.snack.foodNutrients[5].nutrient.name);
        console.log('this.state.snack.foodNutrients[5].amount: ' + this.state.snack.foodNutrients[5].amount);
        console.log('-----------');  
        /* Sat Fat */
        console.log('this.state.snack.foodNutrients[0].nutrient.name: ' + this.state.snack.foodNutrients[0].nutrient.name);
        console.log('this.state.snack.foodNutrients[0].amount: ' + this.state.snack.foodNutrients[0].amount);
        console.log('-----------'); 
        /* Trans Fat */            
        console.log('this.state.snack.foodNutrients[12].nutrient.name: ' + this.state.snack.foodNutrients[12].nutrient.name);
        console.log('this.state.snack.foodNutrients[12].amount: ' + this.state.snack.foodNutrients[12].amount);
        console.log('-----------'); 
        /* Fat */            
        console.log('this.state.snack.foodNutrients[10].nutrient.name: ' + this.state.snack.foodNutrients[10].nutrient.name);
        console.log('this.state.snack.foodNutrients[10].amount: ' + this.state.snack.foodNutrients[10].amount);
        console.log('-----------');                                          
        console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
        /*LOGGGGGG*/

        //this should be moved to the backend
        let gInputUser = +document.getElementById('portion').value;
        console.log('gInputUser: ' + gInputUser);
        let uInputUser = this.formatUnitCalculation(this.getUnitCalculation());
        console.log('uInputUser: ' + uInputUser);

        this.checkInput(gInputUser);// Calling funciton to pass parameter
        
        let score = {
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
            servingSize: 0
        };

        score.servingSize = gInputUser;

        score.gRatio = this.adjustUserInput(gInputUser, uInputUser);
        console.log('score.gRatio:' + score.gRatio);

        // First ingredient.
        // FIXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX 
        this.firstIngredientCalculation(this.state.snack.ingredients, score);        
     
        // Calories.
        score.calories = score.gRatio * this.state.snack.foodNutrients[4].amount;        
        console.log('CALORIESSSSSSSSSSSSSSSSSSSSSSSSS:' + score.calories);
        
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
        score.totalFat = (((this.state.snack.foodNutrients[10].amount * score.gRatio) * 9) / score.calories) * 100;

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
        score.satFat = (((this.state.snack.foodNutrients[0].amount * score.gRatio) * 9) / score.calories) * 100;

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
        if ((this.state.snack.foodNutrients[12].amount * score.gRatio) > 0) {
            score.transFat = 0;
        } else if ((this.state.snack.foodNutrients[12].amount * score.gRatio) === 0) {
            score.transFat = 1;
        } else {
            console.log('Error transFat');
        }


        // Sodium.
        score.sodium = score.gRatio * this.state.snack.foodNutrients[5].amount; 

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
        score.sugar = ((this.state.snack.foodNutrients[2].amount * score.gRatio) / this.state.score.userGramsConverted) * 100;

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

        // Food Process clasisfication FIXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX 
        /*
        fetchCSVFiles(processedFoodCsvFile).then(response => response.data).then((dataCSV) => {            
            console.log(dataCSV);
        }).catch(error => {
            console.error(error);
            this.setState({isLoading: false});
        });
        */   



        /*
        if (this.state.snack.foodClass.toLowerCase() === 'yes') {
            score.processed = -1;
        } else if (this.state.snack.foodClass.toLowerCase() === 'no') {
            score.processed = 0;
        } else {
            console.log('Error clasisfication');
        }
        */

        this.processedFoodCalculation(this.state.snack.ingredients,  score);


        score.totalScore = score.firstIngredient + score.calorieScore + score.totalFat + score.satFat + score.transFat + score.sodium + score.sugar + score.processed;
        this.setScoreState(score);
        this.setShowResults(true);
    }

    firstIngredientCalculation(ingredients, score) {
        // Initialization.
        var category = 'other';

        // regex to break down to first ingredient and set to lower case
        var regex = ingredients.replace(/\s+/g, " ").toLowerCase();

        // split items at a comma, in order to get first ingredient
        regex = regex.split(",");

        //we only want first ingredient
        regex = regex[0];

        // remove every character that is not a number, letter or a percentage sign
        regex = regex.replace(/[^0-9a-z%]/gi, " ");

        // if there is more than one space between words, remove it
        regex = regex.replace(/  +/g, " ");

        // remove all spaces at the end, if any
        regex = regex.replace(/\s*$/, "");

        var combinations = regex.split(" ");

        var n = combinations.length;

        regex = "";

        // make all possible combinations of the words of the first ingredient
        for (var i = 0; i < n; i++) {
          for (var j = 0; j <= i; j++) {
            regex += (combinations.slice(j, n - i + j).join('') + ',');
          }
        }

        // remove the comma at the end due to for loop
        regex = regex.toString().replace(/\,$/, "");
        regex = regex.split(',');

        var test1 = regex.length;
        var test2 = regex.length;
        var test3 = '';

        // check for both singular and plural of the first ingredient
        for (i = 0; i < test1; i++) {
          try {throw i}
          catch(ii) {
            test3 = regex[ii].slice(-1);

            if (test3 === 's') {
                regex[test2] = regex[ii].substring(0, regex[ii].length - 1);
                test2++;
            }
            else {
                regex[test2] = regex[ii] + 's';
                test2++;
            }
          }
        }

        // read first ing from csv file, set all to lowercase and split at ,
        //var dataCSV = fs.readFileSync(firstIngredientCsvFile, {"encoding": "utf8"});
        //var dataCSV = "fruits,apples,fruits,apricots,fruits,bananas,fruits,cherries,fruits,Coconut,fruits,Coconut Flakes";

        fetchCSVFiles(firstIngredientCsvFile).then(response => response.data).then((dataCSV) => { 
            let first_ing = dataCSV.toString().toLowerCase().replace(/\n/g, ",").split(",");        

            // loop thru all combinations of the first ingredient
            regex.forEach(function(snack, i) {
    
                //console.log('All combinations of first ingredient: ' + snack)
                first_ing.forEach(function(item, j) {
    
                    if (j + 1 < first_ing.length) {
    
                        item = first_ing[j + 1];
                        item = item.replace(/\s/g, '');
                        
                        if (item === snack) {
                            category = first_ing[j];
                            console.log('*Matching first ing: ' + snack)
                        }
                    }
                });
            });
                    
            console.log('Ingredients after checking db: ' + category)
                    
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
                    console.log('It appears there are no ingredients?');
                    score.firstIngredient = 0;
                    break;
                default:
                    score.firstIngredient = 0;
            }
        }).catch(error => {
            console.error(error);
            this.setState({isLoading: false});
        });


    }    

    processedFoodCalculation(ingredients, score) {
        var count = 0;
        var dataProcessed = "";

        //var dataProcessed = fs.readFileSync(processedFoodCsvFile, {"encoding": "utf8"});
        //var dataProcessed = "MONOSODIUM GLUTAMATE,Monosodium glutamate,artificial flavor,disodium guanylate";

        fetchCSVFiles(processedFoodCsvFile).then(response => response.data).then((dataCSV) => {            
            console.log(dataCSV);
            dataProcessed = dataCSV;

            var additives = dataProcessed.toString().toLowerCase().split(/\n/); // <---------change for in case that the file returned them in enters    /\n/   
            console.log('additives:' + additives);
            console.log('additives[1]:' + additives[1]);
            
            //regex to break down and set to lower case 
            var regex = ingredients.replace(/\s+/g, ' ').toLowerCase();
            console.log('regex:' + regex);
                    
            // split items at a comma
            regex = regex.split(",");
        
            // remove all spaces at the end and beginning, if any
            for (var i = 0; i < regex.length; i++) {
                regex[i] = regex[i].replace(/\s*$/,'');
                regex[i] = regex[i].replace(/^\s+/g, '');
            }
        
            regex[regex.length-1] = regex[regex.length-1].replace(/\.$/, "");
        
            //see how many of the ingredients of the snack match the additives, a.k.a. are additives
            for (i = 0; i < additives.length; i++) {
                for (var j = 0; j < regex.length; j++) {
                    if (additives[i] === regex[j]) {
                        console.log('Additives found: ' + additives[i])
                        count++
                    }
                }
            }
        
            console.log('Count additives: ' + count)
        
            if (count <= 0) {
                console.log('heloooooooooooooooooooooooooooooo');                              
                score.processed = 1;
            }
            else if (count === 1) {
                score.processed = 0.5;
            }
            else if (count === 2 || count === 3) {
                score.processed = 0;
            }
            else if (count === 4 || count === 5) {
                score.processed = -0.5;
            }
            else if (count > 5) {
                score.processed = -1;
            }

            this.setScoreState(score);
            this.setState({isLoading: false});
        }).catch(error => {
            console.error(error);
            this.setState({isLoading: false});
        });


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
