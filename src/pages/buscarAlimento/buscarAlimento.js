import React, { useState } from "react";
import fetchFood from "../../api/fetchFood.js";
import Header from "../../components/Header/header";
import "./buscarAlimento.css";
import { Link, useNavigate, useLocation } from 'react-router-dom';

const FoodSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(100);
  const [savedMessage, setSavedMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const tipo = location.pathname.split('/').pop();
  const handleSearch = () => {
    fetchFood(searchQuery)
      .then((result) => {
        console.log('El resultado para la búsqueda "' + searchQuery + '" es:');
        console.log(result);
        setSearchResult(result);
        setSelectedItem(null);
      })
      .catch((error) => {
        console.error("Error:", error.message);
        setSearchResult(null);
        setSelectedItem(null);
      });
  };

  const handleRowClick = (item) => {
    setSelectedItem(item);
  };

  const handleAddToMeal = () => {
    // Verifica si se ha seleccionado un alimento
    if (!selectedItem) {
      console.error("No se ha seleccionado ningún alimento.");
      return;
    }

    // Crear un objeto que represente el alimento con sus detalles y tipo de comida
    const nuevoAlimento = {
      tipoComida: tipo,
      nombre: selectedItem.name,
      calorias: selectedItem.calories,
      cantidad: quantity,
      // Agrega otras propiedades según sea necesario
    };

    // Obtén los alimentos existentes del localStorage
    const alimentosGuardados = JSON.parse(localStorage.getItem("alimentos")) || [];

    // Agrega el nuevo alimento a la lista
    const nuevosAlimentos = [...alimentosGuardados, nuevoAlimento];

    // Almacena la lista actualizada en localStorage
    localStorage.setItem("alimentos", JSON.stringify(nuevosAlimentos));

    // Muestra el mensaje de éxito
    setSavedMessage("Alimento guardado correctamente.");

    // Reinicia los estados para la próxima búsqueda
    setSearchQuery("");
    setSearchResult(null);
    setSelectedItem(null);
    setQuantity(100);
  };

  

  return (
    <div className="buscarAlimento-box">
      <Header />
      <h1>Añadir alimento a {tipo}</h1>
      <div className="searchbar-container">
        <input
          type="text"
          placeholder="Introduce la búsqueda"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>

      <div className="search-result">
        {searchResult ? (
          <div className="result-container">
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Calorías</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResult.items.map((item, index) => (
                    <tr
                      key={index}
                      onClick={() => handleRowClick(item)}
                      className={selectedItem === item ? "selected-row" : ""}
                    >
                      <td>{item.name}</td>
                      <td>{item.calories}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {selectedItem && (
              <div className="details-container">
                <h2>Detalles de {selectedItem.name}:</h2>
                <p>
                  <strong>Calorías:</strong> {selectedItem.calories}
                </p>
                <p>
                  <strong>Tamaño de porción:</strong>{" "}
                  {selectedItem.serving_size_g} g
                </p>
                <p>
                  Cantidad:{" "}
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />{" "}
                  gramos
                </p>
                <button onClick={handleAddToMeal}>Añadir al desayuno</button>
                {savedMessage && <p>{savedMessage}</p>}
              </div>
            )}

            {searchResult.items.length === 0 && (
              <p>No se encontraron resultados.</p>
            )}
          </div>
        ) : null}
      </div>

      <Link to="/registroComidas">
        <button>Ir a Registro de Comidas</button>
      </Link>
    </div>
  );
};

export default FoodSearch;
