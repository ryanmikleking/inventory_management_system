//import React from 'react'
import "./Home.css";
import Card from "../card/Card";
import { Link } from "react-router-dom";
const cardSelectors = [
  { name: "Submit New", path: "/SubmitNew" },
  { name: "List", path: "/List" },
];

const Home = () => {
  const cards = cardSelectors;

  return (
    <div className="body-container">
      {cards?.map((card) => (
        <Link to={card.path}>
          <Card cardObj={card} key={card.name} />
        </Link>
      ))}
    </div>
  );
};

export default Home;
