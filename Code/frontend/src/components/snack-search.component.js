import React, { Component } from 'react';
import styles from "./styles.module.css";
import {searchByID, storeInput} from "./search.js";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import SnackScore from "./snack-score.component"

console.log(window.localStorage.getItem('SearchInput'));

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
      
      <td className="operation">
        <button className={styles.buttonCalculate} onClick={() => calculateData(snacks._id)}>
            Calculate
        </button>
      </td>              
    </tr>
);

// Calculate Data For a user.
const calculateData = async (SnackID) => {

    window.localStorage.setItem('ObjectIDToScore', SnackID);
    window.location.href = "/snackscore";

    let searchID = window.localStorage.getItem('ObjectIDToScore');
    const callback = (SnackID) => this.setSnackState(SnackID);

    searchByID(searchID, callback);

};

function testinValue(){    
    window.localStorage.setItem('SearchInput', document.getElementById("a").value); // save data
    window.location.reload();
}

export default class SnackSearch extends Component {
    
    constructor(props) {
        super(props);
            this.state = { snacks: null };          
    }
    
    setSnackState(snacks = null) {
        this.setState({ snacks });        
    }
    
    componentDidMount() {
        //let input = document.getElementById("a").value;
        let input = window.localStorage.getItem('SearchInput');
        const callback = (snacks) => this.setSnackState(snacks);
        storeInput(input, callback);
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
                <div className = "search">

                    <input type="search" className = {styles.input}  id="a" /*value = "itos"*/ maxLength="50" placeholder = "Type your snack's brand name"> 

                </input>

                    <button className = {styles.searchButton} type="button" onClick={testinValue}>Submit</button>

                    <table id = "myTable" className={styles.table} style={{ marginTop: 20 }} >
                        <thead>
                            
                            <tr>
                                <th>Snack Name</th>
                                <th>Product</th>
                                <th>Short Name</th>
                                <th>Serving Size</th>
                                <th>Calories</th>
                                <th>Calories Fat</th>
                                <th>Saturated Fat</th>
                                <th>Trans Fat</th>
                                <th>Sodium</th>
                                <th>Sugar</th>
                                <th>First Ingredient</th>
                                <th>Processed</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className={styles.tablebody}>
                            { this.SnackList() }
                        </tbody>
                    </table>
                </div>

                <Route path = "/snackscore" exact component = {SnackScore} />

            </Router>
        )
   
    }

}
