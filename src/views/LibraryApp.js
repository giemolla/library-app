import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { routes } from "../routes";
import GlobalStyle from "../themes/GlobalStyle";
import { ThemeProvider } from "styled-components";
import { theme } from "../themes/mainTheme";
import LoginPage from "./admin/LoginPage";
import { PageContext } from "../context";
import MainTemplate from "../templates/user/MainTemplate";
import AdminPage from './admin/AdminPage';

const admin = {
  login: "admin",
  password: "admin123"
};

class LibraryApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      admin: true
    };

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(login, password) {
    if (login === admin.login && password === admin.password) {
      this.setState({ admin: true });
    }
  }

  render() {
    const { admin } = this.state;

    return (
      <BrowserRouter>
        <PageContext.Provider value={admin}>
          <GlobalStyle />
          <ThemeProvider theme={theme}>
            <Switch>
              <Route exact path={routes.home} component={MainTemplate} />
              <Route
                path={routes.adminLogin}
                render={props =>
                  !this.state.admin ? (
                    <LoginPage {...props} handleLogin={this.handleLogin} />
                  ) : (
                    <Redirect to={routes.adminBooks} />
                  )
                }
              />
              <Route
                exact
                path={routes.admin}
                component={() =>
                  !this.state.admin ? (
                    <Redirect to={routes.adminLogin} />
                  ) : (
                    <Redirect to={routes.adminBooks} />
                  )
                }
              />
              <Route
                path={routes.adminBooks}
                component={() =>
                  !this.state.admin ? (
                    <Redirect to={routes.adminLogin} />
                  ) : (
                    <AdminPage />
                  )
                }
              />
            </Switch>
          </ThemeProvider>
        </PageContext.Provider>
      </BrowserRouter>
    );
  }
}

export default LibraryApp;
