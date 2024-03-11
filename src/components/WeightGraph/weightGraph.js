import React from "react";
import './weightGraph.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLineChart, faWeight } from '@fortawesome/free-solid-svg-icons'

function WeightGraph(){
    return (
        <div className="weight-container">
            <FontAwesomeIcon icon={faWeight} className='weight-icon'/>
            <div className="weight-tracking">
                <p>Weight</p>
                <span>Last 90 days</span>
            </div>
            <FontAwesomeIcon icon={faLineChart} className='graph-icon'/>
        </div>
    );
}

export default WeightGraph
