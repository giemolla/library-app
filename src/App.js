import React, { Component } from 'react';
import './App.css';

const Book = (props) => {
  return(
    <div>
      <h2>{props.title}</h2>
    </div>
  );
};

class LibraryApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dupa: 'dupa',
      books: []
    };
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
        console.log(this.state.books);
      });
  }

  // addBook() {
  //   const url = 'http://localhost:3001/books';
  //   const newBook = {
  //     title: "Ojciec Chrzestny",
  //     author: "Mario Puzo"
  //   };
  //   console.log('Dodaję...');
  //   fetch(url, {
  //     method: 'post',
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8"
  //     },  
  //     body: JSON.stringify(newBook)
  //   })
  //   .then(res => res.json())
  //   .then(res => {
  //       console.log("Dodana ksiązka: ");
  //       console.log(res);
  //   });
  // }

  render() {
    return(
      <div>
        {this.state.dupa}
        {this.state.books.length}
        {this.state.books.map(book => {
          return book.title;
        })}
        <Book title={this.state.books[0].title}/>
      </div>
    );
  }
}

export default LibraryApp;
