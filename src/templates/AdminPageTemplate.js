import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { routes } from '../routes';
import styled from "styled-components";
import BookTable from '../components/organisms/BookTable/BookTable';
import BookForm from '../components/organisms/BookForm/BookForm';
import About from '../templates/About';
import Contact from '../templates/Contact';

import * as bookService from '../services/bookService';

const StyledWrapper = styled.div`
  width: 100%;
`;

const StyledHeader = styled.h2`
  margin: 0;
  width: 100%;
  height: 60px;
  line-height: 60px;
  text-align: center;
  position: relative;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
  background-color: ${({ theme }) => theme.azure};
`;

const StyledSpan = styled.span`
  position: absolute;
  right: 40px;
  font-size: 25px;
  cursor: pointer;

  &:before {
    content: 'Wyloguj';
    font-size: 15px;
    position: absolute;
    left: -60px;
    display: none;
  }
  
  &:hover:before {
    display: block;
  }
`;

const FlexWrapper = styled.div`
  height: 100%;
  display: flex;
`;

const NavListWrapper = styled.div`
  position: fixed;
  height: 100%;
  min-height: 100vh;
  width: 250px;

    & > ul {
    width: 100%;
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
    color: ${({ theme }) => theme.azure};

    &.active-link, &:hover {
      color: ${({ theme }) => theme.yellow};
    }

    & > * {
      color: inherit;
      text-decoration: none;
    }
  }
`;

const StyledDiv = styled.div`
  width: calc(100% - 250px);
  margin-left: 250px;
`;

const NavList = (props) => {
  const { routes } = props;
  const links = routes.map(route => (
    <li key={route}>
      <Link to={route}>{route}</Link>
    </li>
  ));
  return (
    <ul>
      {links}
    </ul>
  );
};

class AdminPageTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };

    this.handleAdd = this.handleAdd.bind(this);
    this.addBook = this.addBook.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.deleteBook = this.deleteBook.bind(this);
    this.showForm = this.showForm.bind(this);
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

  showForm() {
    this.setState({ showForm: true });
  }
   
  render() {
    return (
      <StyledWrapper>
        <FlexWrapper>

          <NavListWrapper>
            <NavList routes={['Edycja ksiązek', 'Dodaj ksiązkę', 'Edycja o mnie', 'Edycja kontakt']}/>
          </NavListWrapper>
          
          <StyledDiv>
            <StyledHeader>Witaj Karolina!
              <StyledSpan><i className="fas fa-power-off"></i></StyledSpan>
            </StyledHeader>
              <Route
                exact
                path={routes.adminBooks}
                render={props => <BookTable {...props} books={this.state.books} handleDelete={this.handleDelete}/>}
              />
              <Route
                path={routes.adminAddBook}
                render={props => <BookForm {...props} handleSubmit={this.handleAdd}/>}
              />
            <Route path={routes.adminAbout} component={About} />
            <Route path={routes.adminContact} component={Contact} />
          </StyledDiv>
        </FlexWrapper>
      </StyledWrapper>
    );
  }
}

export default AdminPageTemplate;