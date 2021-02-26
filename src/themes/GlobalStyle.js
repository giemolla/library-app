import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,600&display=swap&subset=latin-ext');
    @import url('https://fonts.googleapis.com/css?family=Sacramento&display=swap&subset=latin-ext');

    *, *::before, *::after {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  html {
    font-size: 62.5%; 
  }
  
  body {
    margin: 0;
    padding: 0;
    font-size: 1.6rem;
    font-family: "Source Sans Pro", sans-serif;
  }
`;

export default GlobalStyle;
