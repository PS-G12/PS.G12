import React, { useState } from "react";
import './calculadoraMacros.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMale, faWeightScale, faPlay } from '@fortawesome/free-solid-svg-icons'

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
            <p>MACRONUTRIENTES Y CALORÍAS</p>
            <div className="intro">
                <span className="dato1">Calcule los macronutrientes necesarios que debe consumir, dependiendo de su estatura, peso y objetivos.</span>
                <span className="dato2">Elija un sistema de medida:</span>
            </div>
            <form>
                <div className="seleccion-medida">
                    <label>
                        Sistema anglosajón
                        <input type="checkbox" value="anglosajon" onChange={seleccionSistema}></input>
                    </label>
                    <label>
                        Sistema métrico
                        <input type="checkbox" defaultChecked value="metrico" onChange={seleccionSistema}></input>
                    </label>
                </div>
    
                <div className="introducir-edad">
                    <form className="edad">
                        <label className="info-edad">{"Edad:"}</label>
                        <input type="text" placeholder="Edad" className="input-edad" value={edad} onChange={LeerEdad} required></input>
                    </form>
                </div>
    
                <div className="introducir-genero">
                    <form className="genero">
                        <label htmlFor="info-genero">{"Género:"}</label>
                        <select id="info-genero" className="info-genero">
                            <option value="hombre">Hombre</option> 
                            <option value="mujer">Mujer</option>
                        </select>
                    </form>
                </div>

                <FontAwesomeIcon icon={faMale} className="icon-altura"/>
                <div className="introducir-altura">
                    <form className="altura">
                        <label className="info-altura">{sistema === "anglosajon" ? "Estatura (ft):" : "Estatura (cm):"}</label>
                        <input type="text" placeholder="Estatura" className="input-altura" value={altura} onChange={LeerAltura} required></input>
                    </form>
                </div>
    
                <FontAwesomeIcon icon={faWeightScale} className="icon-peso"/>
                <div className="introducir-peso">
                    <form className="peso">
                        <label className="info-peso">{sistema === "anglosajon" ? "Peso (lbs):" : "Peso (kg):"}</label>
                        <input type="text" placeholder="Peso" className="input-peso" value={peso} onChange={LeerPeso} required></input>
                    </form>
                </div>
    
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
                    <span>Meta:</span>
                    <ul>
                        <li><input type="radio" id="perder-peso" name="meta" value="perder-peso" /><label htmlFor="perder-peso">Perder peso</label></li>
                        <li><input type="radio" id="mantener" name="meta" value="mantener" /><label htmlFor="mantener">Mantener</label></li>
                        <li><input type="radio" id="ganar-peso" name="meta" value="ganar-peso" /><label htmlFor="ganar-peso">Ganar peso</label></li>
                    </ul>
                </div>
    
                <button className="calcular" onClick={IMC}>Calcular</button>
                <div className="resultado-calculo">
                    <span>Los macronutrientes necesarios son:</span>
                    <div className="resultado-macros">{resultadoIMC}</div>
                </div>
    
                <button className="cacular-pred">Calcular con mis datos predeterminados</button>
                <FontAwesomeIcon icon={faPlay} className="icon-play"/>
                <button className="calc-macros">Calculadora de IMC</button>
            </form>
        </div>
    );
}

export default CalculadoraMacros;
