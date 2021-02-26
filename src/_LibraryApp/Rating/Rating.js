import React, { Component } from "react";

const Star = props => {
  return (
    <i
      className="fas fa-star"
      id={props.id}
      onMouseOver={props.handleRating}
      onMouseLeave={props.handleRating}
      onClick={props.handleRating}
    ></i>
  );
};

class Rating extends Component {
  constructor(props) {
    super(props);

    this.handleRating = this.handleRating.bind(this);
  }

  handleRating(e) {
    const parent = document.querySelector(`#book-card-${this.props.id}`);
    const stars = parent.querySelectorAll(".fa-star");

    if (!this.props.rating) {
      if (e.type === "mouseover") {
        for (const star of stars) {
          if (star.id.slice(5) <= e.target.id.slice(5)) {
            star.classList.add("mouseover");
          }
        }
      }

      if (e.type === "mouseleave") {
        for (const star of stars) {
          star.classList.remove("mouseover");
        }
      }

      if (e.type === "click") {
        for (const star of stars) {
          if (star.id.slice(5) <= e.target.id.slice(5)) {
            star.classList.add("mouseover");
          }
        }
        this.props.changeRating(e.target.id.slice(5));
      }
    }

    if (this.props.rating) {
      if (e.type === "mouseover") {
        if (e.target.id.slice(5) > this.props.rating) {
          for (const star of stars) {
            if (star.id.slice(5) <= e.target.id.slice(5)) {
              star.classList.add("mouseover");
            }
          }
        } else {
          for (const star of stars) {
            star.classList.remove("mouseover");
            if (star.id.slice(5) <= e.target.id.slice(5)) {
              star.classList.add("mouseover");
            }
          }
        }
      }

      if (e.type === "mouseleave") {
        for (const star of stars) {
          if (star.id.slice(5) <= this.props.rating) {
            star.classList.add("mouseover");
          } else {
            star.classList.remove("mouseover");
          }
        }
      }

      if (e.type === "click") {
        for (const star of stars) {
          if (star.id.slice(5) <= e.target.id.slice(5)) {
            star.classList.add("mouseover");
          }
        }
        this.props.changeRating(e.target.id.slice(5));
      }
    }
  }

  render() {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star key={i} id={"star-" + i} handleRating={this.handleRating} />
      );
    }
    return (
      <div className={"form-element star-rating " + this.props.show}>
        <label htmlFor="rating">{this.props.header}</label>
        {stars}
      </div>
    );
  }
}

export default Rating;
