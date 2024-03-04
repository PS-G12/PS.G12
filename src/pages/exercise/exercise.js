import React from 'react';
import { useLocation } from 'react-router-dom';
import './exercise.css'; 

const ExercisePage = () => {
    const location = useLocation();
    const hash = location.hash.substring(1); 
    const decodedHash = decodeURIComponent(hash);
    const exercise = JSON.parse(decodedHash);


  

  return (
    <div className="container">
      <h1>Exercise Details</h1>
      <div className="exercise-details">
        <h2>Name: <span>{exercise.name}</span></h2>
        <p><strong>Body Part:</strong> <span>{exercise.bodyPart}</span></p>
        <p><strong>Equipment:</strong> <span>{exercise.equipment}</span></p>
        <p><strong>Target:</strong> <span>{exercise.target}</span></p>
        <p><strong>Secondary Muscles:</strong> <span>{exercise.secondaryMuscles.join(', ')}</span></p>
        <img src={require(`../../gifs/${exercise.id}.gif`)} alt={exercise.name} />
        <div className="instructions">
          <h3>Instructions:</h3>
          <ul>
            {exercise.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExercisePage;