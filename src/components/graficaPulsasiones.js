import React from "react";
import '../styles/graficaPulsaciones.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLineChart, faHeartPulse } from '@fortawesome/free-solid-svg-icons'

function GraficaPulsasiones(){
    return (
        <div className="contenedor-pulsasiones">
            <FontAwesomeIcon icon={faHeartPulse} className='icon-cora'/>
            <div className="recuento">
                <p>Pulsaciones</p>
                <span>Últimos 90 días</span>
            </div>
            <FontAwesomeIcon icon={faLineChart} className='icon-graficaPul'/>
        </div>
    );
}

export default GraficaPulsasiones