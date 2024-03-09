import React from 'react';
import './tarjetaObjetivo.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlag, faUtensils, faRunning } from '@fortawesome/free-solid-svg-icons'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

function TarjetaObjetivo({restantes, objetivoKcal, alimento, ejercicio, value}) {
    return (
        <div className='container-tarjeta'>
            <div className='progresoCircular'>
                <CircularProgressbar value={value} text={`${restantes} kcal restantes`} styles={buildStyles({ 
                    textSize: '10px',
                    pathTransitionDuration: 0.5,
                    pathColor: 'red',
                    textColor: 'black',
                    trailColor: '#d6d6d6',
                    backgroundColor: '#3e98c7',
                    strokeLinecap: 'butt', 
                    verticalAlingn: 'middle'})}/>
            </div>
            <div className='objetivos'>
                <div className='kcal'>
                    <FontAwesomeIcon icon={faFlag} className='icon'/>
                    <span>Objetivo Kcal</span>
                    <p>{objetivoKcal}</p>
                </div>
                <div className='alimento'>
                    <FontAwesomeIcon icon={faUtensils} className='icon'/>
                    <span>Alimento</span>
                    <p>{alimento}</p>
                </div>
                <div className='ejercicio'>
                    <FontAwesomeIcon icon={faRunning} className='icon'/>
                    <span>Ejercicio</span>
                    <p>{ejercicio}</p>
                </div>
            </div>
        </div>
    );
}

export default TarjetaObjetivo;
