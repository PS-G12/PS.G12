import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import ExerciseCard from '../../components/ExerciseCard/exerciseCard';
import './searchResults.css';
import SearchBar from '../../components/SearchBar/searchBar';
import Header from '../../components/Header/header';

function SearchResultsPage() {
  const location = useLocation();
  const { search } = queryString.parse(location.search);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [exercisesPerPage] = useState(24);
  const [pagesToShow] = useState(5); 

   useEffect(() => {
    setLoading(true);

    // Intentar recuperar los datos de la caché
    caches.open('exerciseCache').then(cache => {
      cache.match(`/api/exercises?search=${search}&page=${currentPage}&perPage=${exercisesPerPage}`).then(cachedResponse => {
        if (cachedResponse) {
          cachedResponse.json().then(data => {
            setFilteredExercises(data.results);
            setTotalPages(data.totalPages);
            setLoading(false);
          });
        } else {
          fetch(`/api/exercises?search=${search}&page=${currentPage}&perPage=${exercisesPerPage}`)
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then(data => {
              cache.put(`/api/exercises?search=${search}&page=${currentPage}&perPage=${exercisesPerPage}`, new Response(JSON.stringify(data)));
              setFilteredExercises(data.results);
              setTotalPages(data.totalPages);
              setLoading(false);
            })
            .catch(error => {
              console.error('Error fetching exercises data:', error);
              setLoading(false);
            });
        }
      });
    });
  }, [search, currentPage, exercisesPerPage]);


  const handleSearch = term => {
    setSearchTerm(term);
  };

  const paging = pageNumber => setCurrentPage(pageNumber);

  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = filteredExercises.slice(indexOfFirstExercise, indexOfLastExercise);

 
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
