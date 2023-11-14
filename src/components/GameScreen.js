import React, { useState } from 'react';
import '../styles/GameScreen.css';
import Card from './Card';
import CategoryCard from './CategoryCard';

function Play({
  words, setEditMode, wordsToColors, wordArray, shuffled, setWordArray, categoryTitles,
}) {
  const [selectedWords, setSelectedWords] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [numMistakes, setNumMistakes] = useState(4);
  const [correctColors, setCorrectColors] = useState([]);

  const renderCards = shuffled.map((word) => {
    return <Card word={word} isSelected={selectedWords.includes(word)} setSelectedWords={setSelectedWords} selectedWords={selectedWords} />;
  });

  const renderCategories = correctColors.map((category) => {
    return <CategoryCard category={category} words={words[category]} title={categoryTitles[category]} />;
  });

  const oneAway = () => {
    const colorCount = {
      yellow: 0, green: 0, blue: 0, purple: 0,
    };
    for (const word of selectedWords) {
      colorCount[wordsToColors[word]] += 1;
    }
    console.log(colorCount);
    // eslint-disable-next-line no-unused-vars
    for (const [_, number] of Object.entries(colorCount)) {
      console.log(number);
      if (number === 3) return true;
    }
    return false;
  };

  const submitCards = () => {
    let correct = true;
    const color = wordsToColors[selectedWords[0]];
    for (const word of selectedWords) {
      if (wordsToColors[word] !== color) {
        correct = false;
        setNumMistakes(numMistakes - 1);
        break;
      }
    }
    // one away
    if (oneAway()) {
      console.log('one away');
      alert('one away!');
    }
    // they guessed right, remove correct words
    if (correct) {
      setCorrectColors([...correctColors, color]);
      setWordArray(wordArray.filter((word) => wordsToColors[word] !== color));
      setSelectedWords([]);
    }
    console.log(correctColors, wordArray.length);
  };

  return (
    <div className="grid-container">
      {renderCategories}
      <div className="card-container">
        {renderCards}
      </div>
      <p>mistakes: {numMistakes}</p>
      <button type="button" className="button" onClick={() => submitCards()}>submit</button>
      <button type="button" className="button" onClick={() => setEditMode(true)}>edit</button>
    </div>
  );
}

export default Play;
