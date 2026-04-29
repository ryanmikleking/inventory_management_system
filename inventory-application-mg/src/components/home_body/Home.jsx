import React from 'react'
import './Home.css'
import Card from '../card/Card'
const cardSelectors = [
    {name: "Submit New"}, {name:"List"}
]

const Home = () => {

    const cards = cardSelectors;

  return (
    <div className='body-container'>
        {cards?.map((card) => (
            <Card cardObj={card} key={card.name} />
        ))}
    </div>
  )
}

export default Home