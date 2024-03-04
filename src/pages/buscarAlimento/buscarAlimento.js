import React, { useState } from 'react';
import fetchFood from '../../api/fetchFood.js';
import './buscarAlimento.css';

const FoodSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = () => {
    // Call the fetchFood function when a search is performed
    fetchFood(searchQuery)
      .then(result => {
        console.log('El resultado para la búsqueda "' + searchQuery + '" es:');
        console.log(result);
        setSearchResult(result);
      })
      .catch(error => {
        console.error('Error:', error.message);
        setSearchResult(null);
      });
  };

  return (
    <div className="container">
      <h1>Añadir alimento a Desayuno</h1>
      <div className="searchbar-container">
        <input
          type="text"
          placeholder="Introduce la búsqueda"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>

      {searchResult && (
        <div className="search-result">
          <h2>Resultados de la búsqueda:</h2>
          <pre>{JSON.stringify(searchResult, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default FoodSearch;
