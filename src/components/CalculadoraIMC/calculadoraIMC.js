import React from "react";
import './calculadoraIMC.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMale, faWeightScale, faPlay } from '@fortawesome/free-solid-svg-icons'

function CalculadoraIMC(){
    return (
        <div className="contenedor-IMC">
            <p>ÍDICE DE MASA CORPORAL (IMC)</p>
            <div className="intro">
                <span className="dato1">Calcule su IMC</span>
                <span className="dato2">Elija un sistema de medida:</span>
            </div>
        <form>
            <div className="seleccion-medida">
                <label>
                    Sistema anglosajón
                    <input type="checkbox"></input>
                </label>
                <label>
                    Sistema métrico
                    <input type="checkbox" defaultChecked></input>
                </label>
            </div>
        </form>
            <FontAwesomeIcon icon={faMale} className="icon-altura"/>
            <div className="introducir-altura">
                <form className="altura">
                    <label className="info-altura">ESTATURA (en cm):</label>
                    <input type="text" placeholder="Estatura" className="input-altura" required></input>
                </form>
            </div>
            <FontAwesomeIcon icon={faWeightScale} className="icon-peso"/>
            <div className="introducir-peso">
                <form className="peso">
                    <label className="info-peso">PESO (en kilogramos):</label>
                    <input type="text" placeholder="Peso" className="input-peso" required></input>
                </form>
            </div>
            <button className="calcular">Calcular</button>
            <div className="resultado-calculo">
                <span>El IMC correspondiente a la estatura y peso indicados es:</span>
                <div className="resultado-IMC"></div>
            </div>
            <button className="cacular-pred">Calcular con mis datos predeterminados</button>
            <FontAwesomeIcon icon={faPlay} className="icon-play"/>
            <button className="calc-macros">Calculadora de macros</button>
        </div>
    );
}

export default CalculadoraIMC;
