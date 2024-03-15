import React from 'react';
import './ObjectiveCard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlag, faUtensils, faRunning } from '@fortawesome/free-solid-svg-icons'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

const Objective = ({ icon, label, value }) => {
    return (
      <div className='objective'>
        <FontAwesomeIcon icon={icon} className='icon' />
        <span>{label}</span>
        <p>{value}</p>
      </div>
    );
};

function ObjectiveCard({remaining, kcalObjective, food, exercise, value}) {
    return (
        <div className='card-containerobj'>
          <div className='circularProgression'>
            <CircularProgressbar
              value={value}
              text={`${remaining} kcal remaining`}
              styles={buildStyles({
                textSize: '10px',
                pathTransitionDuration: 0.5,
                pathColor: 'red',
                textColor: 'black',
                trailColor: '#d6d6d6',
                backgroundColor: '#3e98c7',
                strokeLinecap: 'butt',
                verticalAlingn: 'middle'
              })}
            />
          </div>
          <div className='objectives'>
            <Objective icon={faFlag} label="Kcal Objective" value={kcalObjective} />
            <Objective icon={faUtensils} label="Food" value={food} />
            <Objective icon={faRunning} label="Exercise" value={exercise} />
          </div>
        </div>
    );
};

export default ObjectiveCard;
