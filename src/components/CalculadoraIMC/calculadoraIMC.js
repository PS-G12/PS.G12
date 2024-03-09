import React, { useState } from "react";
import "./calculadoraIMC.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMale, faWeight, faPlay } from "@fortawesome/free-solid-svg-icons";

function CalculadoraIMC() {
  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");
  const [resultadoIMC, setIMC] = useState("");
  const [sistema, setSistema] = useState("metrico");

  let checks = document.querySelectorAll("input[type=checkbox]");
  checks.forEach((check) =>
    check.addEventListener("change", function (e) {
      let marcado = e.target.checked;
      checks.forEach((check) => (check.checked = false));
      e.target.checked = marcado;
    })
  );

  const LeerAltura = (event) => {
    setAltura(event.target.value);
  };

  const LeerPeso = (event) => {
    setPeso(event.target.value);
  };

  const seleccionSistema = (event) => {
    setSistema(event.target.value);
  };

  const IMC = () => {
    if (!altura || !peso) {
      alert("Por favor, complete todos los campos");
      return;
    }

    if (isNaN(altura) || isNaN(peso) || altura <= 0 || peso <= 0) {
      alert("Por favor, ingrese valores válidos para altura y peso.");
      return;
    }

    if (sistema === "anglosajon") {
      const alturaUser = parseFloat(altura.replace(",", "."));
      const pesoUser = parseFloat(peso.replace(",", "."));

      const resultado = (pesoUser * 0.453592) / (alturaUser * 0.3048) ** 2;
      setIMC(resultado.toFixed(2));
    } else {
      const alturaUser = parseFloat(altura);
      const pesoUser = parseFloat(peso.replace(",", "."));

      const resultado = pesoUser / (alturaUser / 100) ** 2;
      setIMC(resultado.toFixed(2));
    }
  };

  return (
    <div className="calculadora-IMC">
      <div className="contenedor-IMC">
        <p>BODY MASS INDEX (BMI)</p>
        <span className="dato1">Calculate your BMI</span>
        <form className="input-sistema">
          <span className="dato2">Choose a measurement system:</span>
          <div className="seleccion-medida">
            <div className="checkbox-wrapper-18">
              <div className="round">
                <input
                  type="checkbox"
                  id="checkbox-18"
                  value="anglosajon"
                  onChange={seleccionSistema}
                  checked={sistema === "anglosajon"}
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
                  value="metrico"
                  onChange={seleccionSistema}
                  checked={sistema === "metrico"}
                />
                <label htmlFor="checkbox-18_1"></label>
                <p>Metric System</p>
              </div>
            </div>
          </div>
        </form>
        <div className="introducir-altura">
          <form className="altura">
            <label className="info-altura">
              {sistema === "anglosajon"
                ? "HEIGHT (in feet):"
                : "HEIGHT (in cm):"}
            </label>
          </form>
          <FontAwesomeIcon icon={faMale} className="icon-altura" />
          <input
            type="text"
            placeholder="Height"
            className="input-altura"
            value={altura}
            onChange={LeerAltura}
            required
          ></input>
        </div>
        <div className="texto-peso">
          <div className="introducir-peso">
            <form className="peso">
              <label className="info-peso">
                {sistema === "anglosajon"
                  ? "Weight (in pounds):"
                  : "WEIGHT (in kilograms):"}
              </label>
            </form>
            <FontAwesomeIcon icon={faWeight} className="icon-peso" />
            <input
              type="text"
              placeholder="Weight"
              className="input-peso"
              value={peso}
              onChange={LeerPeso}
              required
            ></input>
          </div>
        </div>
        <button className="calcular-button" onClick={IMC}>
          Calculate
        </button>
        <div className="resultado-calculo">
          <span>
            The BMI corresponding to the indicated height and weight is:
          </span>
          <div className="resultado-IMC">{resultadoIMC}</div>
        </div>
        {/* <button className="calcular-button">
          Calculate with my default data
        </button> Técnicamente, esto es del siguiente spirnt, creo*/}
        <div className="resultado-container">
          <button className="calc-macros">
            Macros Calculator
            <FontAwesomeIcon icon={faPlay} className="icon-play" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CalculadoraIMC;
