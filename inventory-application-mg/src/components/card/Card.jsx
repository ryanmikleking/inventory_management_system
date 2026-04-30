//import React from 'react'
import "./Card.css";

const Card = ({ cardObj }) => {
  //console.log({cardObj.name})
  return (
    <div className="card">
      <div className="title-container">
        <h6>{cardObj.name}</h6>
      </div>
    </div>
  );
};

export default Card;
