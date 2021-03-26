import React, { useState, useContext } from "react";
import styled from 'styled-components';

import Rating from "../../molecules/StarRating/StarRating";
import Button from '../../atoms/Button/Button';
import Input from '../../atoms/Input/Input';
import Label from '../../atoms/Label/Label';
import Image from '../../atoms/Image/Image';
import { BooksContext } from "../../../context";

const StyledForm = styled.form`
  width: 80%;
  max-width: 1000px;
  margin: 5rem auto;
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.shadow};
  position: relative;
`;

const StyledInfoWrapper = styled.div`
  display: flex;
`;

const StyledImageWrapper = styled.div`
  width: 200px;
  min-width: 200px;
  height: 300px;
  background-color: yellow;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px;
  position: relative;
`;

const StyledImage = styled(Image)`
  box-shadow: none;
  height: 100%;
  object-fit: cover;
`;

const StyledAddImgButton = styled(Button)`
  position: absolute;
  top: 70%;
  background-color: ${({ theme }) => theme.azure};
`;

const StyledFormElemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 30px;
  width: 80%;
`;

const StyledInput = styled(Input)`
  border: 1px solid ${({ theme }) => theme.yellow};
  width: 100%;
`;

const StyledStatusWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const StyledBookStatus = styled.div`
  display: flex;
  margin: 10px 20px 10px 0;
`;

const StyledRatingWrapper = styled.div`
  display: flex;
  width: 80%;
`;

const StyledRating = styled(Rating)`
  margin: 0;
  margin-left: 10px;
`;

const StyledBox = styled.div`
  width: 20px;
  height: 20px;
  border: 1px solid ${({ theme }) => theme.yellow};
  border-radius: ${({ theme }) => theme.smallRounding};
  margin-right: 10px;
`;

const StyledTextareaWrapper = styled.div`
  display: flex;
`;

const StyledTextarea = styled.textarea`
  display: block;
  width: 100%;
  margin: 10px 20px 30px;
  border: 1px solid ${({ theme }) => theme.yellow};
  height: 30px;
  padding: 0.7rem;
  border-radius: ${({ theme }) => theme.bigRounding};
  height: 150px;

  &:focus {
    outline: none;
  }
`;

const StyledButton = styled(Button)`
  width: 100%;
  padding: 20px 0;
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize.m};
  background-color: ${({ theme }) => theme.azure};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;

  &:hover {
    background-color: ${({ theme }) => theme.yellow};
  }
`;

const StyledLinkForm = styled.div`
  position: absolute;
  display: none;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
  height: 100px;
  background-color: blue;
  z-index: 2;
`;

const ImageLinkForm = () => {
  return (
    <StyledLinkForm>This is image link form</StyledLinkForm>
  );
};

const BookForm = (props) => {
  const [ newBook, setNewBook ] = useState({ rating: 0, status: '' });
  const { handleAdd } = useContext(BooksContext);

  const addImgLink = (e) => {
    e.preventDefault();
    console.log('add image')
  };

  const handleInputChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setNewBook({ ...newBook, [name]: value });
    console.log(newBook)
  };
 
  const changeRating = (rate) => {
    setNewBook({...newBook, rating: rate});
    console.log(newBook.rating)
  };

  const handleClick = (e) => {
    e.preventDefault();
    const allBoxes = document.querySelectorAll(".box");
    for (const box of allBoxes) {
      box.style.backgroundColor = "white";
    }
    const box = e.target;
    const status = box.dataset.status;

    setNewBook({...newBook, status});
    box.style.backgroundColor = "#303c6c";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAdd(newBook);
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <ImageLinkForm />
      <StyledInfoWrapper>

        <StyledImageWrapper>
          <StyledImage src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwolper.com.au%2Fwp-content%2Fuploads%2F2017%2F10%2Fimage-placeholder.jpg&f=1&nofb=1" alt="this is book cover"/>
          <StyledAddImgButton onClick={addImgLink}>Dodaj okładkę</StyledAddImgButton>
        </StyledImageWrapper>

        <StyledFormElemsWrapper>
          <label htmlFor="title"></label>
          <StyledInput onChange={handleInputChange} type="text" name="title" placeholder="Tytuł"/>
          <label htmlFor="author"></label>
          <StyledInput onChange={handleInputChange} type="text" name="author" placeholder="Autor"/>
          <label htmlFor="genre"></label>
          <StyledInput onChange={handleInputChange} type="text" name="genre" placeholder="Gatunek"/>
          <label htmlFor="year"></label>
          <StyledInput onChange={handleInputChange} type="text" name="year" placeholder="Year"/>

          <StyledStatusWrapper>
            <StyledBookStatus className="book-status">
              <StyledBox
                className="box" data-status="read"
                onClick={handleClick}
              ></StyledBox>
              <Label className="text" id="read">
                Przeczytana
              </Label>
            </StyledBookStatus>
            <StyledBookStatus className="book-status">
              <StyledBox
                className="box" data-status="unread"
                onClick={handleClick}
              ></StyledBox>
              <Label className="text" id="unread">
                Nieprzeczytana
              </Label>
            </StyledBookStatus>
            <StyledBookStatus className="book-status">
              <StyledBox
                className="box" data-status="in-progress"
                onClick={handleClick}
              ></StyledBox>
              <Label className="text" id="in-progress">
                W trakcie czytania
              </Label>
            </StyledBookStatus>
          </StyledStatusWrapper>
          
          {newBook.status === "read" &&
          <StyledRatingWrapper>
            <Label>Ocena:</Label>
            <StyledRating rating={newBook.rating} changeRating={changeRating} /> 
          </StyledRatingWrapper>
        }
        </StyledFormElemsWrapper>

      </StyledInfoWrapper>

      <StyledTextareaWrapper>
        <label htmlFor="description"></label>
        <StyledTextarea onChange={handleInputChange} name="description" placeholder="Opis"></StyledTextarea>
      </StyledTextareaWrapper>

      <StyledButton type="submit">
        DODAJ KSIAŻKĘ
      </StyledButton>

    </StyledForm>
  );
};

export default BookForm;
