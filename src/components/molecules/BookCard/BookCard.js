import React, { useState } from "react";
import styled from "styled-components";
import Heading from "../../atoms/Heading/Heading";
import ButtonGroup from "../../molecules/ButtonGroup/ButtonGroup";
import Button from "../../atoms/Button/Button";
import Image from "../../atoms/Image/Image";
import StarRating from "../../molecules/StarRating/StarRating";

const StyledWrapper = styled.div`
  min-height: 300px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  padding: 20px;

  &:hover {
    cursor: pointer;
    transform: scale(1.03);
    transition: transform 0.15s ease-in-out;
  }
`;

const StyledHeading = styled(Heading)`
  margin: 5px auto;
`;

const StyledImageWrapper = styled.div`
  width: 100px;
  padding: 5px;
`;

const BookCard = (props) => {
  const [ rating, setRating ] = useState(props.rating)

  const changeRating = (rate) => {
    setRating(rate);
  }
  const { title, author, src } = props;

  return (
    <StyledWrapper>
      <StyledImageWrapper>
        <Image src={src} />
      </StyledImageWrapper>
      <StyledHeading secondary>{title}</StyledHeading>
      <StyledHeading tertiary>{author}</StyledHeading>
      <StarRating
        rating={rating}
        changeRating={changeRating}
      />
      <ButtonGroup>
        <Button icon edit>
          <i className="fas fa-edit"></i>
        </Button>
        <Button icon remove>
          <i className="fas fa-trash-alt"></i>
        </Button>
      </ButtonGroup>
    </StyledWrapper>
  );
}

export default BookCard;
