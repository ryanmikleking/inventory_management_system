//import React from 'react'
import "./Card.css";

const Card = ({ cardObj }) => {
  //console.log({cardObj.name})
  const classname = cardObj.name.replace(/\s+/g, "");
  return (
    <div className="card">
      <div className="card__title-container">
        <h6>{cardObj.name}</h6>
      </div>
      <div className={`card__${classname}`}></div>
    </div>
  );
};

export default Card;
