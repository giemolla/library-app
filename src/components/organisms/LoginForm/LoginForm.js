import React, { Component } from "react";
import styled from "styled-components";
import Input from "../../atoms/Input/Input";
import Button from "../../atoms/Button/Button";
import Heading from "../../atoms/Heading/Heading";
import Paragraph from "../../atoms/Paragraph/Paragraph";

const StyledForm = styled.form`
  width: 40%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 30px;
  background-color: ${({ theme }) => theme.yellow};
  box-shadow: 0 10px 20px -10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledHeading = styled(Heading)`
  margin: 20px auto;
  text-align: center;
  color: ${({ theme }) => theme.navyblue};
`;

const StyledButton = styled(Button)`
  background-color: ${({ theme }) => theme.navyblue};
  color: #fff;

  &:hover {
    background-color: ${({ theme }) => theme.orange};
  }
`;

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      password: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.handleLogin(this.state.login, this.state.password);
  }

  render() {
    return (
      <StyledForm onSubmit={this.handleSubmit}>
        <StyledHeading>
          Welcome,<br></br>Almighty Admin!
          <Paragraph>Please, confirm your secret identity...</Paragraph>
        </StyledHeading>
        <Input
          type="text"
          name="login"
          placeholder="login"
          value={this.state.login}
          onChange={this.handleInputChange}
        />
        <Input
          type="password"
          name="password"
          placeholder="password"
          value={this.state.password}
          onChange={this.handleInputChange}
        />
        <StyledButton>Log in</StyledButton>
      </StyledForm>
    );
  }
}

export default LoginForm;
