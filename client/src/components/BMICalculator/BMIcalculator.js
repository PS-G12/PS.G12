import React, { useEffect, useState } from "react";
import "./BMIcalculator.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMale, faWeight } from "@fortawesome/free-solid-svg-icons";

const BMICalculator = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [resultBMI, setBMI] = useState("");
  const [system, setSystem] = useState("metric");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState();
  const [defaultValues, setDefaultValues] = useState(false);

  const [heightError, setHeightError] = useState("");
  const [weightError, setWeightError] = useState("");

  const handleChange = (setter, setError) => (event) => {
    setter(event.target.value);
    setError(""); // Clear error when input value changes

  };

  function validateValues(height, weight) {
    let valid = true;

    if (isNaN(height) && defaultValues) {
      setHeightError("Please make sure that the height field is a number.");
      valid = false;
    } else if (height <= 0 && defaultValues) {
      setHeightError("Please introduce a value greater than zero for the height field.");
      valid = false;
    } else {
      setHeightError("");
    }

    if (isNaN(weight) && defaultValues) {
      setWeightError("Please make sure that the weight field is a number.");
      valid = false;
    } else if (weight <= 0 && defaultValues) {
      setWeightError("Please introduce a value greater than zero for the weight field.");
      valid = false;
    } else {
      setWeightError("");
    }

    return valid;
  }

  const calculateBMI = (inputHeight, inputWeight) => {
    if ((inputHeight === null || inputWeight == null) && !defaultValues){
      var heightUser = parseFloat(height.replace(",", "."));
      var weightUser = parseFloat(weight.replace(",", "."));
    }
    else{
      heightUser = parseFloat(inputHeight.replace(",", "."));
      weightUser = parseFloat(inputWeight.replace(",", "."));
    }

    if (!validateValues(heightUser, weightUser)) {
      return;
    }

    let result;
    if (system === "imperial") {
      result = (weightUser * 0.453592) / (heightUser * 0.3048) ** 2;
    }
    else{
      result = weightUser / (heightUser / 100) ** 2;
    }

    setDefaultValues(false);
    setBMI(result.toFixed(2));
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

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      setToken(token);
      fetch('/verify-token', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
      })
      .then(response => {
      if (response.ok) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        console.error('Invalid token');
      }
      })
      .catch(error => {
      console.error('Error verifying token:', error);
      });
    }
    else {
      console.error('Could not find the token, user not authenticated');
    }
  }, []);

  async function getUserWeightHeightAndCalculateBMI() {
    setDefaultValues(true);
    try {
      const response = await fetch("/user/data/weightHeight", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

      const data = await response.json();

      if (response.ok && data.weight && data.height) {
        const { weight, height } = data;
        calculateBMI(height, weight);
        return true;
      }
      else {
        console.error("Error occurred while getting user weight and height");
        return false;
      }
    }
    catch (error) {
      console.error("Error occurred while getting user weight and height:", error);
      return false;
    }
  }

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
        <div className="bmi-calculator-buttons">
          <button className="button-calculator" onClick={calculateBMI}>
            Calculate
          </button>
          {isLoggedIn && (<button className="default-data-button" onClick={getUserWeightHeightAndCalculateBMI}>Calculate with my default data</button>)}
        </div>
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
