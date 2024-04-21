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
    carbohydrates_total_g: "Carbohydrates total (g)",
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

  const getLocalData = (foodData) => {
    let existingData = JSON.parse(localStorage.getItem("foodData"));
    if (!existingData) {
      existingData = [];
    }

    // Convertir foodData a un objeto
    const newFoodData = { ...foodData };

    const newData = [...existingData, newFoodData];
    localStorage.setItem("foodData", JSON.stringify(newData));

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!foodData.name.trim() || !foodData.calories.trim()) {
      alert("Name and calories are required fields");
      return;
    }
    const token = sessionStorage.getItem("token");
    if (!token) {
      setIsLoggedIn(false);
    }
    console.log(isLoggedIn ? "Is logged in" : "Not logged in");
    if (isLoggedIn) {
      try {
        const response = await fetch("/user/data/add-food", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ foodData: foodData }),
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
          console.log("llegue dos");
          getLocalData([foodData]);
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
    } else {
      console.log("entre");
      getLocalData([foodData]);
    }
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
                <label htmlFor={param}>
                  {capitalizedCase(param)}
                  {param === "name" || param === "calories" ? "*" : ""}:
                </label>
                <input
                  type="text"
                  id={param}
                  value={foodData[param]}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>
          <p className="required-text">* Required fields</p>
          <button type="submit" className="submit-food">
            Add Food
          </button>
        </form>
      )}
    </div>
  );
};

export default AddFood;
