import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Switch } from "react-router";

import { AuthProvider } from "./utils/auth";
import { NavbarComponent } from "./components/navbar.component";

import PublicRoute from "./routes/public-routes.component";
import PrivateRoute from "./routes/private-route.component";
import HomeComponent from "./components/home.component";
import SnackGraph from "./components/snack-graph.component";
import SnackUSDAListComponent from "./components/snack-usda-list.component";
import SnackUSDADetailsComponent from "./components/snack-usda-details.component";
import SettingsComponent from "./components/settings.component";
import SignInComponent from "./components/signin.component";
import ContactUs from "./components/contactus.component";
import CreateAccountComponent from "./components/createaccount.component";
import ForgotPassword from "./components/forgotpassword.component";
import manageUsers from "./components/manageUsers";

import AppStyles from "./styles/app.module.css";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          <NavbarComponent />
          <main className={AppStyles.main}>
            <Switch>
              <PublicRoute
                restricted={false}
                path="/"
                exact
                component={HomeComponent}
              />
              <PrivateRoute
                path="/usda"
                exact
                component={SnackUSDAListComponent}
              />
              <PrivateRoute
                path="/usda/:snack_id"
                exact
                component={SnackUSDADetailsComponent}
              />
              <PrivateRoute path="/snacksgraph" exact component={SnackGraph} />
              <PrivateRoute
                path="/settings"
                exact
                component={SettingsComponent}
              />
              <PublicRoute
                restricted={true}
                path="/signin"
                exact
                component={SignInComponent}
              />
              <PublicRoute
                restricted={false}
                path="/contactus"
                exact
                component={ContactUs}
              />
              <PrivateRoute
                path="/createaccount"
                exact
                component={CreateAccountComponent}
              />
              <PublicRoute
                restricted={false}
                path="/forgotpassword"
                exact
                component={ForgotPassword}
              />
              <PrivateRoute path="/manageUsers" exact component={manageUsers} />
            </Switch>
          </main>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
