import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './exercise.css'; 
import BodyPart from '../../components/BodyPart/bodyPart';

const ExercisePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const hash = location.hash.substring(1); 
    const decodedHash = decodeURIComponent(hash);
    const exercise = JSON.parse(decodedHash);


    const handleGoBack = () => {
      navigate(-1);
    };
  

  return (
    <div className="container">

      <div className="exercise-details">
        <div className="img-name">
          <h1><span>{exercise.name.toUpperCase()}</span></h1>
          <img src={require(`../../gifs/${exercise.id}.gif`)} alt={exercise.name} />
        </div>

        <div className="separator"></div>
        <div className="instructions">
          <h2>Instrucciones:</h2>
          <ul>
            {exercise.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ul>
        </div>
        <div className="separator"></div>

        <div className="images">
          <BodyPart label="Parte del Cuerpo" src={exercise.bodyPart} imageName={`bodyParts/${exercise.bodyPart}`} altText={exercise.bodyPart} />
          <BodyPart label="Equipo" src={exercise.equipment} imageName={`equipment/${exercise.equipment}`} altText={exercise.equipment} />
          <BodyPart label="Objetivo" src={exercise.target} imageName={`targets/${exercise.target}`} altText={exercise.target} />
        </div>

        <div className="separator"></div>

        <div className="button-container">
          <button onClick={handleGoBack}>Volver</button>
        </div>
        
      </div>
    </div>
  );
};

export default ExercisePage;