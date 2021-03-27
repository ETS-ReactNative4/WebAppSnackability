import React, { Component } from 'react';
import styles from "./styles.module.css";
import {storeInput} from "./search.js";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';


const Snacks = ({ snacks }) => (
    <tr>
        <td>{snacks._id}</td>
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
                <button
                  className= {styles.buttonCalculate}
                  onClick={() => calculateData(snacks._id)}
                >
                  Calculate
                </button>
        </td>
    </tr>
);

function testinValue(){    
    window.localStorage.setItem('MySavedValue', document.getElementById("a").value); // save data
    window.location.reload();
}

const calculateData = async (SnackID) => {

    alert("Redirecting to the calculate Page");
    alert("You Clicked on Row with ID == " + SnackID);
};

export default class SnackSearch extends Component {
    
    constructor(props) {
        super(props);
            this.state = { snacks: null };          
    }
    
    setSnackState(snacks = null) {
        this.setState({ snacks });        
    }
    
    componentDidMount() {
        let input = window.localStorage.getItem('MySavedValue');
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
            <div className = "search">

                <input className = {styles.input} type = "search" id="a" maxLength="50" placeholder = "Type your snack's brand name"> 

              </input>

                <button type="button" onClick={testinValue}>Submit</button>

                <table id = "myTable" className={styles.table} /*style={{ marginTop: 20 }}*/ >
                    <thead>
                        
                        <tr>
                            <th>Object ID</th>
                            <th>Brand Name</th>
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
                    <tbody>
                        { this.SnackList() }
                    </tbody>
                </table>
            </div>
        )
   
    }

}
