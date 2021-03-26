import React from "react";
import ReactDOM from "react-dom";
import LibraryApp from "./views/LibraryApp";
import { BooksProvider } from './context';

ReactDOM.render(
  <BooksProvider>
    <LibraryApp />
  </BooksProvider>,
  document.getElementById("root"));
