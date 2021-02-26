import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Login.css";

const Success = props => {
  return (
    <div className="success-wrapper">
      <h2 className="success-header">Zalogowano poprawnie!</h2>
      <button className="admin-panel-btn">
        <Link to="/admin/books">Edytuj ksiązki</Link>
      </button>
      <button className="admin-panel-btn">
        <Link to="/admin/about">Edytuj sekcję "O mnie"</Link>
      </button>
      <button className="admin-panel-btn">
        <Link to="/admin/contact">Edytuj dane kontaktowe</Link>
      </button>
    </div>
  );
};

const Form = props => {
  let mailAlert;
  let passAlert;
  let nonClickable = props.empty || (props.passAlert || props.passAlert);
  if (props.mailAlert === true) {
    mailAlert = (
      <div className="wrong-email-format">
        Sprawdź poprawność adresu e-mail!
      </div>
    );
  }
  if (props.passAlert === true) {
    passAlert = (
      <div className="wrong-email-format">Twoje hasło jest za krótkie!</div>
    );
  }
  const alertHeader = props.wrong ? (
    <h2 className="alert-header">Niepoprawne dane logowania!</h2>
  ) : null;
  const logoutHeader = props.logout ? (
    <h2 className="logout-header">Wylogowano!</h2>
  ) : null;
  return (
    <form className="login-form" onSubmit={props.handleSubmit}>
      {alertHeader}
      {logoutHeader}
      <h2 className="login-form-header">Logowanie</h2>

      <label className="login-form-label" htmlFor="email">
        E-mail:
      </label>
      <input
        className="login-form-input"
        type="email"
        name="email"
        onChange={props.handleInputChange}
      />
      {mailAlert}

      <label className="login-form-label" htmlFor="password">
        Hasło:
      </label>
      <input
        className="login-form-input"
        type="password"
        name="password"
        onChange={props.handleInputChange}
      />
      {passAlert}

      <button className="login-form-btn" type="submit" disabled={nonClickable}>
        Zaloguj
      </button>
    </form>
  );
};

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      passAlert: false,
      mailAlert: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
    this.validateInput(e);
  }

  validateInput(e) {
    e.preventDefault();
    const mailReg = /^[0-9a-zA-Z_.-]+@[0-9a-zA-Z.-]+\.[a-zA-Z]{2,3}$/;
    if (e.target.name === "email") {
      if (!mailReg.test(e.target.value)) {
        this.setState({ mailAlert: true });
      } else {
        this.setState({ mailAlert: false });
      }
    }
    if (e.target.name === "password") {
      const passLength = e.target.value.length;
      if (passLength < 3) {
        this.setState({ passAlert: true });
      } else {
        this.setState({ passAlert: false });
      }
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.handleLogin(this.state.email, this.state.password);
  }

  render() {
    let component = !this.props.admin ? (
      <Form
        empty={this.state.password === "" || this.state.email === ""}
        wrong={this.props.wrongLoginOrPassword}
        mailAlert={this.state.mailAlert}
        passAlert={this.state.passAlert}
        handleInputChange={this.handleInputChange}
        handleSubmit={this.handleSubmit}
        logout={this.props.logout}
      />
    ) : (
      <Success />
    );
    return <div>{component}</div>;
  }
}

export default Login;
