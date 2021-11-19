import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { fetchSnacksListUSDA,fetchSnacksByNameUSDA } from '../services/snack.service.js';
import { debounce } from '../utils/debounce';

import { Button, Col, Container, Form, Row, Table, Modal} from 'react-bootstrap';
import Scanner from './Scanner'
//import Result from './Result'

const Snacks = ({snacks}) => (
    <tr>
        <td>
            <Link to={`/snacks/${snacks.fdcId}`}>{snacks.description}</Link><br/>
            <span className="text-muted">{snacks.brandOwner}</span>
        </td>
    </tr>
);

export class SnackListComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            snacks: [],
            isLoading: false,
            scanning: false,
            results: [],
            lastBarcode: null,
            modal: false,
        };
        this._toggle = this._toggle.bind(this);
    }

    _scan = () => {
        this.setState((prevState) => ({
            modal: !prevState.modal,
        }));
        this.setState({ scanning: !this.state.scanning });
    };

    _toggle() {
        this.setState((prevState) => ({
            modal: !prevState.modal,
        }));
    }

    _onDetected = (result) => {
        console.log(result);
        console.log('result.codeResult.code: ' + result.codeResult.code);
        console.log('this.state.lastBarcode: ' + this.state.lastBarcode);
        this.setState({ modal: false });
        /*if (
            this.state.lastBarcode ||
            result.codeResult.code !== this.state.lastBarcode
        ) {*/
        this.searchForItem(result.codeResult.code);
        console.log('THE RESULT IS: ' + result.codeResult.code);
        //}

        this.setState({
            results: this.state.results.concat([result]),
            //lastBarcode: result.codeResult.code,
        });
        // this.setState((prevState) => ({
        //     modal: !prevState.modal,
        // }));
        //this._toggle();
    };

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
                        <Button variant='primary' onClick={this._toggle}> Scan Barcode! 📷</Button>
                    </Col>
                </Row>

                {/*this.state.scanning ? <Scanner onDetected={this._onDetected} /> : null*/}

                <Modal show={this.state.modal} onHide={this._toggle}>
                    <Modal.Header closeButton='true' />
                    <Modal.Body>
                        <Scanner onDetected={this._onDetected} />
                    </Modal.Body>
                </Modal>

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
