import React from 'react';
import '../styles/CreateScreen.css';

function Create({
  words, setWords, setEditMode, setWordsToColors, setWordArray,
}) {
//   const [isValidInput, setIsValidInput] = useState(false);

  const categories = ['yellow', 'green', 'blue', 'purple'];

  //   const checkIsValidInput = () => {
  //     const isValid = Object.values(words);
  //     console.log(isValid);

  //     setIsValidInput(false);
  //   };

  const handleInputChange = (e) => {
    setWords({ ...words, [e.name]: e.value.split(',') });
    // checkIsValidInput();
  };

  const handleSubmit = () => {
    setEditMode(false);
    const newObj = {};
    const newArray = [];
    for (const [color, wordArray] of Object.entries(words)) {
      for (const word of wordArray) {
        newObj[word.trim()] = color;
        newArray.push(word.trim());
      }
    }
    setWordsToColors(newObj);
    console.log('wordarray', newArray);
    console.log(newObj);
    setWordArray(newArray);
  };

  return (
    <div className="input-container">
      <p>enter 4 words for each category, separated by commas</p>
      {categories.map((category) => {
        return (
          // eslint-disable-next-line jsx-a11y/label-has-associated-control
          <label key={category}>
            {category}
            <input type="text" name={category} value={words[category]} onChange={(e) => handleInputChange(e.target)} />
          </label>
        );
      })}
      <button type="button" onClick={() => handleSubmit()}>submit</button>
    </div>
  );
}

export default Create;
