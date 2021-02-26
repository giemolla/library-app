import React from "react";
import Button from "../../atoms/Button/Button";
import styled, { css } from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  position: absolute;
  bottom: 20px;
  left: 0;
  top: 66px;
  z-index: 999;
  margin: 0;
`;

const StyledButton = styled(Button)`
  margin: 0;
  margin-top: -10px;
  padding: 0;
  position: relative;
  font-size: ${({ theme }) => theme.fontSize.xxl};
  color: black;
  background-color: transparent;
  box-shadow: none;
  color: white;

  &.active {
    color: black;
    margin-top: 0;
  }
`;

const StyledIcon = styled.i`
  margin: 0 10px;
`;

const BookMarksButtons = ({ active, onMarkClick }) => {
  const buttons = [];
  for (let i = 1; i < 4; i++) {
    const btn =
      active && active === i ? (
        <StyledButton
          key={i}
          id={`bookmark-btn-${i}`}
          className="active"
          onClick={onMarkClick}
        >
          <StyledIcon className="fas fa-bookmark"></StyledIcon>
        </StyledButton>
      ) : (
        <StyledButton key={i} id={`bookmark-btn-${i}`} onClick={onMarkClick}>
          <StyledIcon className="fas fa-bookmark"></StyledIcon>
        </StyledButton>
      );

    buttons.push(btn);
  }

  return <StyledContainer>{buttons}</StyledContainer>;
};

export default BookMarksButtons;
