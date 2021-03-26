import React, { useState, useContext } from "react";
import styled, { css } from "styled-components";
import { BooksContext } from '../../../context';

import Button from '../../atoms/Button/Button';
import ButtonGroup from '../../molecules/ButtonGroup/ButtonGroup';
import Image from '../../atoms/Image/Image';
import StarRating from '../../molecules/StarRating/StarRating';

const StyledWrapper = styled.div`
  width: 90%;
  margin: 60px auto;
  border-radius: ${({ theme }) => theme.bigRounding};
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
`;

const StyledList = styled.ul`
  list-style: none;
  width: 100%;
  padding: 10px 0;
`;

const StyledListElement = styled.li`
  display: flex;
  position: relative;
  align-items: center;
  align-content: space-between;
  margin: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.yellow};

  &:last-of-type {
    border-bottom: none;
  }
`;

const StyledImage = styled(Image)`
  flex: 1;
  max-width: 35px;
  margin: 10px 20px;
`;

const StyledParagraph = styled.p`
  margin-right: 20px;

  ${({ title }) =>
    title &&
    css`
      font-weight: bold;
    `}

  ${({ author }) =>
    author &&
    css`
      font-size: ${({ theme }) => theme.fontSize.s};
    `}
`;

const StyledStarRating = styled(StarRating)`
  position: absolute;
  right: 150px;
`;

const StyledButtonGroup = styled(ButtonGroup)`
  position: absolute;
  right: 0;
`;

const DetailsWrapper = styled.div`
  margin: 20px 40px;
`;

const Book = (props) => {
  const [ showDetails, setShowDetails ] = useState(false);
  const [ rating, setRating ] = useState(props.rating);

  const handleClick = () => {
    toggleDetails();
  }

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  }

  const changeRating = (rate) => {
    setRating(rate);
  }

  const detailsButton =
    !showDetails ? 
      <Button onClick={handleClick}>Wiecej <i className="fas fa-chevron-down"></i></Button>
      :
      <Button onClick={handleClick}>Mniej <i className="fas fa-chevron-up"></i></Button>;

  return (
    <>
      <StyledListElement>
        <StyledImage src={props.src} alt="img"/>
        <StyledParagraph title="true">{props.title}</StyledParagraph>
        <StyledParagraph author="true">{props.author}</StyledParagraph>
        <StyledStarRating
          rating={rating}
          changeRating={changeRating}
        />
        <StyledButtonGroup>
          <Button edit>
            <i className="fas fa-edit"></i>
          </Button>
          <Button remove onClick={() => props.handleDelete(props.id)} >
            <i className="fas fa-trash-alt"></i>
          </Button>
        </StyledButtonGroup>
        {detailsButton}
      </StyledListElement>
      { showDetails &&
        <DetailsWrapper>
          <StyledParagraph><i className="fas fa-check"></i> {props.status}</StyledParagraph>
          <StyledParagraph>{props.year}</StyledParagraph>
          <StyledParagraph>{props.genre}</StyledParagraph>
          <StyledParagraph>{props.description}</StyledParagraph>
        </DetailsWrapper>
      }
    </>
  );
}

const BookTable = (props) => {
  const { books } = useContext(BooksContext);

  const getBooks = () => {
    return books.map(book => {
      const {
        id,
        image,
        title,
        author,
        rating,
        status = "przeczytana",
        year = 2000,
        genre,
        description
      } = book;
      return (
        <Book
          id={id}
          key={id}
          src={image}
          title={title}
          author={author}
          status={status}
          rating={rating}
          year={year}
          genre={genre}
          handleDelete={props.handleDelete}
          bookUrl={`/books/${id}`}
          description={description}
        />
      );
    });
  }

  const bookList = getBooks();
  return(
    <StyledWrapper>
      <StyledList>
        {bookList}
      </StyledList>
    </StyledWrapper>
  );

}

export default BookTable;