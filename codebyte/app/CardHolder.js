import React from 'react';

const CardHolder = ({ cards }) => {
  return (
    <div className="card-holder">
      {cards.map((card, index) => (
        <div className="card" key={index}>
          <h2>{card.title}</h2>
          <p className="card-text">{card.text}</p>
        </div>
      ))}
    </div>
  );
};

export default CardHolder;