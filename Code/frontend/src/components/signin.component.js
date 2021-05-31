import React, { Component } from 'react';

import {/* Card, Col, Container, *//*Jumbotron,*/ Button/*, Row */} from 'react-bootstrap';
import "../styles/home.css"


/*import ReactDOM from 'react-dom'*/
import Scanner from './Scanner'
import Result from './Result'


export default class HomeComponent extends Component {   
    state = {
        scanning: false,
        results: [],
    }

    _scan = () => {
        this.setState({ scanning: !this.state.scanning })
    }
    
    _onDetected = result => {
        this.setState({ results: this.state.results.concat([result]) })
    }

    render() {
        return (      
            <div>
                <div>
                    <Button variant="primary" onClick={this._scan}>{this.state.scanning ? 'Stop' : 'Or Scan the Barcode!'} 📷</Button>

                    <ul className="results">
                        {this.state.results.map((result, i) => (
                            <Result key={result.codeResult.code + i} result={result} />                            
                        ))}
                    </ul>

                    {this.state.scanning ? <Scanner onDetected={this._onDetected} /> : null}
                </div>
                
                {/*
                <Jumbotron fluid className="position-absolute w-100 text-center mt-4">
                    <h6>Contact the Product Owner</h6>
                    <p>For questions or to provide feedback in regards to the Snackability app, please email
                        Dr. Cristina Palacios:</p>
                    <p>crpalaci@fiu.edu</p>
                    <p>snackabilityapp@gmail.com</p>
                </Jumbotron>
                */}

            </div>
        );
    }
}
