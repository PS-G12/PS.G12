import { useLocation, useNavigate } from 'react-router-dom';
import './exercise.css'; 
import React, { useState, useEffect } from "react";

import BodyPart from '../../components/BodyPart/bodyPart';
import ExerciseCard from "../../components/ExerciseCard/exerciseCard";
import StarRatingComponent from "../../components/StarsRating/starsRating";

const ExercisePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hash = location.hash.substring(1); 
  const decodedHash = decodeURIComponent(hash);
  const exercise = JSON.parse(decodedHash);
  const bodyPart = exercise.bodyPart;
  const [loading, setLoading] = useState(false);
  const [filteredExercises, setFilteredExercises] = useState([]);


  useEffect(() => {
    setLoading(true);
    caches.open("exerciseCache").then((cache) => {
      cache
        .match(
          `/api/exercises?bodyPart=`
        )
        .then(() => {
          fetch(
            `/api/exercises?bodyPart=${bodyPart}`
          )
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              return response.json();
            })
            .then((data) => {
              cache.put(
                `/api/exercises?bodyPart=${bodyPart}`,
                new Response(JSON.stringify(data))
              );
              setFilteredExercises(data.samples[bodyPart].slice(-3));
              setLoading(false);
            })
            .catch((error) => {
              console.error("Error fetching exercises data:", error);
              setLoading(false);
            });

        });
    });

  }, [bodyPart]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const renderBodyPart = (label, src, imageName) => (
    <BodyPart label={label} src={src} imageName={`${imageName}/${src}`} altText={src} />
  );
  
  return (
    <div className="container">

      <div className="exercise-details">
        <div className="img-name">
          <h1><span>{exercise.name.toUpperCase()}</span></h1>
          <img src={`/gifs/${exercise.id}.gif`} alt={exercise.name} />
        </div>
        <StarRatingComponent rating={0} type="big"></StarRatingComponent>
        <div className="separator"></div>
        <div className="instructions">
          <h2>Instructions:</h2>
          <ul>
            {exercise.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ul>
        </div>
        <div className="separator"></div>

        <div className="images">
          {renderBodyPart("Body Part", exercise.bodyPart, "bodyParts")}
          {renderBodyPart("Equipment", exercise.equipment, "equipment")}
          {renderBodyPart("Target", exercise.target, "targets")}
        </div>

        <div className="separator"></div>

          <div className="relatedExercises">
            <h2 id="related-exercises-h2">Related Exercises:</h2>
            <ExerciseCard exercise={filteredExercises} name="name"/>
          </div>

        <div className="separator"></div>

        <div className="button-container">
          <button onClick={handleGoBack}>Go Back</button>
        </div>
        
      </div>
    </div>
  );
};

export default ExercisePage;