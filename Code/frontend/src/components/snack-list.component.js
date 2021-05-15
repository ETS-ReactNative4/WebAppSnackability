import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { fetchSnacksList, fetchSnacksByName } from '../services/snack.service.js';
import { debounce } from '../utils/debounce';

import styles from '../styles/styles.module.css';

const Snacks = ({snacks}) => (
    <tr>
        <td>
            <Link to={`/snacks/${snacks._id}`}>{snacks.product}</Link><br/>
            <span className="text-muted">{snacks.brand_name}</span>
        </td>
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
        this.state = {
            snacks: null,
            isLoading: false
        };
    }

    componentDidMount() {
        this.fetchSnacksList();
    }

    fetchSnacksList() {
        this.setState({ isLoading: true });
        fetchSnacksList()
            .then(response => response.data)
            .then((snacks) => {
                this.setState({ snacks: snacks, isLoading: false });
            })
            .catch(error => {
                console.error(error);
                this.setState({ isLoading: false });
            })
    }

    searchForItem(keyword) {
        debounce(() => {
            this.setState({ isLoading: true });
            fetchSnacksByName(keyword)
                .then(response => response.data)
                .then((snacks) => {
                    this.setState({ snacks: snacks, isLoading: false });
                })
                .catch(error => {
                    console.error(error);
                    this.setState({ isLoading: false });
                });
        }, 1000);
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

    render() {

        return (
            <div className="search">

                <input type="search"
                       onKeyUp={ (event) => this.searchForItem(event.target.value) }
                       style={{ width: '100%', outline: 'none' }}
                       id="a"
                       maxLength="50"
                       placeholder="Search for a snack's brand name..."/>

                <table className={ styles.table } style={{ marginTop: 20 }}>
                    <thead>
                    <tr>
                        <th>Product</th>
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
                        <tr className={this.state.isLoading ? 'd-table-row' : 'd-none'}>
                            <td colSpan="12" className="text-center">Loading...</td>
                        </tr>
                        { !this.state.isLoading && this.SnackList() }
                    </tbody>
                </table>
            </div>
        );

    }

}
