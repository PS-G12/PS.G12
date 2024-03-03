import React from "react";
import './tarjetaMacros.css'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

function TarjetaMacros(){
    return (
        <div className="contenedor">
            <div className="carbo">
                <p>Carbohidratos</p>
                <CircularProgressbar className="cCarbo" value={60} text='81/165g' styles={buildStyles({ 
                    textSize: '12px',
                    pathTransitionDuration: 0.5,
                    pathColor: '#0066EE',
                    textColor: 'black',
                    trailColor: '#d6d6d6',
                    backgroundColor: '#3e98c7',
                    strokeLinecap: 'butt', 
                    verticalAlingn: 'middle'})}/>
            </div>
            <div className="grasas">
                <p>Grasas</p>
                <CircularProgressbar className="cGrasas" value={85} text='50/65g' styles={buildStyles({ 
                    textSize: '12px',
                    pathTransitionDuration: 0.5,
                    pathColor: '#EEBD0E',
                    textColor: 'black',
                    trailColor: '#d6d6d6',
                    backgroundColor: '#3e98c7',
                    strokeLinecap: 'butt', 
                    verticalAlingn: 'middle'})}/>
            </div>
            <div className="prote">
                <p>Proteínas</p>
                <CircularProgressbar className="cProte" value={35} text='32/85g' styles={buildStyles({ 
                    textSize: '12px',
                    pathTransitionDuration: 0.5,
                    pathColor: '#179D7D',
                    textColor: 'black',
                    trailColor: '#d6d6d6',
                    backgroundColor: '#3e98c7',
                    strokeLinecap: 'butt', 
                    verticalAlingn: 'middle'})}/>
            </div>
        </div>
    );
}

export default TarjetaMacros;
