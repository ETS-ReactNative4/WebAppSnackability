import React, { useContext, useState } from "react";
import { app, AuthContext } from "../utils/auth";
import { Nav, Navbar, NavDropdown, Container} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faCog,
  faCookie,
  faHome,
  faSignInAlt,
  faSignOutAlt,
  faPlus,
  faAddressBook,
} from "@fortawesome/free-solid-svg-icons";

import AppStyles from "../styles/app.module.css";
import logo from "../images/logo.svg";

export const NavbarComponent = () => {
  const { currentUser } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false);

  if (!!currentUser) {
    app
      .auth()
      .currentUser.getIdTokenResult(true)
      .then((idTokenResult) => {
        if (idTokenResult.claims.role !== "admin") {
          setIsAdmin(false);
        } else {
          setIsAdmin(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    if (isAdmin) {
      return (
        <Navbar collapseOnSelect  fixed='top' expand='sm' bg='dark' variant="dark" className={AppStyles.NavBarStyle}>

            <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
            
            <Navbar.Brand href="/#">
              <img src={logo} width="40" height="auto" alt="Snackability" />
            </Navbar.Brand>

            <Navbar.Collapse id='responsive-navbar-nav'>


            <Nav className="mr-auto">
              <Nav.Link href="/">
                <FontAwesomeIcon icon={faHome} /> Home
              </Nav.Link>
              <Nav.Link href="/usda">
                <FontAwesomeIcon icon={faCookie} /> Snacks
              </Nav.Link>
              <Nav.Link href="/snacksgraph">
                <FontAwesomeIcon icon={faChartLine} /> Snacks Graph
              </Nav.Link>
              <Nav.Link href="/contactus">
                <FontAwesomeIcon icon={faAddressBook} /> Contact Us
              </Nav.Link>
            </Nav>
            
          
            <Nav>
              <NavDropdown id="nav-bar-dropdown" title="Admin">
                <NavDropdown.Item href={"/createaccount"}>
                  <span>
                    <FontAwesomeIcon icon={faPlus} /> Create New Account
                  </span>
                </NavDropdown.Item>
                <NavDropdown.Item href={"/manageUsers"}>
                  <span>
                    <FontAwesomeIcon icon={faCog} /> Manage Users
                  </span>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <NavDropdown id="nav-bar-dropdown" title={currentUser.email}>
                <NavDropdown.Item href={"/settings"}>
                  <span>
                    <FontAwesomeIcon icon={faCog} /> Settings
                  </span>
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => app.auth().signOut()}>
                  <span>
                    <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                  </span>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>

            </Navbar.Collapse>
        </Navbar>
      );
    } else {
      return (
        <Navbar variant="dark" className={AppStyles.NavBarStyle}>
          <Navbar.Brand href="/#">
            <img src={logo} width="40" height="auto" alt="Snackability" />
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/">
              <FontAwesomeIcon icon={faHome} /> Home
            </Nav.Link>
            <Nav.Link href="/usda">
              <FontAwesomeIcon icon={faCookie} /> Snacks
            </Nav.Link>
            <Nav.Link href="/snacksgraph">
              <FontAwesomeIcon icon={faChartLine} /> Snacks Graph
            </Nav.Link>
            <Nav.Link href="/contactus">
              <FontAwesomeIcon icon={faAddressBook} /> Contact Us
            </Nav.Link>
          </Nav>

          <Nav>
            <NavDropdown id="nav-bar-dropdown" title={currentUser.email}>
              <NavDropdown.Item href={"/settings"}>
                <span>
                  <FontAwesomeIcon icon={faCog} /> Settings
                </span>
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => app.auth().signOut()}>
                <span>
                  <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                </span>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar>
      );
    }
  } else {
    return (
      <Navbar variant="dark" className={AppStyles.NavBarStyle}>
        <Navbar.Brand href="/#">
          <img src={logo} width="40" height="auto" alt="Snackability" />
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">
            <FontAwesomeIcon icon={faHome} /> Home
          </Nav.Link>
          <Nav.Link href="/contactus">Contact Us</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href="/signin">
            <FontAwesomeIcon icon={faSignInAlt} /> Login
          </Nav.Link>
        </Nav>
      </Navbar>
    );
  }
};
