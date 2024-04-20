import React from "react";
import './macrosCard.css'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { useNavigate } from 'react-router-dom';

function MacroCircularProgressBar({ label, value, max, color }) {
    const percentage = (value / max) * 100;
    const text = `${value}/${max}g`;

    const navigate = useNavigate();

    const handleObjectiveCardClick = () => {
      navigate('/fats');
    };


    return (
        <div className={`macro${label}`} onClick={handleObjectiveCardClick}>
            <p className={`label${label}`}>{label}</p>
            <CircularProgressbar
                className={`c${label}`}
                value={percentage}
                text={text}
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

function MacrosCard({value, max, value2, max2, value3, max3}) {
    return (
        <div className="macros-container">
            <MacroCircularProgressBar label="Carbs" value={value} max={max} color="#0066EE" />
            <MacroCircularProgressBar label="Fats" value={value2} max={max2} color="#EEBD0E" />
            <MacroCircularProgressBar label="Proteins" value={value3} max={max3} color="#179D7D" />
        </div>
    );
}

export default MacrosCard;
