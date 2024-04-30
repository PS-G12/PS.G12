import React from "react";
import "./starsRating.css";

const StarRatingComponent = ({ rate, type }) => {
  const rating = Math.round(parseFloat(rate) * 4) / 4;
  let ratingClass = "c-rating c-rating--regular";
  let wrap = null;

  // Determina la clase CSS según el tipo de rating
  if (type === "small") {
    ratingClass = "c-rating c-rating--small";
    wrap = " small";
  } else if (type === "big") {
    ratingClass = "c-rating c-rating--big";
  }

  return (
    <div className={"wrapper" + wrap}>
      <div className="rating-holder">
        <div className={ratingClass} data-rating-value={rating >= 0 && rating <= 5 ? rating : 0}>
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>4</button>
          <button>5</button>
        </div>
      </div>
    </div>
  );
};

export default StarRatingComponent;
