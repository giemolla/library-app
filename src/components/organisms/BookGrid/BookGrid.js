import React, { Component } from "react";
import styled from "styled-components";
import BookCard from "../../molecules/BookCard/BookCard";
import { getAllBooks } from '../../../services/bookService';

const StyledGridWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 35px;
`;

class GridTemplate extends Component {
  constructor(props) {
    super(props);

    this.state = { books: [] };
  }

  componentDidMount() {
    getAllBooks(this);
  }

  getBooks() {
    return this.state.books.map(book => {
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
        <BookCard
          id={id}
          key={id}
          src={image}
          title={title}
          author={author}
          status={status}
          rating={rating}
          year={year}
          genre={genre}
          handleDelete={this.handleDelete}
          bookUrl={`/books/${id}`}
          description={description}
        />
      );
    });
  }

  render() {
    const bookNodes = this.getBooks();
    return <StyledGridWrapper>{bookNodes}</StyledGridWrapper>;
  }
}

export default GridTemplate;
