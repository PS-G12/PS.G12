import React from "react";
import './tarjetaMacros.css'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

function MacroCircularProgressBar({ label, value, max, color }) {
    const porcentaje = (value / max) * 100;
    const texto = `${value}/${max}g`;

    return (
        <div className={`macro${label}`}>
            <p className={`label${label}`}>{label}</p> {/* Añadido */}
            <CircularProgressbar
                className={`c${label}`}
                value={porcentaje}
                text={texto}
                styles={buildStyles({
                    textSize: '12px',
                    pathTransitionDuration: 0.5,
                    pathColor: color,
                    textColor: 'black',
                    trailColor: '#d6d6d6',
                    backgroundColor: '#3e98c7',
                    strokeLinecap: 'butt',
                    verticalAlingn: 'middle'
                })}
            />
        </div>
    );
}

function TarjetaMacros({value, max, value2, max2, value3, max3}) {
    return (
        <div className="macros-container">
            <MacroCircularProgressBar label="Carbohidratos" value={value} max={max} color="#0066EE" />
            <MacroCircularProgressBar label="Grasas" value={value2} max={max2} color="#EEBD0E" />
            <MacroCircularProgressBar label="Proteínas" value={value3} max={max3} color="#179D7D" />
        </div>
    );
}

export default TarjetaMacros;
