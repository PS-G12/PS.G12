import React from 'react';
import './tarjetaEjercicio.css';
import { useNavigate } from 'react-router-dom';

const TarjetaEjercicio = ({ exercise, bodyPartChoosen, limite, name}) => {
  const navigate = useNavigate();
  const getColorForBodyPart = (part) => {
    switch (part) {
      case 'waist':
        return '#ff6347'; // Rojo
      case 'chest':
        return '#6495ED'; // Azul acero
      case 'lower legs':
        return '#8A2BE2'; // Azul violeta oscuro
      case 'lower arms':
        return '#FFD700'; // Dorado
      case 'neck':
        return '#00BFFF'; // Azul turquesa
      case 'shoulders':
        return '#FFA07A'; // Salmón claro
      case 'upper arms':
        return '#FF69B4'; // Rosa claro
      case 'upper legs':
        return '#4682B4'; // Azul acero
      case 'back':
        return '#228B22'; // Verde bosque
      case 'cardio':
        return '#FF4500'; // Naranja rojizo
      default:
        return '#ccc'; // Gris por defecto
    }
  };

  let filteredExercises = exercise;

  if (!name) {
    filteredExercises = exercise.filter(item => item.bodyPart === bodyPartChoosen).slice(0, limite);
  }

  const openExerciseWindow = (exercise) => {
    const serializedExercise = JSON.stringify(exercise);
    navigate({
      pathname: '/exercise',
      hash: `#${encodeURIComponent(serializedExercise)}`
      
    });
  };

  return (
    <div className="excercise-row">
      {filteredExercises.map((exercise, index) => (
        <a className="exercise-link" key={index} onClick={() => openExerciseWindow(exercise)}>
          <div className="excercise-card">
            <img src={require(`../../gifs/${exercise.id}.gif`)} alt={exercise.name} />
            <div className="body-parts">
              <span className="body-part-tag" style={{ backgroundColor: getColorForBodyPart(exercise.bodyPart) }}>{exercise.bodyPart}</span>
            </div>
            <h2>{exercise.name}</h2>
          </div>
        </a>
      ))}
    </div>
  );
};

export default TarjetaEjercicio;
