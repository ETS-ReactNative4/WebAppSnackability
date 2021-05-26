import React, {Component} from 'react';
import {fetchSnackByID} from '../services/snack.service.js';
import styles from '../styles/styles.module.css';
import SnackDetailsStyles from '../styles/snack-details.module.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const tableData = [
    {
        criteria: 'First Ingredient',
        //score: "0",
        score: window.localStorage.getItem("firstIngredient"),
        maxscore: "2"
    },
    {
        criteria: 'Total Calories',
        score: window.localStorage.getItem("calorieScore"),
        maxscore: "2"
    },
    {
        criteria: 'Fat',
        score: window.localStorage.getItem("totalFat"),
        maxscore: "1"
    },
    {
        criteria: 'Saturated Fat',
        score: window.localStorage.getItem("satFat"),
        maxscore: "1"
    }, {
        criteria: 'TransFat',
        score: window.localStorage.getItem("transFat"),
        maxscore: "1"
    }, {
        criteria: 'Sodium',
        score: window.localStorage.getItem("sodium"),
        maxscore: "1"
    }, {
        criteria: 'Sugar',
        score: window.localStorage.getItem("sugar"),
        maxscore: "2"
    },
    {
        criteria: 'Processed',
        score: window.localStorage.getItem("processed"),
        maxscore: "1"
    },
]

const ScoreRow = ({data}) => {
    return (
        <tr>
            <td>
            {
                data.criteria
            }
            </td>
            <td>
            {
                data.score
            }
            </td>
            <td>
            {
                data.maxscore
            }
            </td>
        </tr>
    )
};


export default class SnackDetailsComponent extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            snack: null,
            isLoading: false
        };
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
    
    setValues()
    {
        window.localStorage.setItem("first_ingredient", this.state.snack.first_ingredient);  
        window.localStorage.setItem("total_calories", this.state.snack.calories); 
        window.localStorage.setItem("trans_fat", this.state.snack.trans_fat);  
        window.localStorage.setItem("sodium_score", this.state.snack.sodium_score);  
        window.localStorage.setItem("processed_score", this.state.snack.processed); 
        window.localStorage.setItem("serving_size", this.state.snack.serving_size); 
    }

    refreshForCalculate() {

        // document.getElementById("result").innerHTML = "Your score is 4.5";
        // this.getScoreBreakdown(tableData);
        window.localStorage.setItem("TokenBoolean", "true");
        window.location.reload();

        this.setValues();
    }


    getScoreBreakdown() {
        return tableData.map((item, i) => (
            <ScoreRow data={item}
                key={i}/>
        ));
    }



    render() {        
        
        if (localStorage.getItem("TokenBoolean") === "false") {
            return (              

                <div>
                    <div className={
                        SnackDetailsStyles.div
                    }>
                        <h2>Snack Score Calculator</h2>
                        <p className="text">Portion Size (grams)</p>
                        <input type="text" id="portion" onChange={(e) => {window.localStorage.setItem("UserInput", e.target.value);}}></input>
                        <p id="result"></p>

                        <div>
                        <DropdownButton id="dropdown-units-button" title="Units">
                            <Dropdown.Item href="">Grams</Dropdown.Item>
                            <Dropdown.Item href="">Tablespoon</Dropdown.Item>
                            <Dropdown.Item href="">Tea Spoon</Dropdown.Item>
                            <Dropdown.Item href="">Ounces</Dropdown.Item>
                            <Dropdown.Item href="">Kilograms</Dropdown.Item>
                            <Dropdown.Item href="">Pounds</Dropdown.Item>
                        </DropdownButton> 
                    </div>
                    <div>
                            <p></p>
                         </div>

                        <button className={
                                SnackDetailsStyles.btn
                            }
                            onClick={
                                () => {
                                    this.refreshForCalculate();
                                    window.localStorage.setItem("TokenBoolean", "true");
                                }
                        }>Calculate</button>

                    <div>
                    <button className={
                            SnackDetailsStyles.btn
                        }
                        onClick={
                            () => {
                                window.localStorage.setItem("TokenBoolean", "false");
                                window.location.href = "http://localhost:3000/snacks";
                            }
                    }>Return to search</button>
                    </div>

                    </div>


                </div>
            );
        } else {            
            CalculateTotalScore();

            return (
                <div>

                    <div className={
                        SnackDetailsStyles.div
                    }>
                        <p className={
                            SnackDetailsStyles.snackname
                        }>
                            {
                            this.state.snack && this.state.snack.product
                        } </p>
                        <p className={
                            SnackDetailsStyles.snackname2
                        }>
                            Serving size : {
                            localStorage.getItem("UserInput")
                        }
                            grams
                        </p>
                        <table className={
                                styles.table
                            }
                            style={
                                {marginTop: 20}
                        }>
                            <tbody>
                                <tr>
                                    <th>Total Score</th>
                                    <td>{
                                        window.localStorage.getItem("totalScore")
                                    }</td>
                                </tr>
                                <tr>
                                    <th>First Ingredient Score</th>
                                    <td>{
                                        window.localStorage.getItem("firstIngredient")
                                    }</td>
                                </tr>
                                <tr>
                                    <th>Total Calories Score</th>
                                    <td>{
                                        window.localStorage.getItem("calorieScore")
                                    }</td>
                                </tr>
                                <tr>
                                    <th>Fat Score</th>
                                    <td>{
                                        window.localStorage.getItem("totalFat")
                                    }</td>
                                </tr>
                                <tr>
                                    <th>Saturated Fat Score</th>
                                    <td>{
                                        window.localStorage.getItem("satFat")
                                    }</td>
                                </tr>
                                <tr>
                                    <th>Trans Fat Score</th>
                                    <td>{
                                        window.localStorage.getItem("transFat")
                                    }</td>
                                </tr>
                                <tr>
                                    <th>Sodium Score</th>
                                    <td>{
                                        window.localStorage.getItem("sodium")
                                    }</td>
                                </tr>
                                <tr>
                                    <th>Sugar Score</th>
                                    <td>{
                                        window.localStorage.getItem("sugar")
                                    }</td>
                                </tr>
                                <tr>
                                    <th>Processed Score</th>
                                    <td>{
                                        window.localStorage.getItem("processed")
                                    }</td>
                                </tr>
                            </tbody>
                        </table>

                    </div>


                    <div className={
                        SnackDetailsStyles.div
                    }>
                        <h2>Score Breakdown</h2>
                        <table id="myTable"
                            className={
                                styles.table
                            }
                            style={
                                {marginTop: 20}
                        }>
                            <thead>
                                <tr>
                                    <th>Criteria</th>
                                    <th>Score</th>
                                    <th>Max Score</th>
                                </tr>
                            </thead>
                            <tbody>{this.getScoreBreakdown()}</tbody>
                        </table>
                    </div>
                    <div>
                    <button className={
                            SnackDetailsStyles.btn
                        }
                        onClick={
                            () => {
                                window.location.href = "http://localhost:3000/snacksgraph";                                
                            }
                    }>Consume</button>
                    <p></p>
                    <button className={
                            SnackDetailsStyles.btn
                        }
                        onClick={
                            () => {
                                window.localStorage.setItem("TokenBoolean", "false");
                                window.location.href = "http://localhost:3000/snacks";
                            }
                    }>Return to search</button>

                    </div>
                </div>
            )
        }
    }
}


function CalculateTotalScore()
{    
    let gInputUser = localStorage.getItem("UserInput"); // Score input by the user on the page. 
    let gRatio = 0.0;
    let totalScore = 0.0;
    let firstIngredient = "";
    let calories = 0.0;
    let calorieScore = 0.0;
    let totalFat = 0.0;
    let satFat = 0.0;
    let transFat = 0.0;
    let sodium = 0.0;
    let sugar = 0.0;
    let processed = 0.0;    

    // If the gram unit is not the same as the one on the snack database.
    if(gInputUser !== window.localStorage.getItem("serving_size"))
    {
        // Calculating the gRatio. 
        gRatio = gInputUser / window.localStorage.getItem("serving_size"); 
    }

    // First ingredient. 
    switch(window.localStorage.getItem("first_ingredient")) {
    case "dairy":
        firstIngredient = 2; 
    break;
    case "fruit":
        firstIngredient = 2; 
    break;
    case "fruits":
        firstIngredient = 2; 
    break;
    case "nuts":
        firstIngredient = 2; 
    break;
    case "protein":
        firstIngredient = 2; 
    break;
    case "vegetable":
        firstIngredient = 2; 
    break;
    default:
        firstIngredient = 0;       
    }

    // If the gram unit is not the same as the one on the snack database.
    if(gInputUser !== window.localStorage.getItem("serving_size"))
    {
        // Calories.    
        calories = gRatio * window.localStorage.getItem("total_calories"); // In case that quantity is not the same as the db, adjust it.
    }
    else 
    {
        // Calories.    
        calories = window.localStorage.getItem("total_calories"); 
    }
    
    // Classify calories.
    if (calories >= 1.0 && calories <= 50) {
        calorieScore = 2;
    } else if (calories >= 50.1 && calories <= 100) {
    calorieScore = 1.5;
    } 
    else if (calories >= 100.1 && calories <= 150) {
        calorieScore = 1;
    } 
    else if (calories >= 150.1 && calories <= 200) {
        calorieScore = 0.5;
    }
    else if (calories >= 200.1) {
        calorieScore = 0;
    }else {
        console.log("Error calories");
    }

    // Total Fat. (35% of  Calories)
    totalFat = (calories * 35) / 100; 

    // Classify totalFat.
    if (totalFat >= 0 && totalFat <= 20) {
        totalFat = 1;
    } else if (totalFat >= 20.1 && totalFat <= 35) {
        totalFat = 0.5;
    } else if (totalFat >= 35.1) {
        totalFat = 0;
    } else {
        console.log("Error totalFat");
    }

    // Saturated Fat. (10% of  Calories)
    satFat = (calories * 10) / 100; 

    // Classify satFat.
    if (satFat >= 0 && satFat <= 4.9) {
        satFat = 1;
    } else if (satFat >= 5.0 && satFat <= 9.9) {
        satFat = 0.5;
    } else if (satFat >= 10) {
        satFat = 0;
    } else {
        console.log("Error satFat");
    }

    // Classify transFat.
    if(window.localStorage.getItem("trans_fat") > "0")
    {
        transFat = 0;                 
    } else if (window.localStorage.getItem("trans_fat") === "0") {
        transFat = 1;
    } else {
        console.log("Error transFat");
    }



    // If the gram unit is not the same as the one on the snack database.
    if(gInputUser !== window.localStorage.getItem("serving_size"))
    {
        // Sodium.    
        sodium = gRatio * window.localStorage.getItem("sodium_score"); // In case that quantity is not the same as the db, adjust it.
    }
    else 
    {
        // Sodium.    
        sodium = window.localStorage.getItem("sodium_score");
    }
    
    // Classify Sodium.
    if (sodium >= 0 && sodium <= 140) {
        sodium = 1;
    } else if (sodium >= 140.1 && sodium <= 170) {
        sodium = 0.5;
    } 
    else if (sodium >= 170.1 && sodium <= 200) {
        sodium = 0.25;
    } 
    else if (sodium >= 200.1) {
        sodium = 0;
    }else {
        console.log("Error Sodium");
    }   

    // Sugar (35% Weight).
    sugar = (gInputUser * 35) / 100; 

    // Classify Sugar.
    if (sugar >= 0 && sugar <= 14.9) {
        sugar = 2;
    } else if (sugar >= 15 && sugar <= 19.9) {
        sugar = 1.5;
    } 
    else if (sugar >= 20 && sugar <= 24.9) {
        sugar = 1;
    } 
    else if (sugar >= 25 && sugar <= 35) {
        sugar = 0.5;
    } 
    else if (sugar >= 35.1) {
        sugar = 0;
    }else {
        console.log("Error Sugar");
    }   
 
        
    // Food Process clasisfication
    if(window.localStorage.getItem("processed_score").toLowerCase() === "yes") {
        processed = -1;
    } else if (window.localStorage.getItem("processed_score").toLowerCase() === "no") {
        processed = 0;
    } else {
        console.log("Error clasisfication");
    }

    totalScore = firstIngredient + calorieScore + totalFat + satFat + transFat + sodium + sugar + processed;
    window.localStorage.setItem("totalScore", totalScore);  
    window.localStorage.setItem("firstIngredient", firstIngredient);  
    window.localStorage.setItem("calorieScore", calorieScore);  
    window.localStorage.setItem("totalFat", totalFat);  
    window.localStorage.setItem("satFat", satFat);  
    window.localStorage.setItem("transFat", transFat);  
    window.localStorage.setItem("sodium", sodium);  
    window.localStorage.setItem("sugar", sugar);  
    window.localStorage.setItem("processed", processed);     
}
