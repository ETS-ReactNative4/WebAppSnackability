import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { fetchSnacksListUSDA,fetchSnacksByNameUSDA } from '../services/snack.service.js'; 
import { debounce } from '../utils/debounce';

import styles from '../styles/styles.module.css';

import { Button, Col, Container, Form, Row, Table,Card} from 'react-bootstrap';
import Scanner from './Scanner'
//import Result from './Result'

const Snacks = ({snacks}) => (
    <tr>
        <td>
        <Link to={`/usda/${snacks.fdcId}`}>{snacks.description}</Link><br/>
        <span className="text-muted">{snacks.brandOwner}</span>
        </td>        
        <td>{snacks.dataType}</td>        
        <td>{snacks.foodNutrients[4] ? snacks.foodNutrients[4].amount : "-"} {snacks.foodNutrients[4] ? snacks.foodNutrients[4].unitName : ""}</td>               
        <td>{snacks.foodNutrients[2] ? snacks.foodNutrients[2].amount : "-"} {snacks.foodNutrients[2] ? snacks.foodNutrients[2].unitName : ""}</td>               
        <td>{snacks.foodNutrients[16] ? snacks.foodNutrients[16].amount : "-"} {snacks.foodNutrients[16] ? snacks.foodNutrients[16].unitName : ""}</td>               
        <td>{snacks.foodNutrients[15] ? snacks.foodNutrients[15].amount : "-"} {snacks.foodNutrients[15] ? snacks.foodNutrients[15].unitName : ""}</td>               
        <td>{snacks.foodNutrients[10] ? snacks.foodNutrients[10].amount : "-"} {snacks.foodNutrients[10] ? snacks.foodNutrients[10].unitName : ""}</td>               
        <td>{snacks.foodNutrients[9] ? snacks.foodNutrients[9].amount : "-"}</td>                            
    </tr>   
);

export default class SnackList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            snacks: [], 
            isLoading: false,     
            scanning: false,
            results: [],
            lastBarcode: null       
        };
    }

    _scan = () => {
        this.setState({ scanning: !this.state.scanning })
    }
    
    _onDetected = result => {
        console.log('result.codeResult.code: ' + result.codeResult.code);
        console.log('this.state.lastBarcode: ' + this.state.lastBarcode);
        
        if (this.state.lastBarcode || result.codeResult.code !== this.state.lastBarcode) {
            this.searchForItem(result.codeResult.code);
            console.log('THE RESULT IS: ' + result.codeResult.code);   
        }        

        this.setState({ results: this.state.results.concat([result]), lastBarcode: result.codeResult.code});
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
        
        return (            
            snacksList &&
            snacksList.map((currentSnack, i) => (
                <Snacks snacks={ currentSnack } key={i}/>
            ))
        );
    }

    render() {

        return (
            
            <Container fluid  className="mt-5">    
                <Row>
                    <Col>        
                        <Form.Group controlId="formControlPortion">
                            <Form.Control id="a" type="search" placeholder="🔎 Search for a snack's brand name..."             
                                onKeyUp={ (event) => this.searchForItem(event.target.value) }          
                            />
                       </Form.Group>
                    </Col>
                </Row>                  
            
                <Button variant="primary" onClick={this._scan}>{this.state.scanning ? 'Stop' : 'Or Scan the Barcode!'} 📷</Button>                                                             
                
                {this.state.scanning ? <Scanner onDetected={this._onDetected} /> : null}                     

                <Row className="mt-1">
                    <Col>
                        <Table striped hover>
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
                            </tr>
                            </thead>
                            <tbody>
                                <tr className={this.state.isLoading ? 'd-table-row' : 'd-none'}>
                                    <td colSpan="12" className="text-center">Loading...</td>
                                </tr>
                                { !this.state.isLoading && this.SnackList() }                        
                            </tbody>
                            {console.log(this.state.snacks)}                                                        
                        </Table>
                    </Col>
                </Row>          
            </Container>
        );

    }

}
