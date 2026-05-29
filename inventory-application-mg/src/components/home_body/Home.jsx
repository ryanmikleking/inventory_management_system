//import React from 'react'
import "./Home.css";
import Card from "../card/Card";
import { Link } from "react-router-dom";
const cardSelectors = [
  { key: 1, name: "Submit", path: "/SubmitNew", url: "/Submit.png" },
  { key: 2, name: "List", path: "/List", url: "/List.png" },
];

const Home = () => {
  const cards = cardSelectors;

  return (
    <div className="body-container">
      {cards?.map((card) => (
        <Link to={card.path}>
          <Card cardObj={card} key={card.key} />
        </Link>
      ))}
    </div>
  );
};

export default Home;
