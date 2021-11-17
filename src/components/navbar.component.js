import React, { useContext, useState } from 'react';
import { app, AuthContext } from '../utils/auth';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAddressBook,
    faChartLine,
    faCog,
    faCookie,
    faHome,
    faPlus,
    faSignInAlt,
    faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';

import logo from '../images/logo.svg';

export const NavbarComponent = () => {

    const { currentUser } = useContext(AuthContext);
    const [isAdmin, setIsAdmin] = useState(false);

    if (!!currentUser) {
        app
            .auth()
            .currentUser.getIdTokenResult(true)
            .then((idTokenResult) => {
                if (idTokenResult.claims.role !== 'admin') {
                    setIsAdmin(false);
                } else {
                    setIsAdmin(true);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (

        <Navbar collapseOnSelect fixed="top" expand="sm" className="nav-bar">

            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>

            <Navbar.Brand href="/#">
                <img src={logo} width="40" height="auto" alt="Snackability"/>
            </Navbar.Brand>

            <Navbar.Collapse id="responsive-navbar-nav">

                <Nav className="mr-auto">
                    <Nav.Link href="/">
                        <FontAwesomeIcon icon={faHome}/> Home
                    </Nav.Link>
                    { currentUser &&
                    <>
                    <Nav.Link href="/usda">
                        <FontAwesomeIcon icon={faCookie}/> Snacks
                    </Nav.Link>
                    <Nav.Link href="/snacksgraph">
                        <FontAwesomeIcon icon={faChartLine}/> Snacks Graph
                    </Nav.Link>
                    </>
                    }
                    <Nav.Link href="/contactus">
                        <FontAwesomeIcon icon={faAddressBook}/> Contact Us
                    </Nav.Link>
                </Nav>
                
                { isAdmin &&
                
                <Nav>
                    <NavDropdown id="nav-bar-dropdown" title="Admin">
                        <NavDropdown.Item href={'/createaccount'}>
                            <span>
                                <FontAwesomeIcon icon={faPlus}/> Create New Account
                            </span>
                        </NavDropdown.Item>
                        <NavDropdown.Item href={'/manageUsers'}>
                            <span>
                                <FontAwesomeIcon icon={faCog}/> Manage Users
                            </span>
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                }
                { !currentUser &&
                <Nav>
                    <Nav.Link href="/signin">
                        <FontAwesomeIcon icon={faSignInAlt}/> Login
                    </Nav.Link>
                </Nav>
                }
                { currentUser &&
                <Nav>
                    <NavDropdown id="nav-bar-dropdown" title={currentUser.email}>
                        <NavDropdown.Item href={'/settings'}>
                            <span>
                            <FontAwesomeIcon icon={faCog}/> Settings
                            </span>
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={() => app.auth().signOut()}>
                            <span>
                            <FontAwesomeIcon icon={faSignOutAlt}/> Logout
                            </span>
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                }
            </Navbar.Collapse>
        </Navbar>
    );
};
