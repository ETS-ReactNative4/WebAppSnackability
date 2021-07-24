import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Switch } from 'react-router';

import { AuthProvider } from './utils/auth';
import { NavbarComponent } from './components/navbar.component';

import PublicRoute from './routes/public-routes.component';
import PrivateRoute from './routes/private-route.component';

import HomeComponent from './components/home.component';
import SnackGraph from './components/snack-graph.component';
import SnackUSDAListComponent from './components/snack-usda-list.component';
import SnackUSDADetailsComponent from './components/snack-usda-details.component';
import SettingsComponent from './components/settings.component';
import SignInComponent from './components/signin.component';

import AppStyles from './styles/app.module.css'

const App = () => {

    return (
        <AuthProvider>
            <BrowserRouter>
                <div className="App">
                    <NavbarComponent />
                    <main className={ AppStyles.main }>
                        <Switch>
                            <PublicRoute restricted={false} path="/" exact component={HomeComponent} />
                            <PrivateRoute path="/usda" exact component={SnackUSDAListComponent}/>
                            <PrivateRoute path="/usda/:snack_id" exact component={SnackUSDADetailsComponent}/>
                            <PrivateRoute path='/snacksgraph' exact component={SnackGraph} />
                            <PrivateRoute path="/settings" exact component={SettingsComponent}/>
                            <PublicRoute restricted={true} path="/signin" exact component={SignInComponent} />
                        </Switch>
                    </main>
                </div>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
