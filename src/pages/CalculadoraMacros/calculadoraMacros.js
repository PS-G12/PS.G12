import React, { useState } from "react";
import './calculadoraMacros.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFire, faCheese, faBreadSlice, faFish, faPlay } from '@fortawesome/free-solid-svg-icons'
import Header from '../../components/Header/header';

function CalculadoraMacros(){

    // Lectura de datos: sistema, altura, edad, peso, genero, actividad y meta
    const [sistema, setSistema] = useState("metrico");
    const [altura, setAltura] = useState("");
    const [edad, setEdad] = useState("");
    const [peso, setPeso] = useState("");
    const [genero, setGenero] = useState("hombre");
    const [actividad, setActividad] = useState("sedentario");
    const [meta, setMeta] = useState("perder-peso");

    // Resultados de calorías, proteínas, carbohidratos y grasas
    const [resultadoCalorias, setCalorias] = useState("");
    const [resultadoProteinas, setProteinas] = useState("");
    const [resultadoCarbohidratos, setCarbohidratos] = useState("");
    const [resultadoGrasas, setGrasas] = useState("");

    let checks = document.querySelectorAll("input[type=checkbox]");
    checks.forEach(check => check.addEventListener("change", function(e){
        let marcado = e.target.checked;
        checks.forEach(check => check.checked = false);
        e.target.checked = marcado;
    }));

    const LeerEdad = (event) => {
        setEdad(event.target.value);
    };

    const LeerAltura = (event) => {
        setAltura(event.target.value);
    };

    const LeerPeso = (event) => {
        setPeso(event.target.value);
    };

    const seleccionSistema = (event) => {
        setSistema(event.target.value);
    }

    const seleccionGenero = (event) => {
        setGenero(event.target.value);
    }

    const seleccionActividad = (event) => {
        setActividad(event.target.value);
    }

    const seleccionMeta = (event) => {
        setMeta(event.target.value);
    }

    const calcularMacros = (event) => {
        event.preventDefault();
        
        if (!altura || !peso || !edad) {
            alert('Por favor, complete todos los campos');
            return;
        }

        const factorSedentario = 1.2;
        const factorModerado = 1.375;
        const factorIntenso = 1.60;

        let alturaUser = 0;
        let pesoUser = 0;

        if (sistema === "anglosajon") {
            alturaUser = parseFloat(altura.replace(",", "."));
            pesoUser = parseFloat(peso.replace(",", "."));
      
            alturaUser = alturaUser / 0.032808; //De pies a centimetros
            pesoUser = pesoUser / 2.2046; //De libras a kilos
        } else {
            alturaUser = parseFloat(altura);
            pesoUser = parseFloat(peso.replace(",", "."));
        }



        let objetivoCalorias;
        switch (meta) {
            case "ganar-peso":
                objetivoCalorias = 500; 
                break;
            case "perder-peso":
                objetivoCalorias = -500; 
                break;
            case "mantener-peso":
            default:
                objetivoCalorias = 0; 
                break;
        }
    
        let TMB; // Tasa metabólica basal
        let actividadFactor; // Factor de actividad
    
        // Calcular la TMB según el género
        if (genero === "hombre") {
            TMB = 10 * pesoUser + 6.25 * alturaUser - 5 * edad + 5;
        } else {
            TMB = 10 * pesoUser + 6.25 * alturaUser - 5 * edad - 161;
        }
    
        // Calcular el factor de actividad
        if (actividad === "sedentario") {
            actividadFactor = factorSedentario;
        } else if (actividad === "moderado") {
            actividadFactor = factorModerado;
        } else {
            actividadFactor = factorIntenso;
        }

        
    
        // Calcular las calorías necesarias por día
        const calorias = TMB * actividadFactor + objetivoCalorias;
        setCalorias(calorias.toFixed(2));
    
        // Calcular las proteínas necesarias
        const proteinas = calorias * 0.25 / 4; // En gramos
        setProteinas(proteinas.toFixed(2));
    
        // Calcular las grasas necesarias
        const grasas = (calorias * 0.25) / 9; // El 25% de las calorías diarias proviene de grasas
        setGrasas(grasas.toFixed(2));
    
        // Calcular los carbohidratos necesarios
        const carbohidratos = (calorias - (proteinas * 4) - (grasas * 9)) / 4; // Los carbohidratos aportan 4 calorías por gramo
        setCarbohidratos(carbohidratos.toFixed(2));
    };

    return (
        <div className="contenedor-macros">
            {/* <Header />  */}
            <p>MACRONUTRIENTS AND CALORIES</p>
            <div className="intro">
                <span className="dato1">Calculate the necessary macronutrients you should consume based on your height, weight, and goals.</span>
                <span className="dato2n">Choose a unit of measurement:</span>
                <div className="seleccion-medidas">
                    <label>
                        Imperial system
                        <input type="checkbox" value="anglosajon" onChange={seleccionSistema}></input>
                    </label>
                    <label>
                        Metric system
                        <input type="checkbox" defaultChecked value="metrico" onChange={seleccionSistema}></input>
                    </label>
                </div>
            </div>
            <form>
                <div className="fila1">
                    <div className="introducir-edad">
                        <div className="edad">
                            <label className="info-edad">{"Age:"}</label>
                            <input type="text" placeholder="Age" className="input-edad" value={edad} onChange={LeerEdad} required></input>
                        </div>
                    </div>
        
                    <div className="introducir-genero">
                        <div className="genero">
                            <label className="info-genero">{"Gender:"}</label>
                            <select id="info-genero" className="info-generos" value={genero} onChange={seleccionGenero}>
                                <option value="hombre">Male</option> 
                                <option value="mujer">Female</option>
                            </select>
                        </div>
                    </div>
                    <div className="input-altura">
                        <div className="altura">
                            <label className="info-altura">{sistema === "anglosajon" ? "Height (ft):" : "Height (cm):"}</label>
                            <input type="text" placeholder="Height" className="input-altura" value={altura} onChange={LeerAltura} required></input>
                        </div>
                    </div>
        
                    <div className="input-peso">
                        <div className="peso">
                            <label className="info-peso">{sistema === "anglosajon" ? "Weight (lbs):" : "Weight (kg):"}</label>
                            <input type="text" placeholder="Weight" className="input-peso" value={peso} onChange={LeerPeso} required></input>
                        </div>
                    </div>
                </div>
                <div className="fila2">
                    <div className="introducir-actividad">
                        <div className="actividad">
                            <label htmlFor="actividad-fisica">Current Physical Activity:</label>
                            <select id="actividad-fisica" className="input-actividad" value={actividad} onChange={seleccionActividad}>
                                <option value="sedentario">Sedentary</option> 
                                <option value="moderado">Moderate</option>
                                <option value="intensa">Intense</option>
                            </select>
                        </div>
                    </div>
        
                    <div className="introducir-meta">
                        <label className="info-meta">{"Goal:"}</label>
                        <ul>
                            <li><input type="radio" id="perder-peso" name="meta" value="perder-peso" checked={meta === "perder-peso"} onChange={seleccionMeta}/><label htmlFor="perder-peso">Lose weight</label></li>
                            <li><input type="radio" id="mantener" name="meta" value="mantener" checked={meta === "mantener"} onChange={seleccionMeta}/><label htmlFor="mantener">Keep weight</label></li>
                            <li><input type="radio" id="ganar-peso" name="meta" value="ganar-peso" checked={meta === "ganar-peso"} onChange={seleccionMeta}/><label htmlFor="ganar-peso">Gain weight</label></li>
                        </ul>
                    </div>
                </div>
                <button className="calcularMacros" onClick={calcularMacros}>Calculate</button>
                <div className="resultado-calculoMacros">
                    <div className="resultado-label">The necessary macronutrients are:</div>
                    <div className="contenedor-recuadros">
                        <div className="recuadro">
                            <FontAwesomeIcon icon={faFire} className="icon-calorias" />
                            <p>Calories</p>
                            <p className="info" id="calorias-info">{resultadoCalorias} calories per day</p>
                        </div>
                        <div className="recuadro">
                            <FontAwesomeIcon icon={faBreadSlice} className="icon-carbos" />
                            <p>Carbohydrates</p>
                            <p className="info" id="carbohidratos-info">{resultadoCarbohidratos} grams per day</p>
                        </div>
                        <div className="recuadro">
                            <FontAwesomeIcon icon={faFish} className="icon-proteinas" />
                            <p>Proteins</p>
                            <p className="info" id="proteinas-info">{resultadoProteinas} grams per day </p>
                        </div>
                        <div className="recuadro">
                            <FontAwesomeIcon icon={faCheese} className="icon-grasas" />
                            <p>Fats</p>
                            <p className="info" id="grasas-info">{resultadoGrasas} grams per day</p>
                        </div>
                    </div>
                </div>
                <button className="calc-imc">BMI Calculator<FontAwesomeIcon icon={faPlay} className="icon-playIMC"/></button>
            </form>
        </div>
    );
}

export default CalculadoraMacros;
