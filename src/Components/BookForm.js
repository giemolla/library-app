import React, { Component } from 'react';
import Rating from './Rating';
import './BookForm.css';

const FormField = (props) => {
    let typeOfTag = null;
    const input = <input type="text" name={props.name} onChange={props.handleInputChange}></input>;
    const textarea = <textarea name={props.name} rows='8' cols='50' onChange={props.handleInputChange}></textarea>
    if (props.name === 'description') {
        typeOfTag = textarea;
    } else {
        typeOfTag = input;
    }

    return(
        <div className="form-element">
            <label htmlFor={props.name}>{props.labelText}</label>
            {typeOfTag}
        </div>
    );
};

class BookForm extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.handleRating = this.handleRating.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
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
        const allBoxes = document.querySelectorAll('.box');
        for (const box of allBoxes) {
            box.style.backgroundColor = '#e7e7e7';
        }
        const box = e.target;
        const status = box.className.slice(4);
        const text = document.getElementById(status).innerText;
        
        this.setState({ status: text });
        box.style.backgroundColor = '#11aaaf';
    }

    handleRating(e) {
        const stars = document.querySelectorAll('.fa-star');

        if (!this.state.rating) {

            if (e.type === 'mouseover') {
                for (const star of stars) {
                    if (star.id.slice(5) <= e.target.id.slice(5)) {
                        star.classList.add('mouseover');
                    }
                }
            }

            if (e.type === 'mouseleave') {
                for (const star of stars) {
                    star.classList.remove('mouseover');
                }
            }

            if (e.type === 'click') {
                for (const star of stars) {
                    if (star.id.slice(5) <= e.target.id.slice(5)) {
                        star.classList.add('mouseover');
                    }
                }
                this.setState({ rating: e.target.id.slice(5)});
            }
        }

        if (this.state.rating) {
            if (e.type === 'mouseover') {
                if (e.target.id.slice(5) > this.state.rating) {
                    for (const star of stars) {
                        if (star.id.slice(5) <= e.target.id.slice(5)) {
                            star.classList.add('mouseover');    
                        }
                    }
                } else {
                    for (const star of stars) {
                        star.classList.remove('mouseover');
                        if (star.id.slice(5) <= e.target.id.slice(5)) {
                            star.classList.add('mouseover');
                        }
                    }
                }
            }

            if (e.type === 'mouseleave') {
                for (const star of stars) {
                    if (star.id.slice(5) <= this.state.rating) {
                        star.classList.add('mouseover');
                    } else {
                        star.classList.remove('mouseover');
                    }
                }
            }

            if (e.type === 'click') {
                for (const star of stars) {
                    if (star.id.slice(5) <= e.target.id.slice(5)) {
                        star.classList.add('mouseover');
                    }
                }
                this.setState({ rating: e.target.id.slice(5)});
            }
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const bookData = this.state;
        this.props.handleSubmit(bookData);
    }

    render() {
        let rating = 'hide';
        if (this.state.status && this.state.status === 'Przeczytana') {
            rating = '';
        }

        const formFields = [];
        const fields = [
            ['title', 'Tytuł'],
            ['author', 'Autor'],
            ['genre', 'Gatunek'],
            ['year', 'Rok pierwszego wydania'],
            ['link', 'Okładka (link)'],
            ['description', 'Opis']
        ];
        for (let i = 0; i < fields.length; i++) {
            formFields.push(
                <FormField key={i}
                    name={fields[i][0]}
                    labelText={fields[i][1]}
                    handleInputChange={this.handleInputChange}/>
            );
        }
        return(
            <form onSubmit={this.handleSubmit.bind(this)}>
                <h2>NOWA KSIAŻKA</h2>
            
                {formFields}

                <div className="form-element">
                    <label htmlFor="status">Status</label>

                    <div className="book-status">
                        <div className="box read" onClick={this.handleClick.bind(this)}></div>
                        <div className="text" id="read">Przeczytana</div>
                        <div className="box unread" onClick={this.handleClick.bind(this)}></div>
                        <div className="text" id="unread">Nieprzeczytana</div>
                        <div className="box in-progress" onClick={this.handleClick.bind(this)}></div>
                        <div className="text" id="in-progress">W trakcie czytania</div>
                    </div>
                </div>

                <Rating 
                    show={rating}
                    handleRating={this.handleRating}/>

                <button type="submit">DODAJ KSIAŻKĘ</button>
            </form>
        );
    }
}

export default BookForm;