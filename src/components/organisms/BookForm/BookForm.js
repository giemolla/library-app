import React, { Component } from "react";
import styled from 'styled-components';
import Rating from "../../molecules/StarRating/StarRating";
import Button from '../../atoms/Button/Button';
import Input from '../../atoms/Input/Input';
import Label from '../../atoms/Label/Label';
import Heading from '../../atoms/Heading/Heading';

const StyledForm = styled.form`
  width: 60%;
  margin: 5rem auto;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
`;

const StyledHeading = styled(Heading)`
  text-align: center;
  padding: 20px 0;
  margin-bottom: 20px;
  background-color: ${({ theme }) => theme.navyblue};
  color: white;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const StyledFormElement = styled.div`
  width: 80%;
  margin: 0.5rem auto;
`;

const StyledInput = styled(Input)`
  border: 1px solid ${({ theme }) => theme.navyblue};
  width: 100%;
`;

const StyledTextarea = styled.textarea`
  display: block;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.navyblue};
  height: 30px;
  padding: 0.7rem;
  border-radius: 10px;
  height: initial;

  &:focus {
    outline: none;
  }
`;

const StyledStatusWrapper = styled.div`
  display: flex;
  width: 80%;
  margin: 0.5rem auto;
`;

const StyledBookStatus = styled.div`
  display: flex;
  margin: 40px 20px 40px 0;
`;

const StyledRatingWrapper = styled.div`
  display: flex;
  width: 80%;
  margin: 0 auto 40px;
`;

const StyledRating = styled(Rating)`
  margin: 0;
  margin-left: 10px;
`;

const StyledBox = styled.div`
  width: 20px;
  height: 20px;
  border: 1px solid ${({ theme }) => theme.navyblue};
  border-radius: 5px;
  margin-right: 10px;
`;

const StyledButton = styled(Button)`
  width: 100%;
  padding: 20px 0;
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize.m};
  background-color: ${({ theme }) => theme.yellow};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;

  &:hover {
    color: white;
    background-color: ${({ theme }) => theme.navyblue};
  }
`;

const FormField = props => {
  let typeOfTag = null;

  const input = (
    <StyledInput
      type="text"
      name={props.name}
      onChange={props.handleInputChange}
    ></StyledInput>
  );

  const textarea = (
    <StyledTextarea
      name={props.name}
      rows="8"
      cols="50"
      onChange={props.handleInputChange}
    ></StyledTextarea>
  );
  if (props.name === "description") {
    typeOfTag = textarea;
  } else {
    typeOfTag = input;
  }

  return (
    <StyledFormElement>
      <Label htmlFor={props.name}>{props.labelText}</Label>
      {typeOfTag}
    </StyledFormElement>
  );
};

class BookForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0
    };

    this.changeRating = this.changeRating.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleClick(e) {
    e.preventDefault();
    const allBoxes = document.querySelectorAll(".box");
    for (const box of allBoxes) {
      box.style.backgroundColor = "white";
    }
    const box = e.target;
    const status = box.dataset.status;

    this.setState({ status });
    box.style.backgroundColor = "#303c6c";
  }

  changeRating(rate) {
    this.setState({ rating: rate });
  }

  handleSubmit(e) {
    e.preventDefault();
    const bookData = this.state;
    this.props.handleSubmit(bookData);
  }

  render() {
    const formFields = [];
    const fields = [
      ["title", "Tytuł"],
      ["author", "Autor"],
      ["genre", "Gatunek"],
      ["year", "Rok pierwszego wydania"],
      ["link", "Okładka (link)"],
      ["description", "Opis"]
    ];
    for (let i = 0; i < fields.length; i++) {
      formFields.push(
        <FormField
          key={i}
          name={fields[i][0]}
          labelText={fields[i][1]}
          handleInputChange={this.handleInputChange}
        />
      );
    }
    return (
      <StyledForm onSubmit={this.handleSubmit}>
        <StyledHeading secondary>NOWA KSIAŻKA</StyledHeading>

        {formFields}

        <StyledStatusWrapper>
          <StyledBookStatus className="book-status">
            <StyledBox
              className="box" data-status="read"
              onClick={this.handleClick.bind(this)}
            ></StyledBox>
            <Label className="text" id="read">
              Przeczytana
            </Label>
          </StyledBookStatus>
          <StyledBookStatus className="book-status">
            <StyledBox
              className="box" data-status="unread"
              onClick={this.handleClick.bind(this)}
            ></StyledBox>
            <Label className="text" id="unread">
              Nieprzeczytana
            </Label>
          </StyledBookStatus>
          <StyledBookStatus className="book-status">
            <StyledBox
              className="box" data-status="in-progress"
              onClick={this.handleClick.bind(this)}
            ></StyledBox>
            <Label className="text" id="in-progress">
              W trakcie czytania
            </Label>
          </StyledBookStatus>
        </StyledStatusWrapper>

        {this.state.status === "read" &&
          <StyledRatingWrapper>
            <Label>Ocena:</Label>
            <StyledRating rating={this.state.rating} changeRating={this.changeRating} /> 
          </StyledRatingWrapper>
        }

        <StyledButton type="submit">
          DODAJ KSIAŻKĘ
        </StyledButton>
      </StyledForm>
    );
  }
}

export default BookForm;
