// api Pucka
// https://books-api-react-fun.herokuapp.com/api/v1/books
import React, { Component } from 'react';
import BookForm from './Components/BookForm';
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

const Book = (props) => {
  return(
    <div className="table-row">
      <div className="table-cell img-cell">
        <img src={props.src} alt='book-cover'/>
      </div>
      <div className="table-cell author-title-cell">
        <div className="title">{props.title}</div>
        <div>{props.author}</div>
      </div>
      <div className="table-cell genre">{props.genre}</div>
      <div className="table-cell">{props.year}</div>
      <div className="table-cell">{props.status}</div>
      <div className="table-cell">{props.rating}</div>
      <div className="table-cell delete-book">
        <i className="fas fa-trash-alt" onClick={() => props.handleClick(props.id)}></i>
      </div>
    </div>
  );
};

class LibraryApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      copy: true
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
    const url = 'http://localhost:3001/books';
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        this.setState({ books: data });
      });
  }

  getBooks() {
    return(
      this.state.books.map(book => {
        const { id, image, title, author, rating, status='przeczytana', year=2000, genre } = book;
        return(
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
            handleClick={this.handleDelete}
          />
        );
      })
    );
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
    this.setState({
      books: refreshedBooks
    });
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
    const bookNodes = this.getBooks();
    return(
      <div>
        {/* <SaveButton
          copy={this.state.copy}
          handleClick={this.saveCopy.bind(this)}
        /> */}
        <div className='table-of-books'>
          <h1 className="table-row table-header">MY LIBRARY</h1>
            <div className="table-row header-row">
              <div className="table-cell img-table-cell"></div>
              <div className="table-cell author-title-cell">Tytuł, autor</div>
              <div className="table-cell">Gatunek</div>
              <div className="table-cell">Pierwsze wydanie</div>
              <div className="table-cell">Status</div>
              <div className="table-cell">Moja ocena</div>
              <div className="table-cell delete-book"></div>
            </div>
            {bookNodes}
        </div>
        <BookForm handleSubmit={this.handleAdd}/>
      </div>
    );
  }
}

export default LibraryApp;
