import React, { useState, useEffect } from "react";
import Header from "../../components/Header/header";
import SearchBar from "../../components/SearchBar/searchBar";
import ExerciseCard from "../../components/ExerciseCard/exerciseCard";
import Footer from "../../components/Footer/footer";
import "./routines.css";

const ExercisePage = () => {
  const [exerciseDataState, setExerciseDataState] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [bodyPart, setBodyPart] = useState('');
  const [limit, setLimit] = useState(25);

  useEffect(() => {
    fetchExercises();
  }, [searchTerm, bodyPart, limit]);

  const fetchExercises = () => {
    setLoading(true);
    let url = '/api/exercises?';
    if (searchTerm) {
      url += `search=${searchTerm}&`;
    }
    if (bodyPart) {
      url += `bodyPart=${bodyPart}&`;
    }
    url += `limit=${limit}`;
    
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setExerciseDataState(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching exercises:', error);
        setLoading(false);
      });
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleBodyPartChange = (part) => {
    setBodyPart(part);
  };

  const handleLimitChange = (value) => {
    setLimit(value);
  };

  const bodyParts = [
    'chest',
    'upper legs',
    'lower arms',
    'neck',
    'shoulders',
    'upper arms',
    'lower legs',
    'waist',
    'back',
    'cardio'
  ];

  return (
    <div className="exercise-page">
      <Header />
      <SearchBar onSearch={handleSearch} />
      {loading ? (
        <span class="loader"></span>
      ) : (
        <div className="exercise-list">
          {bodyParts.map((bodyPart) => (
            <div key={bodyPart} className={`${bodyPart}-excercises`}>
              <h1>{bodyPart.toUpperCase()} EXERCISES</h1>
              {exerciseDataState && (
                <ExerciseCard
                  exercise={exerciseDataState}
                  bodyPartChoosen={bodyPart}
                  limite={limit}
                />
              )}
            </div>
          ))}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ExercisePage;
