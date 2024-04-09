import React, { useState, useEffect } from 'react';
import './filterCard.css';

const FilterCard = ({ bodyParts, handleFilterChange, selectedBox }) => {
  const [selectedBodyParts, setSelectedBodyParts] = useState([]);

  useEffect(() => {
    setSelectedBodyParts(selectedBox);
  }, []);

  const handleChange = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      setSelectedBodyParts([...selectedBodyParts, value]);
    } else {
      setSelectedBodyParts(selectedBodyParts.filter(part => part !== value));
    }
  };

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
            onChange={handleChange}
            checked={selectedBodyParts.includes(part)}
          />
          <label htmlFor={part}>{part}</label>
        </div>
      ))}
      <button onClick={() => handleFilterChange(selectedBodyParts)}>Apply Filter</button>
    </div>
  );
};

export default FilterCard;
