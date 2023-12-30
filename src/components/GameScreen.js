import React, { useState } from 'react';
import Rodal from 'rodal';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Card from './Card';
import CategoryCard from './CategoryCard';

import 'rodal/lib/rodal.css';
import '../styles/GameScreen.css';
import '../styles/Common.css';

const COLOR_EMOJIS = {
  yellow: '🟨', green: '🟩', blue: '🟦', purple: '🟪',
};

function Play({
  words, setEditMode, wordsToColors, wordArray, shuffled, setWordArray, categoryTitles,
}) {
  const [selectedWords, setSelectedWords] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [numMistakes, setNumMistakes] = useState(4);
  const [correctColors, setCorrectColors] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [guessGrid, setGuessGrid] = useState([]);
  const [guessString, setGuessString] = useState('');

  const renderCards = shuffled.map((word) => {
    return <Card word={word} isSelected={selectedWords.includes(word)} setSelectedWords={setSelectedWords} selectedWords={selectedWords} />;
  });

  const renderCategories = correctColors.map((category) => {
    return <CategoryCard category={category} words={words[category]} title={categoryTitles[category]} />;
  });

  const renderGuessGrid = guessGrid.map((guess) => {
    return (
      <div className="guess-row">
        {guess.map((color) => {
          return <div className={`guess-box ${color}`} />;
        })}
      </div>
    );
  });

  const renderMistakeDots = Array.from(Array(numMistakes), (_, i) => {
    return <div className="mistake-dot" />;
  });

  const oneAway = () => {
    const colorCount = {
      yellow: 0, green: 0, blue: 0, purple: 0,
    };
    for (const word of selectedWords) {
      colorCount[wordsToColors[word]] += 1;
    }
    // eslint-disable-next-line no-unused-vars
    for (const [_, number] of Object.entries(colorCount)) {
      if (number === 3) return true;
    }
    return false;
  };

  const makeGuessString = () => {
    let str = 'Custom Connections\nPuzzle #17\n';
    for (const guess of guessGrid) {
      for (const color of guess) {
        str += COLOR_EMOJIS[color];
      }
      str += '\n';
    }
    setGuessString(str);
  };

  const submitCards = () => {
    let correct = true;
    // get colors guessed
    const colorsGuessed = selectedWords.map((word) => wordsToColors[word]);

    // add guess to color grid
    setGuessGrid([...guessGrid, colorsGuessed]);
    console.log(guessGrid);

    // not all one category
    for (const color of colorsGuessed) {
      if (color !== colorsGuessed[0]) {
        correct = false;
        setNumMistakes(numMistakes - 1);
        break;
      }
    }
    // one away
    if (oneAway()) {
      alert('one away!');
    }
    // they guessed right, remove correct words
    if (correct) {
      setCorrectColors([...correctColors, colorsGuessed[0]]);
      setWordArray(wordArray.filter((word) => wordsToColors[word] !== colorsGuessed[0]));
      setSelectedWords([]);
    }
    // game over
    // num mistakes depends on component not rerendering, weird logic here
    if (wordArray.length === 0 || numMistakes <= 1) {
      setModalOpen(true);
      makeGuessString();
    }
  };

  return (
    <div>
      <div className="grid-container">
        {renderCategories}
        <div className="card-container">
          {renderCards}
        </div>
        <div className="mistakes-container">
          <p>mistakes remaining: </p>
          {renderMistakeDots}
        </div>

        <button type="button" className={`button ${selectedWords.length !== 4 ? 'submit-disabled' : 'submit-active'}`} disabled={selectedWords.length !== 4} onClick={() => submitCards()}>
          submit
        </button>
        <button type="button" className="button" onClick={() => setEditMode(true)}>edit</button>
      </div>
      <div>
        <Rodal visible={modalOpen} onClose={() => setModalOpen(false)} animation="slideUp">
          {/* change this based on number of guesses left */}
          <div>Perfect!</div>
          <div>Custom Connections #17</div>
          {renderGuessGrid}
          <CopyToClipboard text={guessString}>
            <button type="button">share your results</button>
          </CopyToClipboard>
        </Rodal>
      </div>
    </div>

  );
}

export default Play;
