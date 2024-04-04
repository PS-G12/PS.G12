import React from 'react';
import './filterCard.css'
const FilterCard = ({ bodyParts, handleFilterChange }) => {
  return (
    <div className="filter-card">
      <h3>Filter By Body Part:</h3>
      {bodyParts.map((part, index) => (
        <div key={index} className="checkbox-container">
          <input
            type="checkbox"
            id={part}
            name={part}
            value={part}
            onChange={handleFilterChange}
          />
          <label htmlFor={part}>{part}</label>
        </div>
      ))}
    </div>
  );
};

export default FilterCard;