import React, { Component } from 'react';
import styles from "./styles.module.css";
import scorestyles from "./scorestyles.module.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {searchByID, snackScoreByID} from "./search.js";


function score() {
    var score = document.getElementById('portion').value;

    let input = window.localStorage.getItem('ObjectIDToScore');
    
    document.getElementById("result").innerHTML = "Your score is 4.5";
    loadTableData(tableData);
}

var tableData = [
    { criteria: 'First Ingredient', score: "0", maxscore: "2" }, 
    { criteria: 'Total Calories', score: "0.5", maxscore: "2"  },
    { criteria: 'Fat', score: "0", maxscore: "1"   },
    { criteria: 'Saturated Fat', score: "0.5", maxscore: "1"   },
    { criteria: 'TransFat', score: "1", maxscore: "1"   },
    { criteria: 'Sodium', score: "0.5", maxscore: "1"   },
    { criteria: 'Sugar', score: "2", maxscore: "2"   },
]

const Snacks = ({ snacks }) => (
    <tr>

      <td>{snacks.total_score}</td>
      <td>{snacks.first_ingredient_score}</td>
      <td>{snacks.total_calories_score}</td>
      <td>{snacks.fat_score}</td>
      <td>{snacks.saturated_fat_score}</td>
      <td>{snacks.trans_fat_score}</td>
      <td>{snacks.sodium_score}</td>
      <td>{snacks.sugar_score}</td>

    </tr>
);

function loadTableData(tableData) {
    var tableBody = document.getElementById('tableData');
    tableBody.innerHTML = "";

    for (var i = 0; i < tableData.length; i++) {
        var row = `<tr>
                        <td>${tableData[i].criteria}</td>
                        <td>${tableData[i].score}</td>
                        <td>${tableData[i].maxscore}</td>
                    </tr>`;
        tableBody.innerHTML += row
    }
}

console.log(window.localStorage.getItem('ObjectIDToScore'));

export default class SnackScore extends Component {
    getObjectID () {
        let objectid = window.localStorage.getItem('ObjectIDToScore');
        return objectid;
    }

    constructor(props) {
        super(props);
            this.state = { snacks: null };          
    }
    
    setSnackState(snacks = null) {
        this.setState({ snacks });        
    }
    
    componentDidMount() {
        //let input = document.getElementById("a").value;
        let input = window.localStorage.getItem('ObjectIDToScore');
        const callback = (snacks) => this.setSnackState(snacks);
        snackScoreByID(input, callback);
    }

    SnackList() {
        const snacksList = this.state.snacks;
        return (
          snacksList &&
          snacksList.map((currentSnack, i) => (
            <Snacks snacks={currentSnack} key={i} />
          ))
        );
    }

    render() {

        return (
            
            <Router>

                <div className = {scorestyles.div}>
                    <p class = {scorestyles.snackname}>Lays Classic potato chips</p>
                    <p class = {scorestyles.snackname2}>Recommended serving size : 28 grams</p>

                    <p>{this.SnackList()}</p>
                </div>
                
                <div className = {scorestyles.div}>
			        <h2>Snack Score Calculator</h2>
			        <p class="text">Portion Size (grams)</p>
			        <input type="text" id="portion"></input>
			        <p id="result"></p>
			        <button className = {scorestyles.btn} onClick = {score}>Calculate</button>
 
		        </div>

                <div className = {scorestyles.div}>
			        <h2>Score Breakdown</h2>

                    
                    <table id = "myTable" className={styles.table} style={{ marginTop: 20 }} >
                        <thead>
                            <tr>
                                <th>Criteria</th>
                                <th>Score</th>
                                <th>Max Score</th>

                                <tbody>{this.SnackList}</tbody>
                            </tr>
                        </thead>

                        <tbody id = "tableData"> </tbody>
                    </table>
		        </div>   

                <Route path = "/search" exact component = {SnackScore} />
            
            </Router>
        
        )
    }
}

/**
 *                     <p className = {scorestyles.body}> {window.localStorage.getItem('ObjectIDToScore')} </p>
 *                     <h1 className = {scorestyles.h1}>Snack Score</h1>
 */