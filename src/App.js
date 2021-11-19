import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Switch } from "react-router";

import { AuthProvider } from "./utils/auth";
import { NavbarComponent } from "./components/navbar.component";

import PublicRoute from "./routes/public-routes.component";
import PrivateRoute from "./routes/private-route.component";
import { HomeComponent } from "./components/home.component";
import { SnackListComponent } from "./components/snack-list.component";
import { SnackDetailsComponent } from "./components/snack-details.component";
import { UsersListComponent } from "./components/users-list.component";
import { SettingsComponent } from "./components/settings.component";
import { ForgotPasswordComponent } from "./components/forgot-password.component";
import { CreateAccountComponent } from "./components/create-account.component";
import { ContactUsComponent } from "./components/contact-us.component";
import LoginComponent from "./components/login.component";
import SnackGraph from "./components/snack-graph.component";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          <NavbarComponent/>
          <main className=".main">
            <Switch>
              <PublicRoute
                restricted={false}
                path="/"
                exact
                component={HomeComponent}
              />
              <PrivateRoute
                path="/snacks"
                exact
                component={SnackListComponent}
              />
              <PrivateRoute
                path="/snacks/:snack_id"
                exact
                component={SnackDetailsComponent}
              />
              <PrivateRoute path="/snacks-graph" exact component={SnackGraph} />
              <PrivateRoute
                path="/settings"
                exact
                component={SettingsComponent}
              />
              <PublicRoute
                restricted={true}
                path="/login"
                exact
                component={LoginComponent}
              />
              <PublicRoute
                restricted={false}
                path="/contact"
                exact
                component={ContactUsComponent}
              />
              <PrivateRoute
                path="/create-account"
                exact
                component={CreateAccountComponent}
              />
              <PublicRoute
                restricted={false}
                path="/forgotpassword"
                exact
                component={ForgotPasswordComponent}
              />
              <PrivateRoute
                  path="/users"
                  exact
                  component={UsersListComponent}
              />
            </Switch>
          </main>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
