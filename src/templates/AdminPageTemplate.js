import React, { Component } from 'react';
import styled from "styled-components";
import BookTable from '../components/organisms/BookTable/BookTable';
import BookForm from '../components/organisms/BookForm/BookForm';

import * as bookService from '../services/bookService';

const StyledWrapper = styled.div`
  width: 100%;
`;

const StyledHeader = styled.h1`
  margin: 0;
  width: 100%;
  height: 60px;
  line-height: 60px;
  text-align: center;
`;

const AddButton = styled.button`
  display: block;
  width: 400px;
  margin: 60px auto;
  padding: 10px;
  font-size: ${({ theme }) => theme.fontSize.m};
  background-color: #5cb85c;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.yellow};
  }
`;

const FlexWrapper = styled.div`
  height: 100%;
  display: flex;
`;

const NavList = styled.div`
    & > ul {
    width: 250px;
    height: 100%;
    list-style: none;
    padding: 0;
    margin-top:0;
    font-size: ${({ theme }) => theme.fontSize.s};
    background-color: ${({ theme }) => theme.navyblue};
  }

  & li {
    padding: 20px 10px;
    font-weight: bold;
    cursor: pointer;
    color: white;

    &.active-link, &:hover {
      text-decoration: underline;
    }
  }
`;

const StyledDiv = styled.div`
  width: 100%;
`;

class AdminPageTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };

    this.handleAdd = this.handleAdd.bind(this);
    this.addBook = this.addBook.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.deleteBook = this.deleteBook.bind(this);
  }

  componentDidMount() {
    bookService.getAllBooks(this);
  }

  handleAdd(data) {
    const {
      title,
      author,
      genre,
      year,
      status,
      description,
      link,
      rating
    } = data;
    const newBook = {
      title: title || "",
      author: author || "",
      genre: genre || "",
      year: year || "",
      status: status || "",
      description: description || "",
      image: link || "",
      rating: rating || null,
      thumbnail: "",
      quotations: [],
      quotationImages: [],
      comments: "",
      links: []
    };

    bookService.add(newBook, this.addBook);
  }

  addBook(data) {
    this.setState({
      books: this.state.books.concat(data)
    });
    console.log(this.state.books)
  }

  handleDelete(id) {
    bookService.remove(id, this.deleteBook);
  }

  deleteBook(id) {
    let refreshedBooks = this.state.books.filter(book => book.id !== id);
    this.setState({
      books: refreshedBooks
    });
  }
   
  render() {
    return (
      <StyledWrapper>
        <StyledHeader>Witaj Karolina!</StyledHeader>

        <FlexWrapper>
          
          <NavList>
            <ul>
              <li className="active-link">Edycja ksiązek</li>
              <li>Edycja "O mnie"</li>
              <li>Edycja danych kontaktowych</li>
            </ul>
          </NavList>
          
          <StyledDiv>
            <AddButton>Dodaj ksiązkę</AddButton>
            <BookForm handleSubmit={this.handleAdd}/>
            <BookTable books={this.state.books} handleDelete={this.handleDelete}/>
          </StyledDiv>
        </FlexWrapper>
      </StyledWrapper>
    );
  }
}

export default AdminPageTemplate;