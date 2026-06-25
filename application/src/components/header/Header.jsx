//import React from 'react'
import "./Header.css";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header>
      <div className="header__container">
        <div className="header__img-container">
          <Link to="/">
            <img
              src="/monnig_logo_small.png"
              alt="Monnig Global Logo"
              height={100}
              width={100}
            />
          </Link>
        </div>
        <div className="header__text-container">
          <h3>Inventory Management System</h3>
        </div>
      </div>
    </header>
  );
};

export default Header;
