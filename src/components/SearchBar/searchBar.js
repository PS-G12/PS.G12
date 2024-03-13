import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './searchBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

function SearchBar() {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/results?search=${encodeURIComponent(searchValue)}`);
  };

  return (
    <form className="up-header" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-input"
        placeholder="Search..."
        value={searchValue}
        onChange={handleChange}
      />
      <button type="submit" className="submit">
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </form>
  );
}

export default SearchBar;
