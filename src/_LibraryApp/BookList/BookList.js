import React, { Component } from "react";
import { Link } from "react-router-dom";

import Rating from "../Rating/Rating";
import "./BookList.css";

class Book extends Component {
  constructor(props) {
    super(props);

    this.state = { rating: null };

    this.changeRating = this.changeRating.bind(this);
  }

  changeRating(rate) {
    this.setState({ rating: rate });
  }

  render() {
    return (
      <div className="book-card" id={`book-card-${this.props.id}`}>
        <div className="book-card-left">
          <div className="book-cover">
            <img src={this.props.src} alt="book-cover" />
          </div>

          <div className="user-interactions">
            <Rating
              header="Oceń"
              rating={this.state.rating}
              changeRating={this.changeRating}
              id={this.props.id}
            />
            <button className="small-btn">Dodaj komentarz</button>
          </div>
        </div>

        <div className="book-card-right">
          <div className="book-details">
            <div className="some-detail title">
              <Link to={this.props.bookUrl}>{this.props.title}</Link>
            </div>
            <div className="some-detail">{this.props.author}</div>
            <div className="some-detail">{this.props.genre}</div>
            <div className="some-detail">{this.props.year}</div>
            <div className="some-detail">{this.props.status}</div>
            <div className="some-detail">{this.props.rating}</div>
          </div>

          <div className="some-detail desc">
            {this.props.description}
            <button className="small-btn">
              Rozwiń <i className="fas fa-angle-down"></i>
            </button>
          </div>

          <div className="some-detail review">
            Recenzja/przemyślenia
            <button className="small-btn">
              Rozwiń <i className="fas fa-angle-down"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

class BookList extends Component {
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
          handleDelete={this.handleDelete}
          bookUrl={`/books/${id}`}
          description={description}
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

    return <div className="book-nodes">{bookNodes}</div>;
  }
}

export default BookList;
