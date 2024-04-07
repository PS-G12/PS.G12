import React, { useState } from "react";
import "./BMIcalculator.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMale, faWeight } from "@fortawesome/free-solid-svg-icons";

const BMICalculator = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [resultBMI, setBMI] = useState("");
  const [system, setSystem] = useState("metric");
  const [heightError, setHeightError] = useState("");
  const [weightError, setWeightError] = useState("");

  const handleChange = (setter, setError) => (event) => {
    setter(event.target.value);
    setError(""); // Clear error when input value changes
  };

  function validateValues(height, weight) {
    let valid = true;

    if (isNaN(height)) {
      setHeightError("Please make sure that the height field is a number.");
      valid = false;
    } else if (height <= 0) {
      setHeightError("Please introduce a value greater than zero for the height field.");
      valid = false;
    } else {
      setHeightError("");
    }

    if (isNaN(weight)) {
      setWeightError("Please make sure that the weight field is a number.");
      valid = false;
    } else if (weight <= 0) {
      setWeightError("Please introduce a value greater than zero for the weight field.");
      valid = false;
    } else {
      setWeightError("");
    }

    return valid;
  }

  const calculateBMI = () => {
    const heightUser = parseFloat(height.replace(",", "."));
    const weightUser = parseFloat(weight.replace(",", "."));

    if (!validateValues(heightUser, weightUser)) {
      return;
    }

    let resultado;
    if (system === "imperial") {
      resultado = (weightUser * 0.453592) / (heightUser * 0.3048) ** 2;
    } else {
      resultado = weightUser / (heightUser / 100) ** 2;
    }

    setBMI(resultado.toFixed(2));
  };

  const renderMeasurementCheckbox = (value, text) => (
    <div className="checkbox-wrapper-18">
      <div className="round-bmi">
        <input
          type="checkbox"
          id={`checkbox-${value}`}
          value={value}
          onChange={(event) => setSystem(event.target.value)}
          checked={system === value}
        />
        <label htmlFor={`checkbox-${value}`}></label>
        <p>{text}</p>
      </div>
    </div>
  );

  const renderForm = (label, icon, placeholder, value, onChange, error) => (
    <div className={`height-input ${error ? "error" : ""}`}>
      <form className="height">
        <label className="height-info">{label}</label>
      </form>
      <FontAwesomeIcon icon={icon} className="height-icon" />
      <input
        type="text"
        placeholder={placeholder}
        className="height-input"
        name={label}
        value={value}
        onChange={onChange}
        required
      ></input>
      {error && (
        <p className="errorBMI">
          <i className="error-icon fas fa-exclamation-circle"></i>
          {error}
        </p>
      )}
    </div>
  );

  return (
    <div className="BMI-calculator">
      <div className="BMI-container">
        <h1>BODY MASS INDEX (BMI)</h1>
        <p className="data1">Calculate your BMI</p>
        <div className="system-input">
          <span className="data2">Choose a measurement system:</span>
          <div className="measurement-selection-bmi">
            {renderMeasurementCheckbox("imperial", "Imperial System")}
            {renderMeasurementCheckbox("metric", "Metric System")}
          </div>
        </div>
        {renderForm(
          system === "imperial" ? "HEIGHT (in feet):" : "HEIGHT (in cm):",
          faMale,
          "Height",
          height,
          handleChange(setHeight, setHeightError),
          heightError
        )}
        {renderForm(
          system === "imperial" ? "Weight (in pounds):" : "WEIGHT (in kilograms):",
          faWeight,
          "Weight",
          weight,
          handleChange(setWeight, setWeightError),
          weightError
        )}
        <button className="button-calculator" onClick={calculateBMI}>
          Calculate
        </button>
        <div className="result-calc">
          <span>The BMI corresponding to the indicated height and weight is:</span>
          <div className="result-BMI">{resultBMI}</div>
        </div>
        <div className="result-container"></div>
      </div>
    </div>
  );
};

export default BMICalculator;
