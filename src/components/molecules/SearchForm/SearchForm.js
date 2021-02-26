import React from "react";
import styled from "styled-components";
import Input from "../../atoms/Input/Input";
import Button from "../../atoms/Button/Button";

const StyledWrapper = styled.div`
  display: flex;
  &:hover {
    cursor: pointer;
  }
`;

const StyledInput = styled(Input)`
  width: 110px;
  height: 35px;
  border-radius: 50px;
  margin-bottom: 0;
  position: relative;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  font-size: ${({ theme }) => theme.fontSize.xs};
`;

const StyledButton = styled(Button)`
  height: 35px;
  width: 50px;
  color: black;
  margin: 0;
  border-radius: 50px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  position: relative;
  box-shadow: none;
  color: #aaa;
  &:hover {
    transition: none;
  }
`;

const StyledIcon = styled.i`
  position: absolute;
  transform: translate(-50%, -50%);
`;

const SearchForm = () => (
  <StyledWrapper>
    <StyledInput />
    <StyledButton>
      <StyledIcon className="fas fa-search"></StyledIcon>
    </StyledButton>
  </StyledWrapper>
);

export default SearchForm;
