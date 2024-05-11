import React, { useState } from "react";
import './filterByTimeHistory.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire } from '@fortawesome/free-solid-svg-icons';


const FilterByTimeHistory = ({data, kcalObjective, onFilter}) => {
  const [selectedFilter, setSelectedFilter] = useState('any');
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [isFired, setIsFired] = useState(false);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    applyFilter(filter);
  };

  const handleMonthChange = (e) => {
    const month = parseInt(e.target.value);
    setSelectedMonth(month);
    applyFilter('month', month);
  };

  const handleYearChange = (e) => {
    const year = parseInt(e.target.value);
    setSelectedYear(year);
    applyFilter('year', year);
  };

  const handleFireClick = () => {
    setIsFired(!isFired);
  
    let filteredData = [...data];
  
    if (selectedFilter === 'month') {
      filteredData = filteredData.filter(entry => {
        const formatedDate = new Date(entry.userLastLogin).toLocaleDateString();
        const dateParts = formatedDate.split('/');
        return parseInt(dateParts[1]) === selectedMonth;
      });
    }
  
    if (selectedFilter === 'year') {
      filteredData = filteredData.filter(entry => {
        const formatedDate = new Date(entry.userLastLogin).toLocaleDateString();
        const dateParts = formatedDate.split('/');
        return parseInt(dateParts[2]) === selectedYear;
      });
    }
  
    if (!isFired) {
      filteredData = filteredData.filter(entry => {
        return entry.kcalConsumed > kcalObjective;
      });
    }
  
    onFilter(filteredData);
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, index) => currentYear - index);

  function filterEntries(entry, selectedFilter, selectedValue) {
    if (!selectedValue) return true;
    const formatedDate = new Date(entry.userLastLogin).toLocaleDateString();
    const dateParts = formatedDate.split('/');
    const entryValue = parseInt(dateParts[selectedFilter === 'year' ? 2 : 1]);
  
    return entryValue === selectedValue;
  }

  const getWeekStartEndDates = () => {
    const today = new Date();
    const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    const lastDayOfWeek = new Date(today.setDate(firstDayOfWeek.getDate() + 7));
    return { start: firstDayOfWeek, end: lastDayOfWeek };
  };



  const applyFilter = (filter, value) => {
    const filteredData = data.filter(entry => {
      if (filter === 'week') {
        const { start, end } = getWeekStartEndDates();
        const formatedDate = new Date(entry.userLastLogin).toLocaleDateString();
        const dateParts = formatedDate.split('/');
        const entryDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
        return entryDate >= start && entryDate <= end;
      }

      if (filter === 'month') {
        return filterEntries(entry, 'month', value);
      }
      
      if (filter === 'year') {
        return filterEntries(entry, 'year', value);
      }

      if (filter === 'any') {
        return filterEntries(entry, 'any');
      }
    });
    
    onFilter(filteredData);
  };



  return (
    <div className="filters-container">
      <div className={selectedFilter === 'month' || selectedFilter === 'year' ? "select-container" : ""}>
        {selectedFilter === 'month' && (
          <select value={selectedMonth} onChange={handleMonthChange}>
            <option value={1}>January</option>
            <option value={2}>February</option>
            <option value={3}>March</option>
            <option value={4}>April</option>
            <option value={5}>May</option>
            <option value={6}>June</option>
            <option value={7}>July</option>
            <option value={8}>August</option>
            <option value={9}>September</option>
            <option value={10}>October</option>
            <option value={11}>November</option>
            <option value={12}>December</option>
          </select>
        )}

        {selectedFilter === 'year' && (
          <select value={selectedYear} onChange={handleYearChange}>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        )}
      </div>


      <button
        className={`filter-button ${selectedFilter === 'any' ? 'active' : ''}`}
        onClick={() => handleFilterChange('any')}
      >
        Any
      </button>
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
      <button
        className={`fire-button ${isFired ? 'active' : ''}`}
        onClick={handleFireClick}
      ><FontAwesomeIcon icon={faFire} />
      </button>
    </div>
  );
};

export default FilterByTimeHistory;
