import React from "react";
import './waterConsumption.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlassWater } from '@fortawesome/free-solid-svg-icons'

function WaterConsumption(){
    return (
        <div className="water-container">
            <p>Water</p>
            <div className="glass">
                <p className="water-recomendation">2.1 L</p>
                <FontAwesomeIcon icon={faGlassWater} className='water-icon'/>
            </div>
        </div>
    );
}

export default WaterConsumption;
