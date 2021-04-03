import React, { Component } from 'react';
import styles from "./styles.module.css";

export default class Snackability extends Component {
    render() {

        return (
            <div id>
                <h1 className = {styles.h1}>Welcome to Snackability</h1>

                <p className = {styles.body}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lobortis elementum nibh tellus molestie. Nec ultrices dui sapien eget mi proin sed. Turpis nunc eget lorem dolor sed viverra ipsum nunc aliquet. Tristique senectus et netus et malesuada fames ac turpis. Duis at consectetur lorem donec massa. Neque convallis a cras semper auctor neque vitae tempus quam. Ornare arcu dui vivamus arcu felis bibendum ut. Blandit massa enim nec dui nunc mattis enim ut. Arcu felis bibendum ut tristique et. Netus et malesuada fames ac turpis. Eu feugiat pretium nibh ipsum.</p>
            
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

/**
 *
 */