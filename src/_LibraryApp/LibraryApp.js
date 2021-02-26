// api Pucka
// https://books-api-react-fun.herokuapp.com/api/v1/books
import React, { Component } from "./node_modules/react";
import { Route } from "./node_modules/react-router-dom";

import Nav from "../Nav/Nav";
import Home from "../Home/Home";
import Login from "../Login/Login";
import About from "../About/About";
import Contact from "../Contact/Contact";
import BookListLogged from "../BookListLogged/BookListLogged";
import BookList from "../BookList/BookList";
import BookDetails from "../BookDetails/BookDetails";

import "./LibraryApp.css";

const admin = {
  login: "giemolla@gmail.com",
  password: "password"
};

class LibraryApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      admin: false,
      wrongLoginOrPassword: false,
      logout: false
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogin(email, pass) {
    const { login, password } = admin;
    if (email === login && pass === password) {
      this.setState({ admin: true });
      this.setState({ wrongLoginOrPassword: false });
    } else {
      this.setState({ wrongLoginOrPassword: true });
    }
  }

  handleLogout() {
    this.setState({ admin: false, logout: true });
  }

  render() {
    return (
      <div className="main-wrapper">
        <Nav
          adminLoggedIn={this.state.admin}
          handleLogoutClick={this.handleLogout}
        />

        <Route exact path="/" component={Home} />
        <Route
          path="/admin/login"
          render={props => (
            <Login
              {...props}
              handleLogin={this.handleLogin}
              logout={this.state.logout}
              admin={this.state.admin}
              wrongLoginOrPassword={this.state.wrongLoginOrPassword}
            />
          )}
        />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route exact path="/books" component={BookList} />
        <Route exact path="/admin/books" component={BookListLogged} />
        <Route path="/books/:id" component={BookDetails} />
      </div>
    );
  }
}

export default LibraryApp;
