import React, { Component } from 'react';
import styles from "./styles.module.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


console.log(window.localStorage.getItem('ObjectIDToScore'));

export default class SnackScore extends Component {

    getObjectID () {
        let objectid = window.localStorage.getItem('ObjectIDToScore');
    }

    render() {
        
        return (
            
            <Router>
                
                <div id>
                    <h1 className = {styles.h1}>Snack Score</h1>

                    <p> {window.localStorage.getItem('ObjectIDToScore')} </p>
                </div>
                
                <Route path = "/search" exact component = {SnackScore} />
            
            </Router>
        
        )
    }
}