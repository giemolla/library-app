// api Pucka
// https://books-api-react-fun.herokuapp.com/api/v1/books
import React, { Component } from 'react';
import BookList from './Components/BookList';
import BookForm from './Components/BookForm';
import BookDetails from './Components/BookDetails';
import './App.css';

// const SaveButton = (props) => {
//   let text = '';
//   if(props.copy) {
//     text = 'Kopia zapasowa jest aktualna!';
//   } else {
//     text = 'Zrób kopię zapasową!';
//   }
//   return(
//     <button onClick={props.handleClick}>{text}</button>
//   );
// };

class LibraryApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      copy: true,
      chosenBook: null
    };

    this.handleAdd = this.handleAdd.bind(this);
    this.addBook = this.addBook.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.deleteBook = this.deleteBook.bind(this);
    this.handleShowBookDetails = this.handleShowBookDetails.bind(this);
  }

  componentWillMount() {
    this.fetchBooks();
  }

  fetchBooks() {
    const url = 'http://localhost:3001/books';
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        this.setState({ books: data });
      });
  }

  handleAdd(data) {
    const url = 'http://localhost:3001/books';
    const { title, author, genre, year, status, description, link, rating } = data;
    const newBook = {
      title: title || '',
      author: author || '',
      genre: genre || '',
      year: year || '',
      status: status || '',
      description: description || '',
      image: link || "",
      rating: rating || null,
      thumbnail: "",
      quotations: [],
      quotationImages: [],
      comments: "",
      links: []
    };

    fetch(url, {
      method: 'post',
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
    const url = `http://localhost:3001/books/${id}`;
    fetch(url, {
      method: 'delete',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(res => {
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

  handleShowBookDetails(id) {
    const chosenBook = this.state.books.find(book => book.id === id);
    this.setState({ chosenBook });
  }

  showBookDetails(book) {
    const { image, title, author, rating, status='przeczytana', year=2000, genre, description } = book;
    return(
      <BookDetails 
        title={title}
        author={author}
        src={image}
        description={description}
        genre={genre}
        year={year}
        status={status}/>
    );
  }

  saveCopy() {
    console.log('Saving books...');
    const url = 'http://localhost:3001/save';
    fetch(url, {
      method: 'post',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(this.state.books)
    })
      .then(res => res.json())
      .then(res => console.log(res));
  }

  render() {
    let bookDetails;
    if(this.state.chosenBook) {
      bookDetails = this.showBookDetails(this.state.chosenBook);
    }

    return(
      <div>
        {/* <SaveButton
          copy={this.state.copy}
          handleClick={this.saveCopy.bind(this)}
        /> */}
        <BookList books={this.state.books}
                  handleDelete={this.handleDelete}
                  handleShowBookDetails={this.handleShowBookDetails}/>
        {bookDetails}
        <BookForm handleSubmit={this.handleAdd}/>
      </div>
    );
  }
}

export default LibraryApp;
