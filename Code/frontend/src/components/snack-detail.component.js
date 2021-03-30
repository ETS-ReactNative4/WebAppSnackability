import React, { Component } from 'react';
import styles from "./styles.module.css";
import {storeInput} from "./search.js";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';



export default class SnackDetail extends Component {
    
    constructor(props) {
        super(props);
            this.state = { snacks: null };
            this.id = "";          
    }
    
    setSnackState(snacks) {

        this.setState({ snacks });    
    }
    
    componentDidMount() {
        //let input = window.localStorage.getItem('MySavedValue');
        let inputID = window.localStorage.getItem('SavedSnackToCalc');
        this.state.snacks = JSON.parse(inputID);
        //this.setSnackState(JSON.parse(inputID));
        //const callback = (snacks) => this.setSnackState(snacks);
        //storeInput(inputID, callback);
    }

    SnackList() {
        let inputID = window.localStorage.getItem('SavedSnackToCalc');
        console.log(inputID);
        this.state.snacks = JSON.parse(inputID);
        return (
            <tbody>
            <tr><td>First Ingredient</td><td>{this.state.snacks.first_ingredient}</td>2<td></td></tr>
            <tr><td>Calories</td><td>{this.state.snacks.calories}</td>2<td></td></tr>
            <tr><td>Saturated Fats</td><td>{this.state.snacks.saturated_fat}</td>0.5<td></td></tr>
            <tr><td>Trans Fat</td><td></td><td></td></tr>
            <tr><td>Sodium</td><td></td><td></td></tr>
            <tr><td>Sugars:</td><td></td><td></td></tr>
            <tr><td>Highly Processed</td><td></td><td></td></tr> 
            <tr><td>Total</td><td></td></tr> 
        <tr></tr>
        </tbody>
            );
    }

    render() {
        

        return (
            <div className = "searcho">

                <table id = "myTable" className={styles.table} /*style={{ marginTop: 20 }}*/ >
                    <thead>
                        
                        <tr>
                            <th>Criteria</th>
                            <th>Score</th>
                            <th>Max Score</th>
                            
                        </tr>
                    </thead>
                    { this.SnackList() }
                </table>
            </div>
        )
   
    }

}



