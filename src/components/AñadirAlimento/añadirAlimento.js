import React, { useState } from "react";
import "./añadirAlimento.css";

function capitalizedCase(str) {
  if (typeof str !== "string" || str.length === 0) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

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
    console.log("New Food Data:", foodData);

    // Guardar en localStorage
    const existingData = JSON.parse(localStorage.getItem("foodData")) || [];
    const newData = [...existingData, foodData];
    localStorage.setItem("foodData", JSON.stringify(newData));

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

    // Cerrar la pestaña (cambia esto según la lógica de tu aplicación)
    handleToggleForm(); // Use handleToggleForm instead of handleChange
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

export default AñadirAlimento;
