import React, { useState, useEffect } from "react";
import "./starsRating.css";

const StarRatingComponent = ({ rate, globalrate, type }) => {
  const [userRate, setUserRate] = useState(rate);
  const [exerciseId, setExerciseId] = useState(null);
  const [globalRate, setGlobalRate] = useState(globalrate);
  const rating = Math.round(parseFloat(userRate) * 4) / 4;
  const globalRating = globalRate ? Math.round(parseFloat(globalRate) * 4) / 4 : 0;
  let ratingClass = "c-rating c-rating--regular";
  let wrap = null;

  useEffect(() => {
    const url = window.location.href; 
    const exerciseIdFromLink = getExerciseIdFromLink(url); 
    setExerciseId(exerciseIdFromLink); 

    if (exerciseIdFromLink) {
      //console.log("exerciseId " + exerciseId + " type " + type + " rate " + rate + " globalrating " + globalrate);
      const token = sessionStorage.getItem("token");
      if (token && exerciseIdFromLink) {
        fetch(`/user/rate?exerciseId=${exerciseIdFromLink}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("User data not available");
            }
          })
          .then((data) => {
            setUserRate(data.userRate); 
            setGlobalRate(data.globalRate); 
          })
          
          .catch((error) => {
            console.error("Error retrieving user rate:", error);
          });
      }
    }
  }, []); 

  const getExerciseIdFromLink = (exerciseId) => {
    const url = new URL(exerciseId);
    const hash = url.hash.substr(1);
    const exercise = hash? JSON.parse(decodeURIComponent(hash)) : null;
    return exercise? exercise.id: null;
  };

  
  if (type === "small") {
    ratingClass = "c-rating c-rating--small";
    wrap = " small";
  } else if (type === "big") {
    ratingClass = "c-rating c-rating--big";
  }
  //console.log("exerciseId " + exerciseId + " type " + type + " rate " + rate + " globalrating " + globalRating);

  
  const handleStarClick = (value) => {
    if (type === "big") {
      const token = sessionStorage.getItem("token");
      if (token) {
        fetch("/user/rate", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ exerciseId, rating: value }),
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Failed to add rate");
            }
          })
          .then((data) => {
            setUserRate(value);
            setGlobalRate(data.globalRate);
          })
          .catch((error) => {
            console.error("Error adding rate:", error);
          });
      }
    }
  };
  

  return (
    <div className={"wrapper" + wrap}>
      {type === "small" ? (
        <div className="rating-holder">
          <div className={ratingClass} data-rating-value={globalRating >= 0 && globalRating <= 5 ? globalRating : 0}>
            {[1, 2, 3, 4, 5].map((val) => (
              <button key={val}>
                {val}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="rating-holder">
  {/* Global Rate */}
  <div>
    <h3><i className="fas fa-globe"></i> Global Rate</h3>
    <div className={"c-rating c-rating--small master"} data-rating-value={globalRating >= 0 && globalRating <= 5 ? globalRating : 0}>
      {[1, 2, 3, 4, 5].map((val) => (
        <button key={val}>
          {val}
        </button>
      ))}
    </div>
  </div>
  {/* User Rating */}
  <div className="fas-fa-user">
    <h3><i className="fas fa-user"></i> User Rating</h3>
    <div className={ratingClass} data-rating-value={rating >= 0 && rating <= 5 ? rating : 0}>
      {/* Estrellas de calificación */}
      {[1, 2, 3, 4, 5].map((val) => (
        <button key={val} onClick={() => handleStarClick(val)}>
          {val}
        </button>
      ))}
    </div>
  </div>
</div>


      )}
    </div>
  );
};

export default StarRatingComponent;
