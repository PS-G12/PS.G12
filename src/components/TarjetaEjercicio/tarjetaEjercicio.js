import React from 'react';
import './tarjetaEjercicio.css';

const TarjetaEjercicio = ({ exercise, bodyPartChoosen, limite, name}) => {
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


  return (
    <div className="excercise-row">
      {filteredExercises.map((exercise, index) => (
        <div className="excercise-card" key={index}>
          <img src={require(`../../gifs/${exercise.id}.gif`)} alt={exercise.name} />
          <div className="body-parts">
            <span className="body-part-tag" style={{ backgroundColor: getColorForBodyPart(exercise.bodyPart) }}>{exercise.bodyPart}</span>
          </div>
          <h2>{exercise.name}</h2>
        </div>
      ))}
    </div>
  );
};

export default TarjetaEjercicio;
