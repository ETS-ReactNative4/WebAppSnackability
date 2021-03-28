import React, { Component } from 'react';
// eslint-disable-next-line
import styles from "./styles.module.css";
// eslint-disable-next-line
import { Link } from 'react-router-dom';
import axios from 'axios';

//<td>{props.snacks._id}</td>

const Snacks = props => (
    <tr>
        
        <td>{props.snacks.brand_name}</td>
        <td>{props.snacks.product}</td>
        <td>{props.snacks.short_name}</td>
        <td>{props.snacks.serving_size}</td>
        <td>{props.snacks.calories}</td>
        <td>{props.snacks.calories_fat}</td>
        <td>{props.snacks.saturated_fat}</td>
        <td>{props.snacks.trans_fat}</td>
        <td>{props.snacks.sodium}</td>
        <td>{props.snacks.sugar}</td>
        <td>{props.snacks.first_ingredient}</td>
        <td>{props.snacks.processed}</td>

    </tr>
)

export default class SnackList extends Component {
    constructor(props) {
        super(props);
        this.state = {snacks: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/snacks/')
            .then(response => {
                this.setState({ snacks: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    SnackList() {
        return this.state.snacks.map(function(currentSnack, i){
            return <Snacks snacks={currentSnack} key={i} />;
        })
    }

    render() {
        
        return (
            
            <div>

                <table id = "myTable" className= {styles.table} >
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
                        { this.SnackList() }
                    </tbody>
                </table>

                   
            </div>

            
        )
    }
}
