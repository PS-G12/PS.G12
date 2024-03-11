/* import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import exerciseData from '../../api/exercise_data_en.json'; 
import ExerciseCard from '../../components/ExerciseCard/tarjetaEjercicio';
import './resultadosBusqueda.css'; 
import SearchBar from '../../components/SearchBar/buscador';
import Header from '../../components/Header/header';

function SearchResultsPage() {
  const location = useLocation();
  const { search } = queryString.parse(location.search); 
  const [searchTerm, setSearchTerm] = useState('');

  const [exerciseDataState, setExerciseDataState] = useState(null);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [exercisesPerPage] = useState(20); 
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setExerciseDataState(exerciseData);
  }, []); 

  useEffect(() => {
    if (exerciseDataState) {

      const filtered = exerciseDataState.filter(exercise =>
        exercise.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
      );
      setFilteredExercises(filtered);
      
    }
  }, [search, exerciseDataState]);

  useEffect(() => {
    setCurrentPage(1); // Resetear a la primera página cuando cambie la búsqueda
  }, [search]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Calcular índices de ejercicios para la página actual
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = filteredExercises.slice(indexOfFirstExercise, indexOfLastExercise);
  const paging = pageNumber => setCurrentPage(pageNumber);


  return (
  <div>
    <div>
      <Header />
      <SearchBar onSearch={handleSearch} />
      <div className = "result">
        <ExerciseCard exercise={filteredExercises} name="name" limiteInferior={indexOfFirstExercise} limiteSuperior={indexOfLastExercise} />
      </div>

      <ul className="pagination">
        
        {Array.from({ length: Math.ceil(filteredExercises.length / exercisesPerPage) }, (_, index) => (
          <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
            <button onClick={() => paging(index + 1)} className="page-link">
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
  );
}

export default SearchResultsPage; */


import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import exerciseData from '../../api/exercise_data_en.json';
import ExerciseCard from '../../components/ExerciseCard/exerciseCard';
import './searchResults.css';
import SearchBar from '../../components/SearchBar/searchBar';
import Header from '../../components/Header/header';

function SearchResultsPage() {
  const location = useLocation();
  const { search } = queryString.parse(location.search);
  const [searchTerm, setSearchTerm] = useState('');

  const [exerciseDataState, setExerciseDataState] = useState(null);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [exercisesPerPage] = useState(24);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesToShow, setPagesToShow] = useState(5); 

  useEffect(() => {
    setExerciseDataState(exerciseData);
  }, []);

  useEffect(() => {
    if (exerciseDataState) {
      const filtered = exerciseDataState.filter(exercise => exercise.name.toLowerCase().indexOf(search.toLowerCase()) !== -1);
      setFilteredExercises(filtered);
    }
  }, [search, exerciseDataState]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const handleSearch = term => {
    setSearchTerm(term);
  };

  const paging = pageNumber => setCurrentPage(pageNumber);

  
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = filteredExercises.slice(indexOfFirstExercise, indexOfLastExercise);


  const totalPages = Math.ceil(filteredExercises.length / exercisesPerPage);

 
  let startPage, endPage;
  if (totalPages <= pagesToShow) {
    startPage = 1;
    endPage = totalPages;
  } else {
    const halfPagesToShow = Math.floor(pagesToShow / 2);
    if (currentPage <= halfPagesToShow) {
      startPage = 1;
      endPage = pagesToShow;
    } else if (currentPage + halfPagesToShow >= totalPages) {
      startPage = totalPages - pagesToShow + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - halfPagesToShow;
      endPage = currentPage + halfPagesToShow;
    }
  }

  return (
    <div>
      <Header />
      <SearchBar onSearch={handleSearch} />
      <div className="result">
        <ExerciseCard exercise={currentExercises} name="name" />
      </div>
      <ul className="pagination">
        {currentPage !== 1 && (
          <li className="page-item">
            <button className="page-link" onClick={() => paging(1)}>
              First
            </button>
          </li>
        )}
        {startPage > 1 && (
          <li className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        )}
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
          <li key={startPage + index} className={`page-item ${currentPage === startPage + index ? 'active' : ''}`}>
            <button className="page-link" onClick={() => paging(startPage + index)}>
              {startPage + index}
            </button>
          </li>
        ))}
        {endPage < totalPages && (
          <li className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        )}
        {currentPage !== totalPages && (
          <li className="page-item">
            <button className="page-link" onClick={() => paging(totalPages)}>
              Last
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}

export default SearchResultsPage;
