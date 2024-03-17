import React, { useState } from "react";
import "./macrosCalculator.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFire,
  faCheese,
  faBreadSlice,
  faFish,
} from "@fortawesome/free-solid-svg-icons";

function MacrosCalculator() {
  const [system, setSystem] = useState("metric");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("male");
  const [physicalActivity, setPhysicalActivity] = useState("sedentary");
  const [goal, setGoal] = useState("lose-weight");
  const [resultCalories, setCalories] = useState("");
  const [resultProteins, setProteins] = useState("");
  const [resultCarbs, setCarbs] = useState("");
  const [resultFats, setFats] = useState("");

  const handleCheckboxChange = (event) => {
    const { value } = event.target;
    setSystem(value);
  };

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const handleSelectChange = (setter) => (event) => {
    setter(event.target.value);
  };

  function validateValues(age, height, weight) {
    if (isNaN(age) || isNaN(height) || isNaN(weight)) {
      alert(
        "Please, make sure that the age, height and weight fields are numbers."
      );
      return false;
    } else if (age <= 0 || height <= 0 || weight <= 0) {
      alert(
        "Please, introduce a greater than zero value for the age, height and weight fields."
      );
      return false;
    } else if (Number.isInteger(age) === false) {
      alert("Please use a natural number (1-9) for the age value");
      return false;
    } else {
      return true;
    }
  }

  const calculateMacros = (event) => {
    event.preventDefault();

    const sedentaryFactor = 1.2;
    const intermediateFactor = 1.375;
    const intenseFactor = 1.6;

    let ageUser = parseInt(age);
    let heightUser = parseFloat(height.replace(",", "."));
    let weightUser = parseFloat(weight.replace(",", "."));

    if (!validateValues(ageUser, heightUser, weightUser)) {
      return;
    }

    if (system === "imperial") {
      heightUser = heightUser / 0.032808; // Convert feet to centimeters
      weightUser = weightUser / 2.2046; // Convert pounds to kilograms
    }

    const caloriesGoal =
      {
        "gain-weight": 500,
        "lose-weight": -500,
        "maintain-weight": 0,
      }[goal] || 0;

    let BMR;
    if (gender === "male") {
      BMR = 10 * weightUser + 6.25 * heightUser - 5 * age + 5;
    } else {
      BMR = 10 * weightUser + 6.25 * heightUser - 5 * age - 161;
    }

    let physicalActivityFactor;
    switch (physicalActivity) {
      case "sedentary":
        physicalActivityFactor = sedentaryFactor;
        break;
      case "intermediate":
        physicalActivityFactor = intermediateFactor;
        break;
      case "intense":
        physicalActivityFactor = intenseFactor;
        break;
      default:
        physicalActivityFactor = sedentaryFactor;
        break;
    }

    const calories = BMR * physicalActivityFactor + caloriesGoal;
    setCalories(calories.toFixed(2));

    const proteins = (calories * 0.25) / 4;
    setProteins(proteins.toFixed(2));

    const fats = (calories * 0.25) / 9;
    setFats(fats.toFixed(2));

    const carbs = (calories - proteins * 4 - fats * 9) / 4;
    setCarbs(carbs.toFixed(2));
  };

  const renderMeasurementCheckbox = (value, text) => (
    <form className="system-input-bmi">
      <div className="checkbox-wrapper-18" key={value}>
        <div className="round-macro">
          <input
            type="checkbox"
            id={`checkbox-${value}`}
            value={value}
            onChange={handleCheckboxChange}
            checked={system === value}
          />
          <label htmlFor={`checkbox-${value}`}></label>
          <p>{text}</p>
        </div>
      </div>
    </form>
  );

  const inputField = ({
    label,
    value,
    onChange,
    placeholder,
    type = "text",
  }) => (
    <div className={`${label.toLowerCase()}-input`}>
      <div className={label.toLowerCase()}>
        <label className={`${label.toLowerCase()}-info`}>{label}:</label>
        <input
          type={type}
          placeholder={placeholder}
          className={`input-${label.toLowerCase()}`}
          value={value}
          onChange={onChange}
          required
        />
      </div>
    </div>
  );

  function radioButton({ id, value, checked, onChange, label }) {
    return (
      <li>
        <input
          type="radio"
          id={id}
          name="goal"
          value={value}
          checked={checked}
          onChange={onChange}
        />
        <label htmlFor={id}>{label}</label>
      </li>
    );
  }

  const selectField = ({ label, value, onChange, options }) => (
    <div className={`${label.toLowerCase()}-input`}>
      <div className={label.toLowerCase()}>
        <label className={`${label.toLowerCase()}-info`}>{label}:</label>
        <select
          className={`input-${label.toLowerCase()}`}
          value={value}
          onChange={onChange}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  const renderNutrientBox = (icon, label, info, value) => (
    <div className="box">
      <FontAwesomeIcon icon={icon} className={`${label.toLowerCase()}-icon`} />
      <p>{label}</p>
      <p className="info" id={`${label.toLowerCase()}-info`}>
        {value} {info}
      </p>
    </div>
  );

  return (
    <div className="macros-containercalc">
      <h1>MACRONUTRIENTS AND CALORIES</h1>
      <div className="intro">
        <span className="data1">
          Calculate the necessary macronutrients you should consume, based on:
          your height, weight, and goals.
        </span>
        <span className="data2">Choose a unit of measurement:</span>
        <div className="measurement-selection">
          {renderMeasurementCheckbox("imperial", "Imperial System")}
          {renderMeasurementCheckbox("metric", "Metric System")}
        </div>
      </div>
      <form className="form-macros" onSubmit={calculateMacros}>
        <div className="row1">
          {inputField({
            label: "Age",
            value: age,
            onChange: handleInputChange(setAge),
            placeholder: "Age",
          })}
          {selectField({
            label: "Gender",
            value: gender,
            onChange: handleSelectChange(setGender),
            options: [
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
            ],
          })}
          {inputField({
            label: system === "imperial" ? "Height (ft)" : "Height (cm)",
            value: height,
            onChange: handleInputChange(setHeight),
            placeholder: "Height",
          })}
          {inputField({
            label: system === "imperial" ? "Weight (lbs)" : "Weight (kg)",
            value: weight,
            onChange: handleInputChange(setWeight),
            placeholder: "Weight",
          })}
        </div>
        <div className="row2">
          {selectField({
            label: "Physical-Activity",
            value: physicalActivity,
            onChange: handleSelectChange(setPhysicalActivity),
            options: [
              { value: "sedentary", label: "Sedentary" },
              { value: "intermediate", label: "Moderate" },
              { value: "intense", label: "Intense" },
            ],
          })}
          <div className="goal-input">
            <label className="goal-info">{"Goal:"}</label>
            <ul>
              <li>
                {radioButton({
                  id: "lose-weight",
                  value: "lose-weight",
                  checked: goal === "lose-weight",
                  onChange: () => setGoal("lose-weight"),
                  label: "Lose weight",
                })}
              </li>
              <li>
                {radioButton({
                  id: "maintain",
                  value: "maintain",
                  checked: goal === "maintain",
                  onChange: () => setGoal("maintain"),
                  label: "Keep weight",
                })}
              </li>
              <li>
                {radioButton({
                  id: "gain-weight",
                  value: "gain-weight",
                  checked: goal === "gain-weight",
                  onChange: () => setGoal("gain-weight"),
                  label: "Gain weight",
                })}
              </li>
            </ul>
          </div>
        </div>
        <button type="submit" className="calculateMacros">
          Calculate
        </button>
        <div className="result-macros">
          <div className="result-label">The necessary macronutrients are:</div>
          <div className="container-box">
            {renderNutrientBox(
              faFire,
              "Calories",
              "calories per day",
              resultCalories
            )}
            {renderNutrientBox(
              faBreadSlice,
              "Carbs",
              "grams per day",
              resultCarbs
            )}
            {renderNutrientBox(
              faFish,
              "Proteins",
              "grams per day",
              resultProteins
            )}
            {renderNutrientBox(faCheese, "Fats", "grams per day", resultFats)}
          </div>
        </div>
      </form>
    </div>
  );
}

export default MacrosCalculator;
