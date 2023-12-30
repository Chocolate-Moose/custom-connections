import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import Create from './components/CreateScreen';
import Play from './components/GameScreen';

function App() {
  // {yellow: [word1, word2, word3, word4], green: [word1]...}
  // const [words, setWords] = useState({
  //   yellow: [], green: [], blue: [], purple: [],
  // });
  const [wordsToColors, setWordsToColors] = useState({});
  const [wordArray, setWordArray] = useState([]);
  const [editMode, setEditMode] = useState(true);
  // const [categoryTitles, setCategoryTitles] = useState({
  //   yellow: '', green: '', blue: '', purple: '',
  // });
  // todo: remove testing words at some point

  const [categoryTitles, setCategoryTitles] = useState({
    yellow: 'yellow', green: 'green', blue: 'blue', purple: 'purple',
  });
  const [words, setWords] = useState({
    yellow: ['y1', 'y2', 'y3', 'y4'], green: ['g1', 'g2', 'g3', 'g4'], blue: ['b1', 'b2', 'b3', 'b4'], purple: ['p1', 'p2', 'p3', 'p4'],
  });

  // const shuffled = useMemo(() => wordArray
  //   .map((word) => ({ word, sort: Math.random() }))
  //   .sort((a, b) => a.sort - b.sort)
  //   .map(({ word }) => word), [wordArray]);

  const shuffled = useMemo(
    () => wordArray
      .map((word) => ({ word, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort),
    [wordArray],
  );

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
