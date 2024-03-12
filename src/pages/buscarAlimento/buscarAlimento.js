import React, { useState } from "react";
import fetchFood from "../../api/fetchFood.js";
import Header from "../../components/Header/header";
import { useLocation } from "react-router-dom";
import "./buscarAlimento.css";
import AñadirAlimento from "../../components/AñadirAlimento/añadirAlimento";
import FoodCard from "../../components/FoodCard/foodCard";
import Footer from "../../components/Footer/footer";

const FoodSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const location = useLocation();
  const tipo = new URLSearchParams(location.search).get("tipo");

  const handleSearch = () => {
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

  return (
    <div className="buscarAlimento-box">
      <Header />
      <h1>Añadir alimento a {tipo}</h1>
      <div className="searchbar-container">
        <input
          className="form-search-input"
          type="text"
          placeholder="Introduce la búsqueda"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>

      {searchResult && (
        <div className="result-container-food">
          <div className="table-container-food">
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Calorías</th>
                </tr>
              </thead>
              <tbody>
                {searchResult.items ? (
                  searchResult.items.map((item, index) => (
                    <tr
                      key={index}
                      onClick={() => handleRowClick(item)}
                      className={selectedItem === item ? "selected-row" : ""}
                    >
                      <td>{item.name}</td>
                      <td>{item.calories}</td>
                    </tr>
                  ))
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
            <div className="search-result">
              {searchResult && (
                <div className="result-container-">
                  <FoodCard
                    selectedItem={selectedItem}
                    quantity={100}
                    // setQuantity={setQuantity}
                  />

                  {!searchResult.items ||
                    (searchResult.items.length === 0 && (
                      <p>No se encontraron resultados.</p>
                    ))}
                </div>
              )}
            </div>
          )}

          {!searchResult.items ||
            (searchResult.items.length === 0 && (
              <p>No se encontraron resultados.</p>
            ))}
        </div>
      )}

      <AñadirAlimento />
      <Footer />
    </div>
  );
};

export default FoodSearch;
