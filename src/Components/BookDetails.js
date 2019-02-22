import React, { Component } from 'react';
import './BookDetails.css';

class BookDetails extends Component {
    render() {
        return(
            <div className="book-details">

                <div className="big-cover">
                    <img src={this.props.src} alt="book-cover"/>
                </div>

                <div className="main-info">
                    <h2 className="title">{this.props.title}</h2>
                    <h3 className="author">{this.props.author}</h3>
                    <h4>{this.props.genre}</h4>
                    <h4>{this.props.year}</h4>
                    <div>
                        <a>Link 1</a>
                        <a>Link 2</a>
                    </div>
                    <h5 className="status">{this.props.status}</h5>

                    <span className="my-rating">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                    </span>
                </div>

                <div className="description">
                    <p>{this.props.description}</p>
                </div>

            </div>
        );
    }
}

export default BookDetails;