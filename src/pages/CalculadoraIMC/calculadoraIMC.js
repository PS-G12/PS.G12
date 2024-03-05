import React, { useState } from "react";
import './calculadoraIMC.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMale, faWeightScale, faPlay } from '@fortawesome/free-solid-svg-icons'

function CalculadoraIMC(){
    const  [altura, setAltura] = useState("");
    const  [peso, setPeso] = useState("");
    const [resultadoIMC, setIMC] = useState("");
    const [sistema, setSistema] = useState("metrico");

    let checks = document.querySelectorAll("input[type=checkbox]");
    checks.forEach(check => check.addEventListener("change", function(e){
        let marcado = e.target.checked;
        checks.forEach(check => check.checked = false);
        e.target.checked = marcado;
    }));

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
        <div className="contenedor-IMC">
            <p>ÍNDICE DE MASA CORPORAL (IMC)</p>
            <div className="intro">
                <span className="dato1">Calcule su IMC</span>
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
        </form>
            <FontAwesomeIcon icon={faMale} className="icon-altura"/>
            <div className="introducir-altura">
                <form className="altura">
                    <label className="info-altura">{sistema === "anglosajon" ? "ESTATURA (en pies):" : "ESTATURA (en cm):"}</label>
                    <input type="text" placeholder="Estatura" className="input-altura" value={altura} onChange={LeerAltura} required></input>
                </form>
            </div>
            <FontAwesomeIcon icon={faWeightScale} className="icon-peso"/>
            <div className="introducir-peso">
                <form className="peso">
                    <label className="info-peso">{sistema === "anglosajon" ? "PESO (en libras):" : "PESO (en kilogramos):"}</label>
                    <input type="text" placeholder="Peso" className="input-peso" value={peso} onChange={LeerPeso} required></input>
                </form>
            </div>
            <button className="calcular" onClick={IMC}>Calcular</button>
            <div className="resultado-calculo">
                <span>El IMC correspondiente a la estatura y peso indicados es:</span>
                <div className="resultado-IMC">{resultadoIMC}</div>
            </div>
            <button className="cacular-pred">Calcular con mis datos predeterminados</button>
            <FontAwesomeIcon icon={faPlay} className="icon-play"/>
            <button className="calc-macros">Calculadora de macros</button>
        </div>
    );
}

export default CalculadoraIMC;
