import React, { useState, useEffect } from 'react';
import TarjetaEjercicio from '../components/TarjetaEjercicio/tarjetaEjercicio';
import exerciseData from '../api/exercise_data.json'; 

const ExercisePage = () => {
  const [exerciseDataState, setExerciseDataState] = useState(null);

  useEffect(() => {
    setExerciseDataState(exerciseData);
  }, []); 

  return (
    <div className="exercise-page">
      <h1>Exercise Details</h1>
      {/* Paso 4: Renderizar la tarjeta de ejercicio si los datos están disponibles */}
      {exerciseDataState && <TarjetaEjercicio exercise={exerciseDataState} />}
    </div>
  );
};

export default ExercisePage;