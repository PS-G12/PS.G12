import React, { useState } from "react";
import "./starsRating.css";

const StarRatingComponent = ({ rate, globalrate, type }) => {
  const [userRate, setUserRate] = useState(rate); // Estado para la valoración del usuario

  const rating = Math.round(parseFloat(userRate) * 4) / 4;
  const globalRating = globalrate ? Math.round(parseFloat(globalrate) * 4) / 4 : 0;
  let ratingClass = "c-rating c-rating--regular";
  let wrap = null;

  // Determina la clase CSS según el tipo de rating
  if (type === "small") {
    ratingClass = "c-rating c-rating--small";
    wrap = " small";
  } else if (type === "big") {
    ratingClass = "c-rating c-rating--big";
  }

  // Función para manejar el clic en un botón de estrella
  const handleStarClick = (value) => {
    if (type === "big") {
      setUserRate(value); // Actualiza el estado solo si el tipo es "big"
    }
  };

  return (
    <div className={"wrapper" + wrap}>
      {type === "small" ? (
        <div className="rating-holder">
          <div className={ratingClass} data-rating-value={rating >= 0 && rating <= 5 ? rating : 0}>
            {/* Botones de estrellas */}
            {[1, 2, 3, 4, 5].map((val) => (
              <button key={val} onClick={() => handleStarClick(val)}>
                {val}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="rating-holder">
          <div className={"c-rating c-rating--small master"} data-rating-value={globalRating >= 0 && globalRating <= 5 ? globalRating : 0}>
            {/* Botones de estrellas */}
            {[1, 2, 3, 4, 5].map((val) => (
              <button key={val} onClick={() => handleStarClick(val)}>
                {val}
              </button>
            ))}
          </div>
          <div className={ratingClass} data-rating-value={rating >= 0 && rating <= 5 ? rating : 0}>
            {/* Botones de estrellas */}
            {[1, 2, 3, 4, 5].map((val) => (
              <button key={val} onClick={() => handleStarClick(val)}>
                {val}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StarRatingComponent;
