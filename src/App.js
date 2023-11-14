import React, { useState } from 'react';
import Header from './components/Header';
import Create from './components/CreateScreen';
import Play from './components/GameScreen';

function App() {
  // {yellow: [word1, word2, word3, word4], green: [word1]...}
  const [words, setWords] = useState({
    yellow: [], green: [], blue: [], purple: [],
  });
  const [wordsToColors, setWordsToColors] = useState({});
  const [wordArray, setWordArray] = useState([]);
  const [editMode, setEditMode] = useState(true);
  const [categoryTitles, setCategoryTitles] = useState({
    yellow: '', green: '', blue: '', purple: '',
  });

  const shuffled = wordArray
    .map((word) => ({ word, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ word }) => word);

  return (
    <div>
      <Header />
      {editMode
        ? (
          <Create
            words={words}
            setWords={setWords}
            setEditMode={setEditMode}
            setWordsToColors={setWordsToColors}
            setWordArray={setWordArray}
            categoryTitles={categoryTitles}
            setCategoryTitles={setCategoryTitles}
          />
        )
        : (
          <Play
            words={words}
            setEditMode={setEditMode}
            wordsToColors={wordsToColors}
            wordArray={wordArray}
            shuffled={shuffled}
            setWordArray={setWordArray}
            categoryTitles={categoryTitles}
          />
        )}
    </div>

  );
}

export default App;
