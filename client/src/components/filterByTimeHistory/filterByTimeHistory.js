import React, { useState } from 'react';
import './filterByTimeHistory.css';

const FilterByTimeHistory = ({ onFilterChange }) => {
  const [selectedFilter, setSelectedFilter] = useState('week');

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    onFilterChange(filter);
  };

  return (
    <div className="filters-container">
      <button
        className={`filter-button ${selectedFilter === 'week' ? 'active' : ''}`}
        onClick={() => handleFilterChange('week')}
      >
        Week
      </button>
      <button
        className={`filter-button ${selectedFilter === 'month' ? 'active' : ''}`}
        onClick={() => handleFilterChange('month')}
      >
        Month
      </button>
      <button
        className={`filter-button ${selectedFilter === 'year' ? 'active' : ''}`}
        onClick={() => handleFilterChange('year')}
      >
        Year
      </button>
    </div>
  );
};

export default FilterByTimeHistory;
