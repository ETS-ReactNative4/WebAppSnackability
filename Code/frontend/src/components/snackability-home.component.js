import React, { Component } from 'react';
import styles from "./styles.module.css";
import { Card, List, ListItem, Button } from 'react-native-elements'

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
                <view>
                    <List>
                            <ListItem
                                roundAvatar
                                avatar = "a"
                                title = "Cristina Palacios"
                                subtitle="Associate Professor"
                            />
                    </List>
                </view>
            
                <img src="src/images/professorpalacios.png" alt="Avatar" class="avatar"></img>
                <img src="src/images/lukkamolprapkre.png" alt="Avatar" class="avatar"></img>

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
