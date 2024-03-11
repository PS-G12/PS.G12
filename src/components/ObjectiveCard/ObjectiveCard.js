import React from 'react';
import './ObjectiveCard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlag, faUtensils, faRunning } from '@fortawesome/free-solid-svg-icons'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

function ObjectiveCard({remaining, kcalObjective, food, exercise, value}) {
    return (
        <div className='card-containerobj'>
            <div className='circularProgression'>
                <CircularProgressbar value={value} text={`${remaining} kcal remaining `} styles={buildStyles({ 
                    textSize: '10px',
                    pathTransitionDuration: 0.5,
                    pathColor: 'red',
                    textColor: 'black',
                    trailColor: '#d6d6d6',
                    backgroundColor: '#3e98c7',
                    strokeLinecap: 'butt', 
                    verticalAlingn: 'middle'})}/>
            </div>
            <div className='objectives'>
                <div className='kcal'>
                    <FontAwesomeIcon icon={faFlag} className='icon'/>
                    <span>Kcal Objective</span>
                    <p>{kcalObjective}</p>
                </div>
                <div className='food'>
                    <FontAwesomeIcon icon={faUtensils} className='icon'/>
                    <span>Food</span>
                    <p>{food}</p>
                </div>
                <div className='exercise'>
                    <FontAwesomeIcon icon={faRunning} className='icon'/>
                    <span>Exercise</span>
                    <p>{exercise}</p>
                </div>
            </div>
        </div>
    );
}

export default ObjectiveCard;
