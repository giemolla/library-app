import React from "react";
import styled from "styled-components";

const StarIcon = styled.i`
  margin-left: 10px;
  cursor: pointer;
  color: #e7e7e7;

  &:first-of-type {
    margin-left: 0;
  }

  &.active {
    color: #ffcc00;
  }
`;

const Star = props => {
  const { id, className, handleRating } = props;
  return (
    <StarIcon
      id={id}
      className={className}
      onMouseOver={handleRating}
      onMouseLeave={handleRating}
      onClick={handleRating}
    ></StarIcon>
  );
};

export default Star;
