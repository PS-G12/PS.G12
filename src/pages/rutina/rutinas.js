import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/header';
import Buscador from '../../components/Buscador/buscador';
import TarjetaEjercicio from '../../components/TarjetaEjercicio/tarjetaEjercicio';
import exerciseData from '../../api/exercise_data.json'; 
import './rutinas.css'; 

const ExercisePage = () => {
  const [exerciseDataState, setExerciseDataState] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredExercises, setFilteredExercises] = useState([]);

  useEffect(() => {
    setExerciseDataState(exerciseData);
  }, []); 

  const bodyParts = [
    'chest',
    'lower legs',
    'lower arms',
    'neck',
    'shoulders',
    'upper arms',
    'upper legs',
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
      <Buscador onSearch={handleSearch} />
      
      {bodyParts.map(bodyPart => (
        <div key={bodyPart} className={`${bodyPart}-excercises`}>
          <h1>Ejercicios de {bodyPart}</h1>
          {exerciseDataState && <TarjetaEjercicio exercise={exerciseDataState} bodyPartChoosen={bodyPart} limite={5} />}
        </div>
      ))}
    </div>
  );
};

export default ExercisePage;