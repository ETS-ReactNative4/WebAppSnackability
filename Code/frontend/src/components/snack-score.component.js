import React, { Component } from 'react';
import styles from "./styles.module.css";
import scorestyles from "./scorestyles.module.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function score() {
    var score = document.getElementById('portion').value;

    document.getElementById("result").innerHTML="Your score is " + score;
}

window.onload = () => {
    loadTableData(tableData);
}

var tableData = [
    { Criteria: 'First Ingredient' }, 
    { Criteria: 'TotalCalories' },
    { Criteria: 'Fat' },
    { Criteria: 'Saturated Fat' },
    { Criteria: 'TransFat' },
    { Criteria: 'Sodium' },
    { Criteria: 'Sugar' },
    { Criteria: 'Highly Processed' },
]

function loadTableData(tableData) {
    const tableBody = document.getElementById('tableData');

    let dataHtml = '';

    for (let criteria of Object.keys(tableData)) {
        dataHtml += `<tr><td>${criteria.Criteria}</td>`;
    }
    console.log(dataHtml)
}

console.log(window.localStorage.getItem('ObjectIDToScore'));

export default class SnackScore extends Component {
    getObjectID () {
        let objectid = window.localStorage.getItem('ObjectIDToScore');
    }


    render() {

        return (
            
            <Router>
                
                <div id>
                    <h1 className = {scorestyles.h1}>Snack Score</h1>

                    <p className = {scorestyles.body}> {window.localStorage.getItem('ObjectIDToScore')} </p>
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
                                <th></th>
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
