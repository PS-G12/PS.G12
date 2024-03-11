import React, { useState } from "react";
import "./BMIcalculator.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMale, faWeight, faPlay } from "@fortawesome/free-solid-svg-icons";

function BMICalculator() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [resultBMI, setBMI] = useState("");
  const [system, setSystem] = useState("metric");

  let checkboxes = document.querySelectorAll("input[type=checkbox]");
  checkboxes.forEach((check) =>
    check.addEventListener("change", function (e) {
      let marked = e.target.checked;
      checkboxes.forEach((check) => (check.checked = false));
      e.target.checked = marked;
    })
  );

  const getHeight = (event) => {
    setHeight(event.target.value);
  };

  const getWeight = (event) => {
    setWeight(event.target.value);
  };

  const typeOfSystem = (event) => {
    setSystem(event.target.value);
  };

  const BMI = () => {
    if (!height || !weight) {
      alert("Please, fill-in each field.");
      return;
    }

    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
      alert("Please, use valid values for height and weight.");
      return;
    }

    if (system === "imperial") {
      const heightUser = parseFloat(height.replace(",", "."));
      const weightUser = parseFloat(weight.replace(",", "."));

      const resultado = (weightUser * 0.453592) / (heightUser * 0.3048) ** 2;
      setBMI(resultado.toFixed(2));
    } else {
      const heightUser = parseFloat(height);
      const weightUser = parseFloat(weight.replace(",", "."));

      const resultado = weightUser / (heightUser / 100) ** 2;
      setBMI(resultado.toFixed(2));
    }
  };

  return (
    <div className="BMI-calculator">
      <div className="BMI-container">
        <p>BODY MASS INDEX (BMI)</p>
        <span className="data1">Calculate your BMI</span>
        <form className="system-input">
          <span className="data2">Choose a measurement system:</span>
          <div className="measurement-selection">
            <div className="checkbox-wrapper-18">
              <div className="round">
                <input
                  type="checkbox"
                  id="checkbox-18"
                  value="imperial"
                  onChange={typeOfSystem}
                  checked={system === "imperial"}
                />
                <label htmlFor="checkbox-18"></label>
                <p>Imperial System</p>
              </div>
            </div>

            <div className="checkbox-wrapper-18">
              <div className="round">
                <input
                  type="checkbox"
                  id="checkbox-18_1"
                  value="metric"
                  onChange={typeOfSystem}
                  checked={system === "metric"}
                />
                <label htmlFor="checkbox-18_1"></label>
                <p>Metric System</p>
              </div>
            </div>
          </div>
        </form>
        <div className="height-input">
          <form className="height">
            <label className="height-info">
              {system === "imperial"
                ? "HEIGHT (in feet):"
                : "HEIGHT (in cm):"}
            </label>
          </form>
          <FontAwesomeIcon icon={faMale} className="height-icon" />
          <input
            type="text"
            placeholder="Height"
            className="height-input"
            value={height}
            onChange={getHeight}
            required
          ></input>
        </div>
        <div className="weight-text">
          <div className="weight-input">
            <form className="weight">
              <label className="weight-info">
                {system === "imperial"
                  ? "Weight (in pounds):"
                  : "WEIGHT (in kilograms):"}
              </label>
            </form>
            <FontAwesomeIcon icon={faWeight} className="weight-icon" />
            <input
              type="text"
              placeholder="Weight"
              className="weight-input"
              value={weight}
              onChange={getWeight}
              required
            ></input>
          </div>
        </div>
        <button className="button-calculator" onClick={BMI}>
          Calculate
        </button>
        <div className="result-calc">
          <span>
            The BMI corresponding to the indicated height and weight is:
          </span>
          <div className="result-BMI">{resultBMI}</div>
        </div>
        {/* <button className="calcular-button">
          Calculate with my default data
        </button> Técnicamente, esto es del siguiente spirnt, creo*/}
        <div className="result-container">
          <button className="macros-calculator">
            Macros Calculator
            <FontAwesomeIcon icon={faPlay} className="play-icon" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default BMICalculator;
