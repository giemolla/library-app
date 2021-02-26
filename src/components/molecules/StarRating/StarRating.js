import React, { Component } from "react";
import styled from "styled-components";
import Star from "../../atoms/Star/Star";

const StyledWrapper = styled.div`
  font-size: 1.5rem;
  margin: 10px auto;
`;

class StarRating extends Component {
  constructor(props) {
    super(props);

    this.handleRating = this.handleRating.bind(this);
  }

  handleRating(e) {
    const parent = e.target.parentElement;
    const stars = parent.querySelectorAll(".fa-star");

    if (!this.props.rating) {
      if (e.type === "mouseover") {
        for (const star of stars) {
          if (star.id.slice(5) <= e.target.id.slice(5)) {
            star.classList.add("active");
          }
        }
      }

      if (e.type === "mouseleave") {
        for (const star of stars) {
          star.classList.remove("active");
        }
      }

      if (e.type === "click") {
        for (const star of stars) {
          if (star.id.slice(5) <= e.target.id.slice(5)) {
            star.classList.add("active");
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
              star.classList.add("active");
            }
          }
        } else {
          for (const star of stars) {
            star.classList.remove("active");
            if (star.id.slice(5) <= e.target.id.slice(5)) {
              star.classList.add("active");
            }
          }
        }
      }

      if (e.type === "mouseleave") {
        for (const star of stars) {
          if (star.id.slice(5) <= this.props.rating) {
            star.classList.add("active");
          } else {
            star.classList.remove("active");
          }
        }
      }

      if (e.type === "click") {
        for (const star of stars) {
          if (star.id.slice(5) <= e.target.id.slice(5)) {
            star.classList.add("active");
          }
        }
        this.props.changeRating(e.target.id.slice(5));
      }
    }
  }

  render() {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const star =
        this.props.rating && this.props.rating >= i ? (
          <Star
            key={i}
            id={`star-${i}`}
            handleRating={this.handleRating}
            className="fa fa-star active"
          />
        ) : (
          <Star
            key={i}
            id={`star-${i}`}
            handleRating={this.handleRating}
            className="fa fa-star"
          />
        );
      stars.push(star);
    }
    return <StyledWrapper className={this.props.className}>{stars}</StyledWrapper>;
  }
}

export default StarRating;
