import React from "react";
import styled, { css } from "styled-components";
import HorizontalList from "../../molecules/HorizontalList/HorizontalList";
import ListElement from "../../atoms/ListElement/ListElement";
import Image from "../../atoms/Image/Image";
import SearchForm from "../../molecules/SearchForm/SearchForm";
import bookImage from "../../../assets/book.png";

const StyledContainer = styled.nav`
  height: 74px;
  position: fixed;
  top: 0;
  display: flex;
  width: 100%;
  /* background-color: ${({ theme }) => theme.navyblue}; */
  background-color: black;
  justify-content: center;
  align-items: center;
  -webkit-box-shadow: 0px 0px 36px -1px rgba(0, 0, 0, 1);
  -moz-box-shadow: 0px 0px 36px -1px rgba(0, 0, 0, 1);
  box-shadow: 0px 0px 36px -1px rgba(0, 0, 0, 1);
  z-index: 9999;
`;

const StyledHorizontalList = styled(HorizontalList)`
  width: 40%;
  display: flex;
  align-items: center;
  position: relative;

  ${({ right }) =>
    right &&
    css`
      justify-content: flex-end;
    `}

  & > li {
    cursor: pointer;
  }
`;

const StyledImage = styled(Image)`
  box-shadow: none;
  width: 50px;
`;

const StyledListElement = styled(ListElement)`
  font-family: ${({ theme }) => theme.fancyFont};
  font-size: ${({ theme }) => theme.fontSize.l};
  margin-left: 30px;
`;

const Nav = () => (
  <StyledContainer>
    <StyledHorizontalList>
      <ListElement>
        <StyledImage src={bookImage} />
      </ListElement>
      <StyledListElement>książki</StyledListElement>
      <StyledListElement>o mnie</StyledListElement>
    </StyledHorizontalList>
    <StyledHorizontalList right>
      <ListElement>
        <SearchForm />
      </ListElement>
      <ListElement>
        <i className="fab fa-twitter"></i>
      </ListElement>
      <ListElement>
        <i className="fab fa-instagram"></i>
      </ListElement>
      <ListElement>
        <i className="fab fa-facebook-f"></i>
      </ListElement>
      <ListElement>
        <i className="fab fa-pinterest-p"></i>
      </ListElement>
    </StyledHorizontalList>
  </StyledContainer>
);

export default Nav;
