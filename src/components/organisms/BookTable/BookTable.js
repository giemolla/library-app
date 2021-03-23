import React, { Component } from "react";
import styled, { css } from "styled-components";

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

class Book extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDetails: false,
      rating: this.props.rating
    }

    this.handleClick = this.handleClick.bind(this);
    this.changeRating = this.changeRating.bind(this);
  }

  handleClick() {
    this.toggleDetails();
  }

  toggleDetails() {
    this.setState({ showDetails: !this.state.showDetails});
  }

  changeRating(rate) {
    this.setState({ rating: rate });
  }

  render() {
    const detailsButton =
      !this.state.showDetails ? 
        <Button onClick={this.handleClick}>Wiecej <i className="fas fa-chevron-down"></i></Button>
        :
        <Button onClick={this.handleClick}>Mniej <i className="fas fa-chevron-up"></i></Button>;

    return (
      <>
        <StyledListElement>
          <StyledImage src={this.props.src} alt="img"/>
          <StyledParagraph title="true">{this.props.title}</StyledParagraph>
          <StyledParagraph author="true">{this.props.author}</StyledParagraph>
          <StyledStarRating
            rating={this.state.rating}
            changeRating={this.changeRating}
          />
          <StyledButtonGroup>
            <Button edit>
              <i className="fas fa-edit"></i>
            </Button>
            <Button remove onClick={() => this.props.handleDelete(this.props.id)} >
              <i className="fas fa-trash-alt"></i>
            </Button>
          </StyledButtonGroup>
          {detailsButton}
        </StyledListElement>
        { this.state.showDetails &&
          <DetailsWrapper>
            <StyledParagraph><i className="fas fa-check"></i> {this.props.status}</StyledParagraph>
            <StyledParagraph>{this.props.year}</StyledParagraph>
            <StyledParagraph>{this.props.genre}</StyledParagraph>
            <StyledParagraph>{this.props.description}</StyledParagraph>
          </DetailsWrapper>
        }
      </>
    );
  }
}

class BookTable extends Component {
  getBooks() {
    return this.props.books.map(book => {
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
          handleDelete={this.props.handleDelete}
          bookUrl={`/books/${id}`}
          description={description}
        />
      );
    });
  }

  render() {
    const bookList = this.getBooks();
    return(
      <StyledWrapper>
        <StyledList>
          {bookList}
        </StyledList>
      </StyledWrapper>
    );
  }
}

export default BookTable;