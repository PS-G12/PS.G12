import React from "react";
import './pulseGraph.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLineChart, faHeartPulse } from '@fortawesome/free-solid-svg-icons'

function PulseGraph(){
    return (
        <div className="pulse-container">
            <FontAwesomeIcon icon={faHeartPulse} className='iheart-icon'/>
            <div className="pulse-tracking">
                <p>Pulse</p>
                <span>Last 90 days</span>
            </div>
            <FontAwesomeIcon icon={faLineChart} className='pulseGraph-icon'/>
        </div>
    );
}

export default PulseGraph