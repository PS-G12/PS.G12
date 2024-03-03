import React from 'react';
import './buscador.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

function Buscador() {
  return (
    <section className="up-header"> 
      <input type="text" className="search-input" placeholder="Realizar búsqueda..." />
      <button className="submit">
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </section>
  );
}

export default Buscador;
