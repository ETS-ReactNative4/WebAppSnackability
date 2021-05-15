import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { fetchSnacksList, fetchSnacksByName } from '../services/snack.service.js';
import { debounce } from '../utils/debounce';

import styles from '../styles/styles.module.css';

const Snacks = ({snacks}) => (
    <tr>
        <td>{snacks.brand_name}</td>
        <td>
            <Link to={`/snacks/${snacks._id}`}>{snacks.product}</Link>
        </td>
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
    </tr>
);

export default class SnackList extends Component {

    constructor(props) {
        super(props);
        this.state = { snacks: null };
    }

    componentDidMount() {
        this.fetchSnacksList();
    }

    fetchSnacksList() {
        fetchSnacksList((snacks) => {
            this.setState({ snacks: snacks });
        });
    }

    SnackList() {
        const snacksList = this.state.snacks;
        return (
            snacksList &&
            snacksList.map((currentSnack, i) => (
                <Snacks snacks={ currentSnack } key={i}/>
            ))
        );
    }

    searchForItem(event) {
        debounce(() => {
            fetchSnacksByName(event.target.value, (snacks) => {
                this.setState({ snacks: snacks });
            });
        }, 1000);
    }

    render() {

        return (
            <div className="search">

                <input type="search"
                       onKeyUp={ this.searchForItem.bind(this) }
                       className={ styles.input }
                       id="a"
                       maxLength="50"
                       placeholder="Search for a snack's brand name..."/>

                <table id="myTable" className={ styles.table } style={{ marginTop: 20 }}>
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
                    <tbody className={styles.tablebody}>
                        { this.SnackList() }
                    </tbody>
                </table>
            </div>
        );

    }

}
