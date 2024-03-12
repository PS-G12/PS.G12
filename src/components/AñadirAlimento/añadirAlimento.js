import React, { useState } from "react";
import "./añadirAlimento.css";

const AñadirAlimento = () => {
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

  const handleToggleForm = () => {
    setShowForm(!showForm);
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
    console.log("New Food Data:", foodData);

    // Guardar en localStorage
    const existingData = JSON.parse(localStorage.getItem('foodData')) || [];
    const newData = [...existingData, foodData];
    localStorage.setItem('foodData', JSON.stringify(newData));

    // Limpiar los datos del formulario
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
  };

  return (
    <div className="add-food">
      <button onClick={handleToggleForm}>Add My Own Food</button>
      {showForm && (
        <form onSubmit={handleSubmit}>
          {Object.keys(foodData).map((param) => (
            <div key={param}>
              <label htmlFor={param}>{param.replace(/_/g, " ")}:</label>
              <input
                type="text"
                id={param}
                value={foodData[param]}
                onChange={handleChange}
                required
              />
            </div>
          ))}
          <button type="submit">Add Food</button>
        </form>
      )}
    </div>
  );
};

export default AñadirAlimento;
