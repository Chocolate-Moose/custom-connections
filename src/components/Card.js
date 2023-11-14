import React from 'react';
import '../styles/Card.css';

function Card({
  word, isSelected, setSelectedWords, selectedWords,
}) {
  const handleSelect = () => {
    if (isSelected) {
      setSelectedWords((selected) => selected.filter((s) => s !== word));
    } else if (selectedWords.length < 4) {
      setSelectedWords([...selectedWords, word]);
    }
  };
  return (
    <div className={`card ${isSelected ? 'selected' : 'unselected'}`} onClick={() => handleSelect()}>{word}</div>
  );
}

export default Card;
