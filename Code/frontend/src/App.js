import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {Navbar, Nav, Form, FormControl, Button} from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";

import SnackList from "./components/snack-list.component"
import Snackability from "./components/snackability-home.component";

import logo from "./images/logo.svg";

class App extends Component {
  render () {
    return (
      <Router>
        <div className = "App" >
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/#">
              <img src={logo} width="80" height="10%" alt="Snackability" />
            </Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/snacks">Snack List</Nav.Link>
            </Nav>
          </Navbar>
        <br />
            <Route path ="/snacks" exact component = {SnackList} />
            <Route path="/" exact component= {Snackability} />
        </div>
    </Router>
    )
  }
}

export default App;