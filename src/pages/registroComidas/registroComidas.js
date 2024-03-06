import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ListadoComidas = () => {
  const [desayuno, setDesayuno] = useState([]);
  const [almuerzo, setAlmuerzo] = useState([]);
  const [cena, setCena] = useState([]);
  const [aperitivos, setAperitivos] = useState([]);

  // Recuperar datos almacenados en el localStorage cuando el componente se monta
  useEffect(() => {
    const storedAlimentos = JSON.parse(localStorage.getItem("alimentos")) || [];
    console.log(JSON.stringify(storedAlimentos));
    console.log("Prueba los alimentos");

    // Filtra los alimentos por tipo de comida
    const desayunoData = storedAlimentos.filter((alimento) => alimento.tipoComida === "desayuno");
    const almuerzoData = storedAlimentos.filter((alimento) => alimento.tipoComida === "almuerzo");
    const cenaData = storedAlimentos.filter((alimento) => alimento.tipoComida === "cena");
    const aperitivosData = storedAlimentos.filter((alimento) => alimento.tipoComida === "aperitivos");

    setDesayuno(desayunoData);
    setAlmuerzo(almuerzoData);
    setCena(cenaData);
    setAperitivos(aperitivosData);
  }, []);

  // Función para mostrar comidas en la lista
  const mostrarComidasEnLista = (tipo, lista) => {
    return (
      <div>
        <h2>{tipo}</h2>
        <ul>
          {lista.map((comida, index) => (
            <li key={index}>
              {comida.nombre} - {comida.cantidad} gramos
            </li>
          ))}
        </ul>
        <Link to={`/buscarAlimento?tipo=${tipo.toLowerCase()}`}>
          <button>Añadir Alimento</button>
        </Link>
      </div>
    );
  };

  return (
    <div>
      <h1>Listado de Comidas</h1>
      {mostrarComidasEnLista("Desayuno", desayuno)}
      {mostrarComidasEnLista("Almuerzo", almuerzo)}
      {mostrarComidasEnLista("Cena", cena)}
      {mostrarComidasEnLista("Aperitivos", aperitivos)}
    </div>
  );
};

export default ListadoComidas;
