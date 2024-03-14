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
          <span>Quantity: </span> {quantity} grams
        </p>
        <p>
          <span>Calories: </span> {food.calories}
        </p>
      </div>
        <div className="details-container-food">
          <em>
            <span>Serving Size:</span> {food.serving_size_g} g
          </em>
          <em>
            <span>Total Fat:</span> {food.fat_total_g} g
          </em>
          <em>
            <span>Saturated Fat:</span> {food.fat_saturated_g} g
          </em>
          <em>
            <span>Protein:</span> {food.protein_g} g
          </em>
          <em>
            <span>Sodium:</span> {food.sodium_mg} mg
          </em>
          <em>
            <span>Potassium:</span> {food.potassium_mg} mg
          </em>
          <em>
            <span>Cholesterol:</span> {food.cholesterol_mg} mg
          </em>
          <em>
            <span>Carbohydrates:</span> {food.carbohydrates_total_g} g
          </em>
          <em>
            <span>Dietary Fiber:</span> {food.fiber_g} g
          </em>
          <em>
            <span>Sugar:</span> {food.sugar_g} g
          </em>
        </div>
    </div>
  );
};

export default FoodCard;
