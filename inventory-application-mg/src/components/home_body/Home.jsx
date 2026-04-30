//import React from 'react'
import "./Home.css";
import Card from "../card/Card";
const cardSelectors = [
  { name: "Submit New", setView: "submit" },
  { name: "List", setView: "list" },
];

const Home = ({ setView }) => {
  const cards = cardSelectors;

  return (
    <div className="body-container">
      {cards?.map((card) => (
        <Card cardObj={card} key={card.name} setView={setView} />
      ))}
    </div>
  );
};

export default Home;
