import React, { useState } from "react";
import "./addFood.css";

function capitalizedCase(key) {
  //Maps the keys to the desired phrases
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
    sugar_g: "Sugar (g)"
  };

  if (key in conversions) {
    return conversions[key];
  }

  return capitalizedCase(key);
}


const AddFood = () => {
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
    
    //Using localStorage to store food data
    const existingData = JSON.parse(localStorage.getItem("foodData")) || { items: [] };
    var newData = null;
    if (existingData) newData = [...existingData.items, foodData]; else newData = {"items":[foodData]};
    console.log(newData); 
    localStorage.setItem("foodData", JSON.stringify(newData));

    //Reseting the entries of the form
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

    //Closing the window
    handleToggleForm();
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
                  required
                />
              </div>
            ))}
          </div>
          <button type="submit" className="submit-food">Add Food</button>
        </form>
      )}
    </div>
  );
};

export default AddFood;
