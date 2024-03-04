import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import exerciseData from '../../api/exercise_data.json'; 
import TarjetaEjercicio from '../../components/TarjetaEjercicio/tarjetaEjercicio';
import './resultadosBusqueda.css'; 
import Buscador from '../../components/Buscador/buscador';
import Header from '../../components/Header/header';

function SearchResultsPage() {
  const location = useLocation();
  const { busqueda } = queryString.parse(location.search); 
  const [searchTerm, setSearchTerm] = useState('');

  const [exerciseDataState, setExerciseDataState] = useState(null);
  const [filteredExercises, setFilteredExercises] = useState([]);

  useEffect(() => {
    setExerciseDataState(exerciseData);
  }, []); 

  useEffect(() => {
    if (exerciseDataState) {

      const filtered = exerciseDataState.filter(exercise =>
        exercise.name.toLowerCase().indexOf(busqueda.toLowerCase()) !== -1
      );
      setFilteredExercises(filtered);
      
    }
  }, [busqueda, exerciseDataState]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };


  return (
  <div>
    <div>
      <Header />
      <Buscador onSearch={handleSearch} />
      <div className = "result">
        <TarjetaEjercicio exercise={filteredExercises} name="name" limite={filteredExercises.length} />
      </div>
    </div>
  </div>
  );
}

export default SearchResultsPage;
