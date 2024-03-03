import React from "react";
import './ingestaAgua.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlassWater } from '@fortawesome/free-solid-svg-icons'

function IngestaAgua(){
    return (
        <div className="contenedor-agua">
            <p>Agua</p>
            <div className="vaso">
                <p className="recomen-agua">2.1 L</p>
                <FontAwesomeIcon icon={faGlassWater} className='icon-agua'/>
            </div>
        </div>
    );
}

export default IngestaAgua;
