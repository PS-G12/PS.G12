import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import ExerciseCard from "../../components/ExerciseCard/exerciseCard";
import FilterCard from "../../components/FilterCard/filterCard";
import "./searchResults.css";
import SearchBar from "../../components/SearchBar/searchBar";
import Header from "../../components/Header/header";

function SearchResultsPage() {
  const location = useLocation();
  const { search } = queryString.parse(location.search);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [exercisesPerPage, setExercisesPerPage] = useState(24);
  const [pagesToShow] = useState(5);

  useEffect(() => {
    setLoading(true);

    caches.open("exerciseCache").then((cache) => {
      cache
        .match(
          `/api/exercises?search=${search}&page=${currentPage}&perPage=${exercisesPerPage}`
        )
        .then((cachedResponse) => {
          if (cachedResponse && 0) {
            cachedResponse.json().then((data) => {
              setFilteredExercises(data.results);
              setTotalPages(data.totalPages);
              setLoading(false);
            });
          } else {
            fetch(
              `/api/exercises?search=${search}&page=${currentPage}&perPage=${exercisesPerPage}`
            )
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Network response was not ok");
                }
                return response.json();
              })
              .then((data) => {
                cache.put(
                  `/api/exercises?search=${search}&page=${currentPage}&perPage=${exercisesPerPage}`,
                  new Response(JSON.stringify(data))
                );
                setFilteredExercises(data.results);
                setTotalPages(data.totalPages);
                setLoading(false);
              })
              .catch((error) => {
                console.error("Error fetching exercises data:", error);
                setLoading(false);
              });
          }
        });
    });
  }, [search, currentPage, exercisesPerPage]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const paging = (pageNumber) => setCurrentPage(pageNumber);

  const handleExercisesPerPageChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1 && value <= 100) {
      setExercisesPerPage(value);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [exercisesPerPage]);


  const bodyParts = ['waist', 'chest', 'lower legs', 'lower arms', 'neck', 'shoulders', 'upper arms', 'upper legs', 'back', 'cardio'];


  const [selectedBodyParts, setSelectedBodyParts] = useState([]);


  const handleFilterChange = (event) => {
    const { value } = event.target;
    setSelectedBodyParts(prevSelected => {
      console.log(value);
      if (prevSelected.includes(value)) {
        return prevSelected.filter(part => part !== value);
      } else {
        return [...prevSelected, value];
      }
    });
  };
  

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
      <div className="exercise-container">
        <details className="custom-select">
          <summary className="radios">
            <input
              type="radio"
              name="item"
              id="default"
              title="Tarjetas por página..."
              checked
            />
            <ul className="list">
              <li>
                <label htmlFor="item1">
                  <input
                    type="radio"
                    name="item"
                    id="item1"
                    value="10"
                    onChange={handleExercisesPerPageChange}
                  />
                  10
                  <span></span>
                </label>
              </li>
              <li>
                <label htmlFor="item2">
                  <input
                    type="radio"
                    name="item"
                    id="item2"
                    value="20"
                    onChange={handleExercisesPerPageChange}
                  />
                  20
                </label>
              </li>
              <li>
                <label htmlFor="item3">
                  <input
                    type="radio"
                    name="item"
                    id="item3"
                    value="50"
                    onChange={handleExercisesPerPageChange}
                  />
                  50
                </label>
              </li>
            </ul>
          </summary>
        </details>
      </div>  
      {loading ? (
        <div className="loader-container">
          <span className="loader"></span>
        </div>
      ) : (
        <div className="result">
          <div className="filter-container">
            <FilterCard bodyParts={bodyParts} handleFilterChange={handleFilterChange} />
          </div>
          <div className="exercise-container">
            <ExerciseCard exercise={filteredExercises} name="name" bodyPartList={selectedBodyParts} />
          </div>
        </div>
      )}
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
          <li
            key={startPage + index}
            className={`page-item ${
              currentPage === startPage + index ? "active" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => paging(startPage + index)}
            >
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
