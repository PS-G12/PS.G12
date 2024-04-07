import React, { useState, useEffect } from "react";
import "./BMIcalculator.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMale, faWeight } from "@fortawesome/free-solid-svg-icons";

const BMICalculator = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [resultBMI, setBMI] = useState("");
  const [system, setSystem] = useState("metric");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const checkboxes = document.querySelectorAll("input[type=checkbox]");
    checkboxes.forEach((check) =>
      check.addEventListener("change", handleCheckboxChange)
    );
    return () => {
      checkboxes.forEach((check) =>
        check.removeEventListener("change", handleCheckboxChange)
      );
    };
  }, []);

  const handleCheckboxChange = (e) => {
    const marked = e.target.checked;
    const checkboxes = document.querySelectorAll("input[type=checkbox]");
    checkboxes.forEach((check) => (check.checked = false));
    e.target.checked = marked;
  };

  const handleChange = (setter) => (event) => {
    setter(event.target.value);
    // Clear errors when input value changes
    setErrors({
      ...errors,
      [event.target.name]: undefined,
    });
  };

  const typeOfSystem = (event) => {
    setSystem(event.target.value);
  };

  function validateValues(height, weight) {
    const newErrors = {};

    if (isNaN(height) || isNaN(weight)) {
      newErrors.general = "Please make sure that the height and weight fields are numbers.";
    } else if (height <= 0 || weight <= 0) {
      newErrors.general = "Please introduce a greater than zero value for the height and weight fields.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
          onChange={typeOfSystem}
          checked={system === value}
        />
        <label htmlFor={`checkbox-${value}`}></label>
        <p>{text}</p>
      </div>
    </div>
  );

  const renderForm = (label, icon, placeholder, value, onChange, error) => (
    <div className="height-input">
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
        <form className="system-input">
          <span className="data2">Choose a measurement system:</span>
          <div className="measurement-selection-bmi">
            {renderMeasurementCheckbox("imperial", "Imperial System")}
            {renderMeasurementCheckbox("metric", "Metric System")}
          </div>
        </form>
        {renderForm(
          system === "imperial" ? "HEIGHT (in feet):" : "HEIGHT (in cm):",
          faMale,
          "Height",
          height,
          handleChange(setHeight),
          errors["HEIGHT (in feet):"] || errors["HEIGHT (in cm):"] || errors.general
        )}
        {renderForm(
          system === "imperial" ? "Weight (in pounds):" : "WEIGHT (in kilograms):",
          faWeight,
          "Weight",
          weight,
          handleChange(setWeight),
          errors["Weight (in pounds):"] || errors["WEIGHT (in kilograms):"] || errors.general
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
