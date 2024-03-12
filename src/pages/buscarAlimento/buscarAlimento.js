import React, { useState } from "react";
import fetchFood from "../../api/fetchFood.js";
import Header from "../../components/Header/header";
import { useLocation } from "react-router-dom";
import "./buscarAlimento.css";
import AñadirAlimento from "../../components/AñadirAlimento/añadirAlimento";

const FoodSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(100);

  const location = useLocation();
  const tipo = new URLSearchParams(location.search).get("tipo");

  const handleSearch = () => {
    // Verificar si el elemento ya está en localStorage
    const alimentosGuardados =
      JSON.parse(localStorage.getItem("foodData")) || [];

    const searchQueryNormalized = searchQuery.trim().toLowerCase();
    const encontrado = alimentosGuardados.find(
      (item) => item.name === searchQueryNormalized
    );

    if (encontrado) {
      setSearchResult(encontrado);
      setSelectedItem(null);
      return;
    }

    // Si no se encuentra en localStorage, realizar la búsqueda en la API
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
    if (!selectedItem) {
      console.error("No se ha seleccionado ningún alimento.");
      return;
    }

    const nuevoAlimento = {
      tipoComida: tipo,
      nombre: selectedItem.name,
      calorias: selectedItem.calories,
      cantidad: quantity,
    };

    const alimentosGuardados =
      JSON.parse(localStorage.getItem("alimentos")) || [];

    const nuevosAlimentos = [...alimentosGuardados, nuevoAlimento];

    localStorage.setItem("alimentos", JSON.stringify(nuevosAlimentos));

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
                  {searchResult.items ? (
                    searchResult.items.length > 0 ? (
                      searchResult.items.map((item, index) => (
                        <tr
                          key={index}
                          onClick={() => handleRowClick(item)}
                          className={
                            selectedItem === item ? "selected-row" : ""
                          }
                        >
                          <td>{item.name}</td>
                          <td>{item.calories}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="2">No se encontraron resultados.</td>
                      </tr>
                    )
                  ) : searchResult ? (
                    <tr>
                      <td>{searchResult.name}</td>
                      <td>{searchResult.calories}</td>
                    </tr>
                  ) : (
                    <tr>
                      <td colSpan="2">No se encontraron resultados.</td>
                    </tr>
                  )}
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
              </div>
            )}
          </div>
        ) : null}
      </div>

      <AñadirAlimento />
    </div>
  );
};

export default FoodSearch;
