import React from "react";
import './graficaPeso.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLineChart, faWeight } from '@fortawesome/free-solid-svg-icons'

function GraficaPeso(){
    return (
        <div className="contenedor-peso">
            <FontAwesomeIcon icon={faWeight} className='icon-pesas'/>
            <div className="recuento">
                <p>Peso</p>
                <span>Últimos 90 días</span>
            </div>
            <FontAwesomeIcon icon={faLineChart} className='icon-grafica'/>
        </div>
    );
}

export default GraficaPeso
