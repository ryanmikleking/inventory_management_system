//import React from 'react'
import "./Card.css";

const Card = ({ cardObj }) => {
  //console.log({cardObj.name})
  return (
    <div className="card">
      <div className="card__title-container">
        <h6>{cardObj.name}</h6>
      </div>
      <div className={`card__${cardObj.name}`}></div>
    </div>
  );
};

export default Card;
