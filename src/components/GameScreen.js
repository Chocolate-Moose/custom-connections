import React, { useState } from 'react';
import '../styles/GameScreen.css';
import Card from './Card';

function Play({
  words, setEditMode, wordsToColors, wordArray,
}) {
  const [selectedWords, setSelectedWords] = useState([]);

  const shuffled = wordArray
    .map((word) => ({ word, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ word }) => word);

  const renderCards = shuffled.map((word) => {
    return <Card word={word} isSelected={selectedWords.has(word)} setSelectedWords={setSelectedWords} />;
  });

  return (
    <div className="grid-container">

      {renderCards}
      <button type="button">submit</button>
      <button type="button" onClick={() => setEditMode(true)}>edit</button>
    </div>
  );
}

export default Play;
