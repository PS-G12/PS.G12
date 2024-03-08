import React, { useState } from "react";
import './calculadoraMacros.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFire, faCheese, faBreadSlice, faFish, faPlay } from '@fortawesome/free-solid-svg-icons'
import Header from '../../components/Header/header';

function CalculadoraMacros(){
    const  [altura, setAltura] = useState("");
    const  [edad, setEdad] = useState("");
    const  [peso, setPeso] = useState("");
    const [resultadoIMC, setIMC] = useState("");
    const [sistema, setSistema] = useState("metrico");

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

    const IMC = () => {
        if (!altura || !peso){
            alert('Por favor, complete todos los campos');
            return;
        }

        if (sistema === "anglosajon"){
            const alturaUser = parseFloat(altura.replace(",", "."));
            const pesoUser = parseFloat(peso.replace(",", "."));

            const resultado = (pesoUser * 0.453592)/((alturaUser * 0.3048) ** 2);
            setIMC(resultado.toFixed(2));
        }
        else{
            const alturaUser = parseFloat(altura);
            const pesoUser = parseFloat(peso.replace(",", "."));
    
            const resultado = pesoUser/((alturaUser / 100) ** 2);
            setIMC(resultado.toFixed(2));
        }
    };

    return (
        <div className="contenedor-macros">
            {/* <Header /> */}
            <p>MACRONUTRIENTES Y CALORÍAS</p>
            <div className="intro">
                <span className="dato1">Calcule los macronutrientes necesarios que debe consumir, dependiendo de su estatura, peso y objetivos.</span>
                <span className="dato2">Elija un sistema de medida:</span>
                <div className="seleccion-medidas">
                    <label>
                        Sistema anglosajón
                        <input type="checkbox" value="anglosajon" onChange={seleccionSistema}></input>
                    </label>
                    <label>
                        Sistema métrico
                        <input type="checkbox" defaultChecked value="metrico" onChange={seleccionSistema}></input>
                    </label>
                </div>
            </div>
            <form>
                <div className="fila1">
                    <div className="introducir-edad">
                        <form className="edad">
                            <label className="info-edad">{"Edad:"}</label>
                            <input type="text" placeholder="Edad" className="input-edad" value={edad} onChange={LeerEdad} required></input>
                        </form>
                    </div>
        
                    <div className="introducir-genero">
                        <form className="genero">
                            <label className="info-genero">{"Género:"}</label>
                            <select id="info-genero" className="info-genero">
                                <option value="hombre">Hombre</option> 
                                <option value="mujer">Mujer</option>
                            </select>
                        </form>
                    </div>
                    <div className="input-altura">
                        <form className="altura">
                            <label className="info-altura">{sistema === "anglosajon" ? "Estatura (ft):" : "Estatura (cm):"}</label>
                            <input type="text" placeholder="Estatura" className="input-altura" value={altura} onChange={LeerAltura} required></input>
                        </form>
                    </div>
        
                    <div className="input-peso">
                        <form className="peso">
                            <label className="info-peso">{sistema === "anglosajon" ? "Peso (lbs):" : "Peso (kg):"}</label>
                            <input type="text" placeholder="Peso" className="input-peso" value={peso} onChange={LeerPeso} required></input>
                        </form>
                    </div>
                </div>
                <div className="fila2">
                    <div className="introducir-actividad">
                        <form className="actividad">
                            <label htmlFor="actividad-fisica">Actividad física actual:</label>
                            <select id="actividad-fisica" className="input-actividad">
                                <option value="sedentario">Sedentario</option> 
                                <option value="moderado">Moderado</option>
                                <option value="intensa">Intensa</option>
                            </select>
                        </form>
                    </div>
        
                    <div className="introducir-meta">
                        <label className="info-meta">{"Meta:"}</label>
                        <ul>
                            <li><input type="radio" id="perder-peso" name="meta" value="perder-peso" /><label htmlFor="perder-peso">Perder peso</label></li>
                            <li><input type="radio" id="mantener" name="meta" value="mantener" /><label htmlFor="mantener">Mantener</label></li>
                            <li><input type="radio" id="ganar-peso" name="meta" value="ganar-peso" /><label htmlFor="ganar-peso">Ganar peso</label></li>
                        </ul>
                    </div>
                </div>
                <button className="calcularMacros" onClick={IMC}>Calcular</button>
                <div className="resultado-calculoMacros">
                    <div className="resultado-label">Los macronutrientes necesarios son:</div>
                    <div className="contenedor-recuadros">
                        <div className="recuadro">
                            <FontAwesomeIcon icon={faFire} className="icon-calorias" />
                            <h3>Calorías</h3>
                            <p className="info" id="calorias-info">x calorias por día</p>
                        </div>
                        <div className="recuadro">
                            <FontAwesomeIcon icon={faBreadSlice} className="icon-carbos" />
                            <h3>Carbohidratos</h3>
                            <p className="info" id="carbohidratos-info">x gramos por día</p>
                        </div>
                        <div className="recuadro">
                            <FontAwesomeIcon icon={faFish} className="icon-proteinas" />
                            <h3>Proteínas</h3>
                            <p className="info" id="proteinas-info">x gramos por día</p>
                        </div>
                        <div className="recuadro">
                            <FontAwesomeIcon icon={faCheese} className="icon-grasas" />
                            <h3>Grasas</h3>
                            <p className="info" id="grasas-info">x gramos por día</p>
                        </div>
                    </div>
                </div>
                
                <button className="calc-macros">Calculadora de IMC<FontAwesomeIcon icon={faPlay} className="icon-playIMC"/></button>
            </form>
        </div>
    );
}

export default CalculadoraMacros;
