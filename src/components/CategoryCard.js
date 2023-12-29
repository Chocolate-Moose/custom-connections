import React from 'react';
import '../styles/CategoryCard.css';
import '../styles/Common.css';

function CategoryCard({
  category, words, title,
}) {
  console.log(category);
  return (
    <div className={`container ${category}`}>
      <div><strong>{title}</strong></div>
      <div>{words.join(', ')}</div>
    </div>
  );
}

export default CategoryCard;
