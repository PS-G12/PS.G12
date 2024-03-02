import React from 'react';
import '../styles/tarjetaObjetivo.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlag, faUtensils, faRunning } from '@fortawesome/free-solid-svg-icons'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

function TarjetaObjetivo(){
    return (
        <div className='container-tarjeta'>
            <div className='progresoCircular'>
                <CircularProgressbar value={65} text='1502 kcal restantes' styles={buildStyles({ 
                    textSize: '12px',
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
                    <p>2542</p>
                </div>
                <div className='alimento'>
                    <FontAwesomeIcon icon={faUtensils} className='icon'/>
                    <span>Alimento</span>
                    <p>0</p>
                </div>
                <div className='ejercicio'>
                    <FontAwesomeIcon icon={faRunning} className='icon'/>
                    <span>Ejercicio</span>
                    <p>0</p>
                </div>
            </div>
        </div>
    );
}

export default TarjetaObjetivo;
