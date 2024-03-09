import React from "react";
import { useSpring, animated } from "react-spring";
import "./tarjetaAlimento.css";

function capitalizedCase(str) {
  if (typeof str !== "string" || str.length === 0) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const TarjetaAlimento = ({ food, onCardClick }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const cardAnimation = useSpring({
    transform: `scale(${isExpanded ? 1.05 : 1})`,
    margin: isExpanded ? "20px 0" : "10px 0",
  });

  const detailsAnimation = useSpring({
    opacity: isExpanded ? 1 : 0,
    height: isExpanded ? "auto" : 0,
  });

  const handleClick = () => {
    setIsExpanded(!isExpanded);
    onCardClick(food);
  };

  return (
    <animated.div
      className="food-card"
      style={cardAnimation}
      onClick={handleClick}
    >
      <div className="food-info">
        <h3>{capitalizedCase(food.name)}</h3>
        <p>
          <strong>Quantity:</strong> {food.quantity} grams
        </p>
        <p>
          <strong>Calories:</strong> {food.calories}
        </p>
      </div>
      {isExpanded && (
        <animated.div className="details-container" style={detailsAnimation}>
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
        </animated.div>
      )}
    </animated.div>
  );
};

export default TarjetaAlimento;
