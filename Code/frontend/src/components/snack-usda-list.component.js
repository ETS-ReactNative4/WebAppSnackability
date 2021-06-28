import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { fetchSnacksListUSDA,fetchSnacksByNameUSDA } from '../services/snack.service.js';
import { debounce } from '../utils/debounce';

import { Button, Col, Container, Form, Row, Table} from 'react-bootstrap';
import Scanner from './Scanner'
//import Result from './Result'

const Snacks = ({snacks}) => (
    <tr>
        <td>
            <Link to={`/usda/${snacks.fdcId}`}>{snacks.description}</Link><br/>
            <span className="text-muted">{snacks.brandOwner}</span>
        </td>
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

        if (this.state.lastBarcode || result.codeResult.code !== this.state.lastBarcode) {
            this.searchForItem(result.codeResult.code);
        }

        this.setState({ results: this.state.results.concat([result]), lastBarcode: result.codeResult.code});
    }

    componentDidMount() {
        this.searchForItem("");
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

            <Container fluid className="mt-3">
                <Row>
                    <Col xs={12} sm={10}>
                        <Form.Group controlId="formControlPortion">
                            <Form.Control type="search" placeholder="🔎 Search for a snack's brand name..."
                                onKeyUp={ (event) => this.searchForItem(event.target.value) }
                            />
                       </Form.Group>
                    </Col>
                    <Col xs={12} sm={2}>
                        <Button variant="primary" onClick={this._scan}>{this.state.scanning ? 'Stop' : 'Or Scan the Barcode!'} 📷</Button>
                    </Col>
                </Row>

                {this.state.scanning ? <Scanner onDetected={this._onDetected} /> : null}

                <Row className="mt-3">
                    <Col>
                        <Table striped hover>
                            <thead>
                            <tr>
                                <th>Product</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr className={this.state.isLoading ? 'd-table-row' : 'd-none'}>
                                    <td colSpan="12" className="text-center">Loading...</td>
                                </tr>
                                { !this.state.isLoading && this.SnackList() }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        );

    }

}
