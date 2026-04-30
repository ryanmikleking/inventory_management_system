//import React from 'react'
import "./Header.css";
const Header = ({ setView }) => {
  return (
    <header>
      <div className="header-container">
        <div className="img-container">
          <img
            src="/monnig_logo_small.png"
            alt="Monnig Global Logo"
            height={100}
            width={100}
            onClick={setView("home")}
          />
        </div>
        <div className="text-container">
          <h3>Inventory Management System</h3>
        </div>
      </div>
    </header>
  );
};

export default Header;
