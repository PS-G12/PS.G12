import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/header';
import SearchBar from '../../components/SearchBar/searchBar';
import ExerciseCard from '../../components/ExerciseCard/exerciseCard';
import exerciseData from '../../api/exercise_data_en.json'; 
import './routines.css'; 

const ExercisePage = () => {
  const [exerciseDataState, setExerciseDataState] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredExercises, setFilteredExercises] = useState([]);

  useEffect(() => {
    setExerciseDataState(exerciseData);
  }, []); 

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


  useEffect(() => {
    if (exerciseDataState) {

      const filtered = exerciseDataState.filter(exercise =>
        exercise.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
      );

      setFilteredExercises(filtered);
    }
  }, [searchTerm, exerciseDataState]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="exercise-page">
      <Header />
      <SearchBar onSearch={handleSearch} />
      {bodyParts.map(bodyPart => (
        <div key={bodyPart} className={`${bodyPart}-excercises`}>
          <h1>{bodyPart.toUpperCase()} EXERCISES</h1>
          {exerciseDataState && <ExerciseCard exercise={exerciseDataState} bodyPartChoosen={bodyPart} limite={5} />}
        </div>
      ))}
    </div>
  );
};

export default ExercisePage;