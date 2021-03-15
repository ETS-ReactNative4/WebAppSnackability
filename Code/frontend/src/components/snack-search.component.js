import React, { Component } from 'react';
import styles from "./styles.module.css";
import {storeInput} from "./search.js";
import axios from 'axios';

export default class SnackSearch extends Component {
    render() {

        return (
            <div className = "search">
                <h1 className = {styles.h1}>Search for your snack</h1>
                
                <body>
                    <input className = {styles.input} onKeyUp = {storeInput} type = "text" id="a" maxLength="50" placeholder = "Type your snack's brand name"></input>
                </body>

            </div>
        )
   
    }
}
//                <h1 className = {styles.h1}>Search for your snack</h1>


//                    <input className = {styles.input} onKeyUp = {storeInput} type = "text" id="a" maxLength="50" placeholder = "Type your snack's brand name"></input>

/**
 *                 <table id = "myTable" className="table table-striped" style={{ marginTop: 20 }} >
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
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
 */

/**
 *     constructor(props) {
        super(props);
        this.state = {snacks: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/id/')
            .then(response => {
                this.setState({ snacks: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    SnackSearchList() {
        return this.state.snacks.map(function(currentSnack, i){
            return <Snacks snacks={currentSnack} key={i} />;
        })
    }
 */

 /**
  *                         { this.SnackSearchList() }
  */
