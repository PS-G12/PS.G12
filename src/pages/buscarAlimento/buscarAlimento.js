import React, { useState, useEffect } from "react";
import fetchFood from "../../api/fetchFood.js";
import Header from "../../components/Header/header";
import Footer from "../../components/Footer/footer";
import TarjetaAlimento from "../../components/TarjetaAlimento/tarjetaAlimento";
import "./buscarAlimento.css";

const BuscarAlimento = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(100);
  const [savedMessage, setSavedMessage] = useState("");
  const [meal, setMeal] = useState([]);

  const handleSearch = () => {
    fetchFood(searchQuery)
      .then((result) => {
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
      console.error("No food selected.");
      return;
    }

    const newFood = {
      name: selectedItem.name,
      calories: selectedItem.calories,
      serving_size_g: selectedItem.serving_size_g,
      fat_total_g: selectedItem.fat_total_g || 0,
      fat_saturated_g: selectedItem.fat_saturated_g || 0,
      protein_g: selectedItem.protein_g || 0,
      sodium_mg: selectedItem.sodium_mg || 0,
      potassium_mg: selectedItem.potassium_mg || 0,
      cholesterol_mg: selectedItem.cholesterol_mg || 0,
      carbohydrates_total_g: selectedItem.carbohydrates_total_g || 0,
      fiber_g: selectedItem.fiber_g || 0,
      sugar_g: selectedItem.sugar_g || 0,
      quantity: quantity,
    };

    const storedFoods = JSON.parse(localStorage.getItem("foods")) || [];

    const newFoods = [...storedFoods, newFood];

    localStorage.setItem("foods", JSON.stringify(newFoods));

    setSavedMessage("Food saved successfully.");

    setSearchQuery("");
    setSearchResult(null);
    setSelectedItem(null);
    setQuantity(100);
    setMeal(newFoods);
  };

  const handleCardClick = (item) => {
    setSelectedItem(item);
  };

  const handleClearAll = () => {
    localStorage.removeItem("foods");
    setMeal([]);
  };

  const showMeals = (list) => {
    return (
      <div className="mealLog-box">
        {list.map((food, index) => (
          <TarjetaAlimento key={index} food={food} onCardClick={handleCardClick} />
        ))}
      </div>
    );
  };

  useEffect(() => {
    const storedFoods = JSON.parse(localStorage.getItem("foods")) || [];
    setMeal(storedFoods);
  }, []);

  return (
    <div className="foodSearch-box">
      <Header />
      <h1>Add Food</h1>
      <div className="searchbar-container">
        <input
          type="text"
          placeholder="Enter your search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="search-result">
        {searchResult && (
          <div className="result-container">
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Calories</th>
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
                <h2>Details of {selectedItem.name}:</h2>
                <p>
                  <strong>Calories:</strong> {selectedItem.calories}
                </p>
                <p>
                  <strong>Serving Size:</strong> {selectedItem.serving_size_g} g
                </p>
                <p>
                  Quantity:{" "}
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />{" "}
                  grams
                </p>
                <button onClick={handleAddToMeal}>Add to Meal Log</button>
                {savedMessage && <p>{savedMessage}</p>}
              </div>
            )}

            {searchResult.items.length === 0 && <p>No results found.</p>}
          </div>
        )}
      </div>

      <div className="mealLog-container">
        <h1 id="list-h1">Meal Log List</h1>
        {showMeals(meal)}
      </div>
      <button className="button-clear-all" onClick={handleClearAll}>Clear All</button>
      <Footer />
    </div>
  );
};

export default BuscarAlimento;
