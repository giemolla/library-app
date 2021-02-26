import React, { Component } from "react";
import styled, { css } from "styled-components";
import Button from "../../atoms/Button/Button";
import Heading from "../../atoms/Heading/Heading";
import BookMarksButtons from "../../molecules/BookMarksButtons/BookMarksButtons";
import photo from "../../../assets/photo.jpg";
import screen from "../../../assets/screen.jpg";

const GridContainer = styled.div`
  padding-top: 74px;
  width: 100%;
  height: 100vh;
  background-color: black;
  display: grid;

  &#grid-1 {
    grid-template-columns: 2fr 450px 2fr;
    grid-template-rows: 23% 1fr 4fr;
    grid-template-areas:
      "photo photo photo"
      "screen cover button"
      "screen cover author";
  }

  &#grid-2 {
    grid-template-columns: 2fr 1fr 2fr 3fr;
    grid-template-rows: 1fr 4fr;
    grid-template-areas:
      "author photo button screen"
      "author photo cover screen";
  }

  &#grid-3 {
    grid-template-columns: 70% 1fr 2fr;
    grid-template-rows: 2fr 1fr;
    grid-template-areas:
      "author button cover"
      "photo screen screen";

    & > button {
    }

    & > button > a {
      writing-mode: vertical-rl;
      text-orientation: sideways;
    }
  }
`;

const PhotoArea = styled.div`
  grid-area: photo;
  background-color: green;
  background-image: url(${photo});
  background-size: cover;
  background-position-y: 80%;
`;

const CoverArea = styled.div`
  grid-area: cover;
  background-color: pink;
  background-image: url(${({ cover }) => cover});
  background-size: cover;
  background-position: center;
  background-position-y: 5%;
  cursor: pointer;
  z-index: 2;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const ScreenArea = styled.div`
  grid-area: screen;
  background-color: yellow;
  background-image: url(${screen});
  background-size: cover;
  background-position: center;
`;

const StyledAuthor = styled.div`
  grid-area: author;
  background-color: blue;
  background-image: url(${({ authorImage }) => authorImage});
  background-size: cover;
  background-position: center;
  position: relative;
  cursor: pointer;

  &:after {
    content: "";
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
  }

  ${({ hover }) =>
    hover === true &&
    css`
      &:after {
        opacity: 0.5;
      }

      & > div {
        opacity: 1;
      }
    `}
`;

const StyledButton = styled(Button)`
  grid-area: button;
  margin: 0;
  border-radius: 0;
  box-shadow: none;
  color: black;
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.fontSize.l};
  transition: all 0.2s ease-in-out;

  &:hover {
    letter-spacing: 3px;
  }
`;

const AuthorInfo = styled.div`
  display: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
`;

const StyledHeading = styled(Heading)`
  margin-bottom: 30px;
  font-family: ${({ theme }) => theme.fancyFont};
  font-size: ${({ theme }) => theme.fontSize.xl};
  letter-spacing: 3px;
`;

const StyledAuthorButton = styled(Button)`
  font-size: ${({ theme }) => theme.fontSize.s};
  text-transform: uppercase;
  padding: 15px 30px;
  width: 100%;
  transition: all 0.2s ease-in-out;

  &:hover {
    letter-spacing: 1px;
  }
`;

class GridHero extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hover: false,
      gridID: 1,
      lastBooks: []
    };

    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleMarkClick = this.handleMarkClick.bind(this);
  }

  componentDidMount() {
    this.timer = setInterval(() => this.changeGrid(), 5000);
    this.fetchLastBooks();
  }

  fetchLastBooks() {
    const url = "http://localhost:3000/books/";
    fetch(url)
      .then(data => data.json())
      .then(data => {
        this.setState({
          lastBooks: data.slice(-3)
        });
      });
  }

  getLastBook(gridID) {
    return this.state.lastBooks.map(book => {
      if (this.state.lastBooks.indexOf(book) === gridID - 1) {
        return (
          <>
            <PhotoArea />
            <ScreenArea />
            <CoverArea cover={book.image} />
            <StyledAuthor
              authorImage={book.authorImage}
              onMouseOver={this.handleMouseOver}
              onMouseOut={this.handleMouseOut}
              hover={this.state.hover}
            >
              <AuthorInfo>
                <StyledHeading>{book.author}</StyledHeading>
                <StyledAuthorButton>Więcej o autorze</StyledAuthorButton>
              </AuthorInfo>
            </StyledAuthor>
          </>
        );
      }
    });
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  changeGrid() {
    if (this.state.gridID < 3) {
      this.setState(prevState => ({
        gridID: prevState.gridID + 1
      }));
    } else {
      this.setState({ gridID: 1 });
    }
  }

  handleMouseOver() {
    this.setState({ hover: true });
  }

  handleMouseOut() {
    this.setState({ hover: false });
  }

  handleMarkClick(e) {
    e.preventDefault();
    let target;
    if (e.target.nodeName !== "BUTTON") {
      target = e.target.parentNode;
    }
    clearInterval(this.timer);
    this.setState({ gridID: target.id.slice(-1) });
    this.timer = setInterval(() => this.changeGrid(), 5000);
    console.dir(target);
  }

  render() {
    const lastBook = this.getLastBook(this.state.gridID);
    return (
      <>
        <GridContainer id={`grid-${this.state.gridID}`}>
          {lastBook}
          <StyledButton>
            <a>Zobacz więcej</a>
          </StyledButton>
        </GridContainer>
        <BookMarksButtons
          active={this.state.gridID}
          onMarkClick={this.handleMarkClick}
        />
      </>
    );
  }
}

export default GridHero;
