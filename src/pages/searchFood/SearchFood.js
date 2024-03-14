import React, { useState } from "react";
import fetchFood from "../../api/fetchFood.js";
import Header from "../../components/Header/header.js";
import { useLocation } from "react-router-dom";
import "./SearchFood.css";
import AddFood from "../../components/AddFood/addFood.js";
import FoodCard from "../../components/FoodCard/foodCard.js";
import Footer from "../../components/Footer/footer.js";

const FoodSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const location = useLocation();
  const tipo = new URLSearchParams(location.search).get("tipo");

  const handleSearch = () => {
    const searchQueryNormalized = searchQuery.trim().toLowerCase();

    const alimentosGuardados =
    JSON.parse(localStorage.getItem("foodData")) || [];
    const encontrado = alimentosGuardados.find(
      (items) => items.name === searchQueryNormalized
    );

    if (encontrado && encontrado.name) {
      setSearchResult(encontrado);
      setSelectedItem(null);
      return;
    }

    fetchFood(searchQuery)
      .then((result) => {
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
    <div className="searchFood-box">
      <Header />
      <h1>Añadir alimento a {tipo}</h1>
      <div className="searchbar-container">
        <input
          className="form-search-input"
          type="text"
          placeholder="Intoduce the food you're looking for"
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
                  <th>Name</th>
                  <th>Calories</th>
                </tr>
              </thead>
              <tbody>
                {searchResult.items ? (
                  searchResult.items.map((item, index) => (
                    <tr
                      key={index}
                      onClick={() => handleRowClick(item)}
                      className={selectedItem === item ? "selected-row" : index}
                    >
                      <td>{item.name}</td>
                      <td>{item.calories}</td>
                    </tr>
                  ))
                ) : searchResult ? (
                  <tr
              key={1}
              onClick={() => handleRowClick(searchResult)}
              className="selected-row"
            >
              <td>{searchResult.name}</td>
              <td>{searchResult.calories}</td>
            </tr>
                ) : (
                  <tr>
                    <td colSpan="2">There were no results.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {selectedItem && (
            <div className="search-result-containter">
              {searchResult && (
                <div className="result-container-food-details">
                  <FoodCard
                    selectedItem={selectedItem}
                    quantity={100}
                    // setQuantity={setQuantity}
                  />

                  {!searchResult.items ||
                    (searchResult.items.length === 0 && (
                      <p>There were no results.</p>
                    ))}
                </div>
              )}
            </div>
          )}

          {!searchResult.items ||
            (searchResult.items.length === 0 && (
              <p>There were no results.</p>
            ))}
        </div>
      )}

      <AddFood />
      <Footer />
    </div>
  );
};

export default FoodSearch;
