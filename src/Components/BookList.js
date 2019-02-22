import React, { Component } from 'react';

const Book = (props) => {
    return(
      <div className="table-row">
        <div className="table-cell img-cell">
          <img src={props.src} alt='book-cover'/>
        </div>
        <div className="table-cell author-title-cell">
          <div className="title" onClick={() => props.handleShowBookDetails(props.id)}>{props.title}</div>
          <div>{props.author}</div>
        </div>
        <div className="table-cell genre">{props.genre}</div>
        <div className="table-cell">{props.year}</div>
        <div className="table-cell">{props.status}</div>
        <div className="table-cell">{props.rating}</div>
        <div className="table-cell delete-book">
          <i className="fas fa-trash-alt" onClick={() => props.handleDelete(props.id)}></i>
        </div>
      </div>
    );
  };

class BookList extends Component {
    getBooks() {
        return(
          this.props.books.map(book => {
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
                handleDelete={this.props.handleDelete}
                handleShowBookDetails={this.props.handleShowBookDetails}
              />
            );
          })
        );
      }

    render() {
        const bookNodes = this.getBooks();
        return(
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
        );
    }
}

export default BookList;