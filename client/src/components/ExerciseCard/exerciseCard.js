import React from "react";
import "./exerciseCard.css";
import { useNavigate } from "react-router-dom";
import StarRatingComponent from "../StarsRating/starsRating";

const ExerciseCard = ({
  exercise,
  bodyPartChoosen,
  bodyPartList,
  name,
  limite,
}) => {
  const navigate = useNavigate();
  const getColorForBodyPart = (part) => {
    switch (part) {
      case "waist":
        return "#ff6347"; //Red
      case "chest":
        return "#6495ED"; //Steel blue
      case "lower legs":
        return "#8A2BE2"; //Dark violet blue
      case "lower arms":
        return "#FFD700"; //Gold
      case "neck":
        return "#00BFFF"; //Turquoise blue
      case "shoulders":
        return "#FFA07A"; //Light salmon
      case "upper arms":
        return "#FF69B4"; //Light pink
      case "upper legs":
        return "#4682B4"; //Light blue
      case "back":
        return "#228B22"; //Forest green
      case "cardio":
        return "#FF4500"; //Redish orange
      default:
        return "#ccc"; //Gray
    }
  };

  let filteredExercises = exercise;
  if (!name && !bodyPartList) {
    filteredExercises = exercise
      .filter((item) => item.bodyPart === bodyPartChoosen)
      .slice(0, limite);
  }

  if (bodyPartList && bodyPartList.length > 0) {
    let tempFilteredExercises = [];
    bodyPartList.forEach((bodyPart) => {
      const filteredByBodyPart = exercise
        .filter((item) => item.bodyPart === bodyPart)
        .slice(0, limite);
      tempFilteredExercises = tempFilteredExercises.concat(filteredByBodyPart);
    });

    filteredExercises = tempFilteredExercises;
  }

  const openExerciseWindow = (exercise) => {
    const serializedExercise = JSON.stringify(exercise);
    navigate({
      pathname: "/exercise",
      hash: `#${encodeURIComponent(serializedExercise)}`,
    });
  };

  return (
    <div className="excercise-row">
      {filteredExercises.map((exercise, index) => (
        <a
          className="exercise-link"
          key={index}
          onClick={() => openExerciseWindow(exercise)}
        >
          <div className="excercise-card">
            <img src={`/gifs/${exercise.id}.gif`} alt={exercise.name} />
            <div className="body-parts">
              <span
                className="body-part-tag"
                style={{
                  backgroundColor: getColorForBodyPart(exercise.bodyPart),
                }}
              >
                {exercise.bodyPart}
              </span>
            </div>
            <div className="h2-card-excercise">
              <h2>{exercise.name}</h2>
            </div>
            <StarRatingComponent
              globalrate={exercise.rating}
              type={"small"}
              link={exercise.id}
            ></StarRatingComponent>
          </div>
        </a>
      ))}
    </div>
  );
};

export default ExerciseCard;
