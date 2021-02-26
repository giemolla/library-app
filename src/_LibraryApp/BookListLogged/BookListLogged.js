import React, { Component } from "react";
import { Link } from "react-router-dom";

import BookForm from "../BookForm/BookForm";
import "./BookListLogged.css";

const Book = props => {
  return (
    <div className="table-row">
      <div className="table-cell img-cell">
        <img src={props.src} alt="book-cover" />
      </div>
      <div className="table-cell author-title-cell">
        <div className="title">
          <Link to={props.bookUrl}>{props.title}</Link>
        </div>
        <div>{props.author}</div>
      </div>
      <div className="table-cell genre">{props.genre}</div>
      <div className="table-cell">{props.year}</div>
      <div className="table-cell">{props.status}</div>
      <div className="table-cell">{props.rating}</div>
      <div className="table-cell edit-book">
        <i className="fas fa-edit"></i>
      </div>
      <div className="table-cell delete-book">
        <i
          className="fas fa-trash-alt"
          onClick={() => props.handleDelete(props.id)}
        ></i>
      </div>
    </div>
  );
};

class BookListLogged extends Component {
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

  componentWillMount() {
    this.fetchBooks();
  }

  fetchBooks() {
    const url = "http://localhost:3000/books";
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        this.setState({ books: data });
      });
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
        genre
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
          handleDelete={this.handleDelete}
          bookUrl={`/books/${id}`}
        />
      );
    });
  }

  handleAdd(data) {
    const url = "http://localhost:3000/books";
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

    fetch(url, {
      method: "post",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(newBook)
    })
      .then(res => res.json())
      .then(newBook => {
        console.log("Dodana ksiązka: ");
        console.log(newBook);
        this.addBook(newBook);
      });
  }

  addBook(data) {
    this.setState({
      books: this.state.books.concat(data)
    });
  }

  handleDelete(id) {
    const url = `http://localhost:3000/books/${id}`;
    fetch(url, {
      method: "delete",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then(res => {
      this.deleteBook(id);
    });
  }

  deleteBook(id) {
    let refreshedBooks = this.state.books.filter(book => book.id !== id);
    if (this.state.chosenBook.id === id) {
      this.setState({ chosenBook: null });
    }
    this.setState({
      books: refreshedBooks
    });
  }

  render() {
    const bookNodes = this.getBooks();

    return (
      <div className="table-of-books">
        <button className="admin-panel-btn add-book-btn">Dodaj ksiązkę</button>
        <h1 className="table-row table-header">MY LIBRARY</h1>
        <div className="table-row header-row">
          <div className="table-cell img-table-cell"></div>
          <div className="table-cell author-title-cell">Tytuł, autor</div>
          <div className="table-cell">Gatunek</div>
          <div className="table-cell">Pierwsze wydanie</div>
          <div className="table-cell">Status</div>
          <div className="table-cell">Moja ocena</div>
          <div className="table-cell edit-book"></div>
          <div className="table-cell delete-book"></div>
        </div>
        {bookNodes}
        <BookForm handleSubmit={this.handleAdd} />
      </div>
    );
  }
}

export default BookListLogged;
