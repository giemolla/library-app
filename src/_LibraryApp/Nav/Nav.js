import React from "react";
import styled from "styled-components";
import HorizontalList from "../../molecules/HorizontalList/HorizontalList";
import ListElement from "../../atoms/ListElement/ListElement";
// import { Link } from "react-router-dom";

// import "./Nav.css";

// const Nav = props => {
//   let logoutBtn = props.adminLoggedIn ? (
//     <button
//       className="admin-panel-btn logout-btn"
//       onClick={props.handleLogoutClick}
//     >
//       Wyloguj <i className="fas fa-power-off"></i>
//     </button>
//   ) : (
//     ""
//   );
//   return (
//     <header>
//       {logoutBtn}
//       <div className="header-wrapper">
//         <h2 className="header-header">
//           <Link to="/">giemolla library</Link>
//           <i className="fas fa-book-open"></i>
//         </h2>
//         <nav className="nav">
//           <ul className="nav-list">
//             <li className="nav-list-element">
//               <Link to="/books">Ksiązki</Link>
//             </li>
//             <li className="nav-list-element">
//               <Link to="/about">O mnie</Link>
//             </li>
//             <li className="nav-list-element">
//               <Link to="/contact">Kontakt</Link>
//             </li>
//           </ul>
//         </nav>
//       </div>
//     </header>
//   );
// };

const StyledNav = styled.nav`
  padding: 0;
  margin: 0;
`;

const Nav = () => (
  <StyledNav>
    <HorizontalList>
      <ListElement>Ksiązki</ListElement>
      <ListElement>O mnie</ListElement>
      <ListElement>Kontakt</ListElement>
    </HorizontalList>
  </StyledNav>
);

export default Nav;
