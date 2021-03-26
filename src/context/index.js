import React, { useState, useEffect, createContext } from "react";
import { getAllBooks, add, remove } from '../services/bookService';

export const PageContext = createContext(false);

export const BooksContext = createContext({books: []});

export const BooksProvider = ({ children }) => {
  const [ books, setBooks ] = useState([]);

  useEffect(() => {
    getAllBooks(setBooks)
  }, []);

  const handleAdd = (data) => {
    const {
      title,
      author,
      genre,
      year,
      status,
      description,
      link,
      rating
    } = data;
    const newBook = {
      title: title || "",
      author: author || "",
      genre: genre || "",
      year: year || "",
      status: status || "",
      description: description || "",
      image: link || "",
      rating: rating || null,
      thumbnail: "",
      quotations: [],
      quotationImages: [],
      comments: "",
      links: []
    };
    add(newBook, addBook)
  };

  const addBook = (newBook) => {
    setBooks([...books, newBook]);
  }

  const handleDelete = (id) => {
    remove(id, deleteBook);
  }

  const deleteBook = (id) => {
    setBooks(books.filter(book => book.id !== id));
  }

  return (
    <BooksContext.Provider value={{ books, handleAdd, handleDelete }}>
      { children }
    </BooksContext.Provider>)
}
