import React, { Component } from 'react';

const Star = (props) => {
    return(
        <i className="fas fa-star" id={props.id}
            onMouseOver={props.handleRating}
            onMouseLeave={props.handleRating}
            onClick={props.handleRating}></i>
    );
};

class Rating extends Component {
    render() {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <Star key={i}
                    id={"star-" + i}
                    handleRating={this.props.handleRating}/>
            );
        }
        return(
            <div className={"form-element star-rating " + this.props.show}>
                <label htmlFor="rating">Ocena</label>
                {stars}
            </div>
        );
    }
}

export default Rating;