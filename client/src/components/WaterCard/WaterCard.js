import React, { useState, useEffect, useRef } from "react";
import "./WaterCard.css";

const WaterGlass = ({ waterCount, waterGoal }) => {
  const [currentWaterCount, setCurrentWaterCount] = useState(0);
  const waterRef = useRef(null);

  useEffect(() => {
    const waterElement = waterRef.current;
    let porcent = (waterCount / waterGoal) * 100;
    if (porcent <= 14 && porcent > 5) porcent += 10;
    if (porcent > 100) porcent = 100;
    const waterCC = (porcent * -5) + 365;
    const calculatedTop = `${waterCC}px`;

    const maxAnimationValue = (porcent * 10) / 100;

    const animateWater = () => {
      const animation = waterElement.animate(
        [
          { right: "0", top: "400px" },
          { right: "3400px", top: calculatedTop },
        ],
        {
          duration: 1750,
          fill: "forwards",
        }
      );
      return () => {
        animation.cancel();
      };
    };

    animateWater();

    const interval = setInterval(() => {
      if (currentWaterCount < waterCount) {
        setCurrentWaterCount(prevCount => prevCount < maxAnimationValue ? prevCount + 0.1 : prevCount);

      } 
    }, 1);

    return () => clearInterval(interval);
  }, [waterCount]);

  

  return (
    <div className="glass-ctr">
      <div className="glass"></div>
        <div className="water-text">{Math.round(waterCount)} ml</div>
      <div className="water-ctr">
        <div ref={waterRef} className="water"></div>
      </div>
    </div>
  );
};

export default WaterGlass;
