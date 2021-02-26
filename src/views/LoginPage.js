import React from "react";
import LoginForm from "../components/organisms/LoginForm/LoginForm";

const LoginPage = props => <LoginForm handleLogin={props.handleLogin} />;

export default LoginPage;
