import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './buscador.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

function Buscador() {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/resultados?busqueda=${encodeURIComponent(searchValue)}`);
  };

  return (
    <form className="up-header" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-input"
        placeholder="Realizar búsqueda..."
        value={searchValue}
        onChange={handleChange}
      />
      <button type="submit" className="submit">
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </form>
  );
}

export default Buscador;
