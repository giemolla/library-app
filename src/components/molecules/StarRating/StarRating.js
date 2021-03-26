import React from "react";
import styled from "styled-components";
import Star from "../../atoms/Star/Star";

const StyledWrapper = styled.div`
  font-size: 1.5rem;
  margin: 10px auto;
`;

const StarRating = (props) => {
  const handleRating = (e) => {
    const parent = e.target.parentElement;
    const stars = parent.querySelectorAll(".fa-star");

    if (!props.rating) {
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
        props.changeRating(e.target.id.slice(5));
      }
    }

    if (props.rating) {
      if (e.type === "mouseover") {
        if (e.target.id.slice(5) > props.rating) {
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
          if (star.id.slice(5) <= props.rating) {
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
        props.changeRating(e.target.id.slice(5));
      }
    }
  }

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    const star =
      props.rating && props.rating >= i ? (
        <Star
          key={i}
          id={`star-${i}`}
          handleRating={handleRating}
          className="fa fa-star active"
        />
      ) : (
        <Star
          key={i}
          id={`star-${i}`}
          handleRating={handleRating}
          className="fa fa-star"
        />
      );
    stars.push(star);
  }
  return <StyledWrapper className={props.className}>{stars}</StyledWrapper>;
}

export default StarRating;
