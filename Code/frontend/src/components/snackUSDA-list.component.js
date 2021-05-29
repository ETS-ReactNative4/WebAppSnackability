import React, { Component } from 'react';
//import { Link } from 'react-router-dom';

import { fetchSnacksListUSDA,fetchSnacksByNameUSDA } from '../services/snack.service.js'; /* Testinggggggggggggggggggggggggggggggggggggggggggggggggggggggggg */
import { debounce } from '../utils/debounce';

import styles from '../styles/styles.module.css';

const Snacks = ({snacks}) => (
    <tr>
        <td>{snacks.description}</td>        
        <td>{snacks.fdcId}</td>        
        <td>{snacks.dataType}</td>
        <td>{snacks.publicationDate}</td>             
        <td>{snacks.brandOwner}</td>                  
        <td>{snacks.gtinUpc}</td>                  
        <td>{snacks.publicationDate}</td>                  
        <td>{snacks.brandOwner}</td>                  
        <td>{snacks.gtinUpc}</td>                  
        <td>{snacks.dataType}</td>                  
    </tr>


    /*
    This are suppossed to be the values Array is undefined.
    <tr>
        <td>{snacks.description}</td>        
        <td>{snacks.dataType}</td>        
        <td>{snacks.foodNutrients[4].name}</td>
        <td>{snacks.foodNutrients[2].name}</td>             
        <td>{snacks.foodNutrients[16].name}</td>                  
        <td>{snacks.foodNutrients[15].name}</td>                  
        <td>{snacks.foodNutrients[10].name}</td>                  
        <td>{snacks.foodNutrients[9].name}</td>                  
        <td>{snacks.foodNutrients[9].name}</td>                  
        <td>{snacks.foodNutrients[9].name}</td>                  
    </tr>
    */

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
        this.fetchSnacksListUSDA();
    }

    fetchSnacksListUSDA() {
        
        this.setState({ isLoading: true });

        fetchSnacksListUSDA()
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
            fetchSnacksByNameUSDA(keyword)
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
        console.log('hello');
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
                        <th>First Ingradient</th>                        
                        <th>Processed Food</th>                        
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
