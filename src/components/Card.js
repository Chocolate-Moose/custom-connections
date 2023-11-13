import React from 'react';
import '../styles/Card.css';

function Card({
  word, isSelected, setSelectedWords,
}) {
  return (
    <div className="card">{word}</div>
  );
}

export default Card;
