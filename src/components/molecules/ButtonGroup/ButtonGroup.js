import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ButtonGroup = ({ children, className }) => (
  <StyledContainer className={className}>{children}</StyledContainer>
);

export default ButtonGroup;
