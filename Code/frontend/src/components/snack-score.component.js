import React, { Component } from 'react';
import styles from "./styles.module.css";
import scorestyles from "./scorestyles.module.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {searchByID} from "./search.js";


function score() {
    var score = document.getElementById('portion').value;

    document.getElementById("result").innerHTML="Your score is " + score;
    loadTableData(tableData);
}

var tableData = [
    { criteria: 'First Ingredient', score: "", maxscore: "2" }, 
    { criteria: 'Total Calories', score: "", maxscore: "2"  },
    { criteria: 'Fat', score: "", maxscore: "1"   },
    { criteria: 'Saturated Fat', score: "", maxscore: "1"   },
    { criteria: 'TransFat', score: "", maxscore: "1"   },
    { criteria: 'Sodium', score: "", maxscore: "1"   },
    { criteria: 'Sugar', score: "", maxscore: "2"   },
]

const Snacks = ({ snacks }) => (
    <tr>

      <td>{snacks.brand_name}</td>
      <td>{snacks.product}</td>
      <td>{snacks.short_name}</td>
      <td>{snacks.serving_size}</td>
      <td>{snacks.calories}</td>
      <td>{snacks.calories_fat}</td>
      <td>{snacks.saturated_fat}</td>
      <td>{snacks.trans_fat}</td>
      <td>{snacks.sodium}</td>
      <td>{snacks.sugar}</td>
      <td>{snacks.first_ingredient}</td>
      <td>{snacks.processed}</td>        

    </tr>
);

function loadTableData(tableData) {
    var tableBody = document.getElementById('tableData');

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
        searchByID(input, callback);
        console.log(callback);
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
                
                <div id>

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