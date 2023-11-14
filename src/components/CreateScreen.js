import React from 'react';
import '../styles/CreateScreen.css';

function Create({
  words, setWords, setEditMode, setWordsToColors, setWordArray, categoryTitles, setCategoryTitles,
}) {
//   const [isValidInput, setIsValidInput] = useState(false);

  const categories = ['yellow', 'green', 'blue', 'purple'];

  //   const checkIsValidInput = () => {
  //     const isValid = Object.values(words);
  //     console.log(isValid);

  //     setIsValidInput(false);
  //   };

  const handleWordsChange = (e) => {
    setWords({ ...words, [e.name]: e.value.split(',') });
    // checkIsValidInput();
  };

  const handleCategoryChange = (e) => {
    setCategoryTitles({ ...categoryTitles, [e.name]: e.value });
  };

  const handleSubmit = () => {
    setEditMode(false);
    const newObj = {};
    const newArray = [];
    for (const [color, wordArray] of Object.entries(words)) {
      for (const word of wordArray) {
        newObj[word.trim().toUpperCase()] = color;
        newArray.push(word.trim().toUpperCase());
      }
    }
    setWordsToColors(newObj);
    setWordArray(newArray);
  };

  const cards = categories.map((category) => {
    return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    // <label key={category}>
    //   {category}
    //   <input type="text" name={category} value={words[category]} onChange={(e) => handleInputChange(e.target)} />
    // </label>
      <tr key={category}>
        <td>{category}</td>
        <td><input label="category" type="text" name={category} value={categoryTitles[category]} onChange={(e) => handleCategoryChange(e.target)} /></td>
        <td><input label="category" type="text" name={category} value={words[category]} onChange={(e) => handleWordsChange(e.target)} /></td>
      </tr>
    );
  });

  return (
    <div className="input-container">
      <p>enter 4 words for each category, separated by commas</p>
      <table className="table">
        <thead className="table-header">
          <tr>
            <th>category color</th>
            <th>category</th>
            <th>words</th>
          </tr>
        </thead>
        <tbody>
          {cards}
        </tbody>
      </table>

      <button type="button" className="button" onClick={() => handleSubmit()}>submit</button>
    </div>
  );
}

export default Create;
