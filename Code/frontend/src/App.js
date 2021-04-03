import React, { Component } from "react";
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// eslint-disable-next-line
import {Navbar, Nav, Form, FormControl, Button} from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";

import SnackList from "./components/snack-list.component"
import Snackability from "./components/snackability-home.component";
import SnackSearch from "./components/snack-search.component"

// eslint-disable-next-line
import styles from "./App.css"

import logo from "./images/logo.svg";

class App extends Component {
  render () {
    return (
      <Router>
        <div className = "App" >
          <Navbar variant="dark" className="NavBarStyle">
            <Navbar.Brand href="/#">
              <img src={logo} width="80" height="10%" alt="Snackability" />
            </Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/snacks">Snack List</Nav.Link>
                <Nav.Link href="/search">Search</Nav.Link>
            </Nav>
          </Navbar>
        <br />
            <Route path = "/" exact component= {Snackability} />
            <Route path = "/snacks" exact component = {SnackList} />
            <Route path = "/search" exact component = {SnackSearch} />
        </div>
    </Router>
    )
  }
}

export default App;