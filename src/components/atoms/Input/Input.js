import styled from "styled-components";

const Input = styled.input`
  width: 300px;
  height: 35px;
  border: none;
  border-radius: 5px;
  padding: 5px 13px;
  font-size: ${({ theme }) => theme.fontSize.s};
  margin-bottom: 20px;

  &:focus {
    outline: none;
  }
`;

export default Input;
