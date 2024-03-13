import React from "react";
import "./foodCard.css";

function capitalizedCase(str) {
  if (typeof str !== "string" || str.length === 0) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const FoodCard = ({ selectedItem: food, quantity}) => {

  return (
    <div
      className="food-card"
    >
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
          <em>
            <strong>Serving Size:</strong> {food.serving_size_g} g
          </em>
          <em>
            <strong>Total Fat:</strong> {food.fat_total_g} g
          </em>
          <em>
            <strong>Saturated Fat:</strong> {food.fat_saturated_g} g
          </em>
          <em>
            <strong>Protein:</strong> {food.protein_g} g
          </em>
          <em>
            <strong>Sodium:</strong> {food.sodium_mg} mg
          </em>
          <em>
            <strong>Potassium:</strong> {food.potassium_mg} mg
          </em>
          <em>
            <strong>Cholesterol:</strong> {food.cholesterol_mg} mg
          </em>
          <em>
            <strong>Carbohydrates:</strong> {food.carbohydrates_total_g} g
          </em>
          <em>
            <strong>Dietary Fiber:</strong> {food.fiber_g} g
          </em>
          <em>
            <strong>Sugar:</strong> {food.sugar_g} g
          </em>
        </div>
    </div>
  );
};

export default FoodCard;
