import React, { Component } from "react";
import "./BookDetails.css";

class BookDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book: {}
    };
  }

  componentWillMount() {
    this.fetchBook();
  }

  fetchBook() {
    const url = `http://localhost:3001/books/${this.props.match.params.id}`;
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          book: res
        });
      });
  }

  render() {
    const {
      image,
      title,
      author,
      genre,
      year,
      status,
      description
    } = this.state.book;
    return (
      <div className="book-details">
        <div className="big-cover">
          <img src={image} alt="book-cover" />
        </div>

        <div className="main-info">
          <h2 className="title">{title}</h2>
          <h3 className="author">{author}</h3>
          <h4>{genre}</h4>
          <h4>{year}</h4>
          {/* <div>
                        <a href="#">Link 1</a>
                        <a href="#">Link 2</a>
                    </div> */}
          <h5 className="status">{status}</h5>

          <span className="my-rating">
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
          </span>
        </div>

        <div className="description">
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

export default BookDetails;
