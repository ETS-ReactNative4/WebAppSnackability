import React, { Component } from 'react';
import styles from "./styles.module.css";

export default class Snackability extends Component {

    render() {
        return (
            <div id>
                <h1 className = {styles.h1}>Welcome to Snackability</h1>

                <h3 className = {styles.h3}> Our Mission: </h3>
                <p className = {styles.body}> 
                    The goal of Snackability app is to help you identify healthy
                    snacks by providing a score from 0 (not healthy) to 10 (very healthy) to each snack searched in our app.  
                </p>

                
                <h3 className = {styles.h3}> Project Management: </h3>
                
                <div className = {styles.card}>
                    <img src="https://i.imgur.com/WeG8mAm.png" alt="Cristina Palacios"></img>
                    <h5>Cristina Palacios</h5>
                    <p class="title">Associate Professor</p>
                    <p>Florida International University</p>
                </div>

                <div className = {styles.card}>
                    <img src="https://i.imgur.com/B1Imo2h.png" alt="Lukkamol Prapkre"></img>
                    <h5>Lukkamol Prapkre</h5>
                    <p class="title">PhD Student</p>
                    <p>Florida International University</p>
                </div>
                
                <div className = {styles.footer}>
                    <h6>Contact the Product Owner</h6>
                    <p>For questions or to provide feedback in regards to the Snackability app, please email Dr. Cristina Palacios:</p>
                    <p>crpalaci@fiu.edu</p>
                    <p>snackabilityapp@gmail.com</p>
                </div>

            </div>
            
        )
    }
}
