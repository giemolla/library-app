import styled, { css } from "styled-components";

const Button = styled.button`
  font-size: 1.3rem;
  padding: 10px;
  cursor: pointer;
  margin: 5px;
  background-color: "#fff";
  border: none;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  outline: none;

  ${({ icon }) =>
    icon &&
    css`
      width: 40px;
      height: 40px;
    `}

  ${({ edit }) =>
    edit &&
    css`
      background-color: #5cb85c;
    `}

  ${({ remove }) =>
    remove &&
    css`
      background-color: #d9534f;
    `}
`;

export default Button;
