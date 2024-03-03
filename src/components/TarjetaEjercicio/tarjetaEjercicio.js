import React from 'react';

const tarjetaEjercicio = ({ exercise }) => {
  var nombre = exercise[1].name;
  var id = exercise[1].id;
  var gif = `${id}.gif`;

  return (
    <div className="exercise-card">
      <img src={require(`../../gifs/${gif}`)} alt={nombre} />
      <h2>#{id}</h2>
      <h2>{nombre}</h2>
    </div>
  );
};

export default tarjetaEjercicio;
