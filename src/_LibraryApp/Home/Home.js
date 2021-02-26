import React from "react";
import { Link } from "react-router-dom";

import "./Home.css";

const Home = () => {
  return (
    <div className="home-wrapper">
      <div className="home-content">
        <h1 className="home-header">Prywatna biblioteczka Karoliny</h1>
        <button className="home-btn">
          <Link to="/books">Pokaz ksiązki</Link>
        </button>
      </div>
    </div>
  );
};

export default Home;
