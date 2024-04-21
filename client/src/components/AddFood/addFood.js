import React, { useState } from "react";
import "./addFood.css";

function capitalizedCase(key) {
  const conversions = {
    name: "Name",
    calories: "Calories",
    serving_size_g: "Serving size (g)",
    fat_total_g: "Fat total (g)",
    fat_saturated_g: "Fat saturated (g)",
    protein_g: "Protein (g)",
    sodium_mg: "Sodium (mg)",
    potassium_mg: "Potassium (mg)",
    cholesterol_mg: "Cholesterol (mg)",
    carbohydrates_total_g: "Carbohydrates (g)",
    fiber_g: "Fiber (g)",
    sugar_g: "Sugar (g)",
  };

  if (key in conversions) {
    return conversions[key];
  }

  return capitalizedCase(key);
}

const AddFood = (props) => {
  const [foodData, setFoodData] = useState({
    name: "",
    calories: "",
    serving_size_g: "",
    fat_total_g: "",
    fat_saturated_g: "",
    protein_g: "",
    sodium_mg: "",
    potassium_mg: "",
    cholesterol_mg: "",
    carbohydrates_total_g: "",
    fiber_g: "",
    sugar_g: "",
  });

  const [showForm, setShowForm] = useState(false);
  const [showAddButton, setShowAddButton] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(props.isAuthenticated);
  const [error, setError] = useState("");

  const handleToggleForm = () => {
    setShowForm(!showForm);
    setShowAddButton(!showAddButton);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFoodData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!foodData.name.trim()) {
      setError("Introduce a valid name");
      return;
    } else if (isNaN(parseFloat(foodData.calories.trim()))) {
      setError("Introduce a valid value for calories");
      return;
    }

    setError("");

    sendData();
  };

  const sendData = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      setIsLoggedIn(false);
      return;
    }

    try {
      const response = await fetch("/user/data/add-food", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ foodData }),
      });
      if (response.ok) {
        setFoodData({
          name: "",
          calories: "",
          serving_size_g: "",
          fat_total_g: "",
          fat_saturated_g: "",
          protein_g: "",
          sodium_mg: "",
          potassium_mg: "",
          cholesterol_mg: "",
          carbohydrates_total_g: "",
          fiber_g: "",
          sugar_g: "",
        });
        handleToggleForm();
        return;
      } else if (response.status === 401) {
        getLocalData(foodData);
        setIsLoggedIn(false);
        setFoodData({
          name: "",
          calories: "",
          serving_size_g: "",
          fat_total_g: "",
          fat_saturated_g: "",
          protein_g: "",
          sodium_mg: "",
          potassium_mg: "",
          cholesterol_mg: "",
          carbohydrates_total_g: "",
          fiber_g: "",
          sugar_g: "",
        });
        handleToggleForm();
        throw new Error("User data not available");
      } else {
        throw new Error("User data not available");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setIsLoggedIn(true);
    }
  };

  const getLocalData = (foodData) => {
    let existingData = JSON.parse(localStorage.getItem("foodData"));
    if (!existingData) {
      existingData = [];
    }
  
    const newFoodData = { ...foodData };
  
    const newData = [...existingData, newFoodData];
    localStorage.setItem("foodData", JSON.stringify(newData));
  };

  return (
    <div className="add-food">
      {showAddButton && (
        <button onClick={handleToggleForm}>Add My Own Food</button>
      )}
      {showForm && (
        <form onSubmit={handleSubmit} className="form-add-food">
          <button className="close-button" onClick={handleToggleForm}>
            X
          </button>
          <div className="detail-container-box">
            <h2>Register your food</h2>
            {Object.keys(foodData).map((param) => (
              <div key={param} className="form-row">
                <label htmlFor={param}>{capitalizedCase(param)}:</label>
                <input
                  type="text"
                  id={param}
                  value={foodData[param]}
                  onChange={handleChange}
                />
              </div>
            ))}
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
          <button type="submit" className="submit-food">
            Add Food
          </button>
        </form>
      )}
    </div>
  );
};

export default AddFood;
