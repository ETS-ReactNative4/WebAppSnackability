import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Switch } from 'react-router';
import { Nav, Navbar } from 'react-bootstrap';

import HomeComponent from './components/home.component';
import SnackList from './components/snack-list.component';
import SnackDetailsComponent from './components/snack-details.component';
import SnackGraph from './components/snack-graph.component';
import SnackUSDAListComponent from './components/snack-usda-list.component'; 
import SnackUSDADetailsComponent from './components/snack-usda-details.component'; 
import SettingsComponent from './components/settings.component';
import SignInComponent from './components/signin.component';

import logo from './images/logo.svg';
import AppStyles from './styles/app.module.css'

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Navbar variant="dark" className={AppStyles.NavBarStyle}>
                        <Navbar.Brand href="/#">
                            <img src={logo} width="40" height="auto" alt="Snackability"/>
                        </Navbar.Brand>
                        <Nav className="mr-auto">
                            <Nav.Link href="/">🏠 Home</Nav.Link>
                            {/*<Nav.Link href="/snacks">🍊 Snacks</Nav.Link>*/} 
                            <Nav.Link href="/usda">🍒 Snacks USDA</Nav.Link>
                            <Nav.Link href='/snacksgraph'>📊 Snacks Graph</Nav.Link>
                            <Nav.Link href='/settings'>🔧 Settings</Nav.Link>
                        </Nav>
                    </Navbar>
                    <main className={ AppStyles.main }>
                        <Switch>
                            <Route path="/" exact component={HomeComponent}/>
                            <Route path="/snacks" exact component={SnackList}/>                            
                            <Route path="/snacks/:snack_id" exact component={SnackDetailsComponent}/>                            
                            <Route path="/usda" exact component={SnackUSDAListComponent}/> 
                            <Route path="/usda/:snack_id" exact component={SnackUSDADetailsComponent}/>
                            <Route path='/snacksgraph' exact component={SnackGraph} />
                            <Route path="/settings" exact component={SettingsComponent}/>
                            <Route path="/signin" exact component={SignInComponent}/>
                        </Switch>
                    </main>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
