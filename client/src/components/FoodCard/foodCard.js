import React from "react";
import "./foodCard.css";

function capitalizedCase(str) {
  if (typeof str !== "string" || str.length === 0) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function renderFoodDetail(label, value) {
  return (
    <em>
      <strong>{label}:</strong> {value}
    </em>
  );
}

function FoodCard({ selectedItem: food, quantity }) {
  return (
    <div className="food-card">
      <div className="food-info">
        <h3>{capitalizedCase(food.name)}</h3>
        <p>
          <strong>Quantity:</strong> {quantity} grams
        </p>
        <p>
          <strong>Calories:</strong> {food.calories}
        </p>
      </div>
      <div className="details-container-food">
        {renderFoodDetail("Serving Size", `${food.serving_size_g}g\n`)}
        {renderFoodDetail("Total Fat", `${food.fat_total_g}g\n`)}
        {renderFoodDetail("Saturated Fat", `${food.fat_saturated_g}g\n`)}
        {renderFoodDetail("Protein", `${food.protein_g}g\n`)}
        {renderFoodDetail("Sodium", `${food.sodium_mg}mg\n`)}
        {renderFoodDetail("Potassium", `${food.potassium_mg}mg\n`)}
        {renderFoodDetail("Cholesterol", `${food.cholesterol_mg}mg\n`)}
        {renderFoodDetail("Carbohydrates", `${food.carbohydrates_total_g}g\n`)}
        {renderFoodDetail("Dietary Fiber", `${food.fiber_g}g\n`)}
        {renderFoodDetail("Sugar", `${food.sugar_g}g\n`)}
      </div>
    </div>
  );
}

export default FoodCard
